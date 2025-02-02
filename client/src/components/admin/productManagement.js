import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CategoryFilter from './categoryFilter';
import ProductTable from './productTable';
import ProductModal from './productModal';
import { Button, notification, Spin } from 'antd';
import { AppContext } from '../../App';

const ProductManagement = () => {
  const {socket,token}=useContext(AppContext)
  const [allProducts, setAllProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('bodycare');
  const [loading, setLoading] = useState(false);

  const categories = ['bodycare', 'fragrance', 'haircare', 'makeup', 'nail', 'skincare'];

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/get-all-products-admin`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setAllProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      notification.error({ message:error.response.data.message });
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    socket.on('get-all-products', getProducts);

    return () => {
      socket.off('get-order', getProducts); // Clean up the socket listener on component unmount
    };
  }, [socket]);

  const handleAddEditProduct = async (values) => {
    if (currentProduct) {
      // Edit Product
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_URL}/edit/update/${selectedCategory}/${currentProduct._id}`,
          values,{headers:{
        Authorization:`Bearer ${token}`
      }}
        );
        notification.success({ message: 'Product updated successfully' });
        // Update the product list locally without fetching all products again
        setAllProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentProduct._id ? { ...product, ...values } : product
          )
        );
      } catch (error) {
        console.error(error);
        notification.error({ message: 'Error updating product' });
      }
    } else {
      // Add Product
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/add-product/${selectedCategory}`,
          values,{headers:{
        Authorization:`Bearer ${token}`
      }}
        );
        notification.success({ message: 'Product added successfully' });
        // Append new product to the local state
        setAllProducts((prevProducts) => [...prevProducts, response.data]);
      } catch (error) {
        console.error(error);
        notification.error({ message: 'Error adding product' });
      }
    }

    // Close modal and reset current product
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/edit/delete/${selectedCategory}/${id}`
      ,{headers:{
        Authorization:`Bearer ${token}`
      }});
      notification.success({ message: 'Product deleted successfully' });
      // Remove product from local state
      // setAllProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Error deleting product' });
    }
  };

  // Filter products by category
  const filteredProducts = allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="p-6">

      <div className='flex justify-between'>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Add Product Button */}
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Add Product
      </Button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {/* Product Table */}
          <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />

          {/* Product Modal */}
          <ProductModal
            isModalVisible={isModalVisible}
            currentProduct={currentProduct}
            categories={categories}
            selectedCategory={selectedCategory}
            onSubmit={handleAddEditProduct}
            onCancel={() => {
              setIsModalVisible(false);
              setCurrentProduct(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProductManagement;
