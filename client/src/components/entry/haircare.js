import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaTrashAlt, FaCloudUploadAlt } from "react-icons/fa";
import { AppContext } from "../../App";

const HairCareForm = () => {
  const {token}=useContext(AppContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);
    try {
      data.images=uploadedImages
      const response = await axios.post("http://localhost:8000/entry/create-haircare",data,{headers:{
        Authorization:`Bearer ${token}`
      }});

      toast.success("Hair care product added successfully!");
      reset();
      setUploadedImages([]);
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => formData.append("image", file));

        const { data } = await axios.post("http://localhost:8000/entry/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        Authorization:`Bearer ${token}`
      
        });

        setUploadedImages((prev) => [...prev, ...data.images]);
        toast.success(`${acceptedFiles.length} image(s) uploaded successfully.`);
      } catch (error) {
        toast.error("Failed to upload images. Please try again.");
      }
    },
  });

  const handleDeleteImage = async (publicId) => {
    try {
      await axios.get(`http://localhost:8000/entry/delete/${publicId}`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setUploadedImages((prev) => prev.filter((img) => img.publicId !== publicId));
      toast.success("Image deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hair Care Product Entry</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Product name is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  {...register("brand", { required: "Brand is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.brand && <p className="mt-2 text-sm text-red-600">{errors.brand.message}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price is required", min: 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor="hairType" className="block text-sm font-medium text-gray-700">
                  Hair Type
                </label>
                <select
                  id="hairType"
                  {...register("hairType", { required: "Hair type is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select hair type</option>
                  <option value="curly">Curly</option>
                  <option value="straight">Straight</option>
                  <option value="wavy">Wavy</option>
                </select>
                {errors.hairType && <p className="mt-2 text-sm text-red-600">{errors.hairType.message}</p>}
              </div>

              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                  Ingredients
                </label>
                <input
                  id="ingredients"
                  type="text"
                  {...register("ingredients")}
                  placeholder="e.g., argan oil, aloe vera (comma-separated)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  {...register("stock", { required: "Stock is required", min: 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images
                </label>
                <div
                  {...getRootProps()}
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors duration-200"
                >
                  <div className="space-y-1 text-center">
                    <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload images</span>
                        <input {...getInputProps()} className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {uploadedImages.map((img) => (
                      <div key={img.publicId} className="relative group">
                        <img src={img.imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full group-hover:block"
                          onClick={() => handleDeleteImage(img.publicId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Submitting..." : "Add Hair Care Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HairCareForm;
