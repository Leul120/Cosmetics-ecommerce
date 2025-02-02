import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaTrashAlt, FaCloudUploadAlt } from "react-icons/fa";
import { AppContext } from "../../App";

const FragranceForm = () => {
  const {token}=useContext(AppContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const onSubmit = async (data) => {
  if (uploadedImages.length === 0) {
    toast.error("Please upload at least one image");
    return;
  }
  
  // Verify the data before submitting
  console.log('Form Data:', data);
  
  setIsSubmitting(true);
  try {
    
    data.images=uploadedImages
    // Append uploaded images
    

    // Submit the form data
    const response = await axios.post("http://localhost:8000/entry/create-fragrance", data,{headers:{
        Authorization:`Bearer ${token}`
      }})

    console.log(response.data);
    toast.success("Fragrance added successfully!");
    reset();
    setUploadedImages([]);
  } catch (error) {
    console.error(error.response?.data || error);
    toast.error("Failed to add fragrance. Please try again.");
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fragrance Product Entry</h2>
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  {...register("description", { required: "Product description is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  {...register("type", { required: "Type is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select type</option>
                  <option value="perfume">Perfume</option>
                  <option value="cologne">Cologne</option>
                  <option value="body spray">Body Spray</option>
                </select>
                {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>}
              </div>

              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                  Ingredients
                </label>
                <input
                  id="ingredients"
                  type="text"
                  {...register("ingredients")}
                  placeholder="e.g., Leather, Tobacco, Cedarwood (comma-separated)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="scentProfile" className="block text-sm font-medium text-gray-700">
                  Scent Profile
                </label>
                <input
                  id="scentProfile"
                  type="text"
                  {...register("scentProfile")}
                  placeholder="e.g., Leather, Tobacco, Cedarwood (comma-separated)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="longevity" className="block text-sm font-medium text-gray-700">
                  Longevity
                </label>
                <select
                  id="longevity"
                  {...register("longevity")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select longevity</option>
                  <option value="short">Short</option>
                  <option value="moderate">Moderate</option>
                  <option value="long-lasting">Long-lasting</option>
                </select>
              </div>
              <div>
                <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
                  volume
                </label>
                <input
                  id="volume"
                  type="number"
                  step="0.1"
                  {...register("volume", { min: 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700">
                  Season
                </label>
                <input
                  id="season"
                  type="text"
                  {...register("season")}
                  placeholder="e.g., winter, fall (comma-separated)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
                  Occasion
                </label>
                <input
                  id="occasion"
                  type="text"
                  {...register("occasion")}
                  placeholder="e.g., evening, special occasion (comma-separated)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="concentration" className="block text-sm font-medium text-gray-700">
                  Concentration
                </label>
                <select
                  id="concentration"
                  {...register("concentration")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select concentration</option>
                  <option value="eau de parfum">Eau de Parfum</option>
                  <option value="eau de toilette">Eau de Toilette</option>
                  <option value="eau de cologne">Eau de Cologne</option>
                </select>
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  
                </select>
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  id="rating"
                  type="number"
                  step="0.1"
                  {...register("rating", { min: 0, max: 5 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
                <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  stock
                </label>
                <input
                  id="stock"
                  type="number"
                  step="1"
                  {...register("stock", { min: 0 })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" {...register("bestSeller")} />
                  <span className="ml-2 text-sm text-gray-700">Best Seller</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" {...register("featured")} />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" {...register("discontinued")} />
                  <span className="ml-2 text-sm text-gray-700">Discontinued</span>
                </label>
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
                        className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload files</span>
                        <input {...getInputProps()} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {uploadedImages.map((image) => (
                    <div key={image.publicId} className="relative w-24 h-24 group">
                      <img
                        src={image.imageUrl}
                        alt="uploaded"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.publicId)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FragranceForm;