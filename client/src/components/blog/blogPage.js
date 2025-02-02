// src/pages/BlogPage.js
// src/pages/BlogPage.js
import React, { useState } from 'react';
import ArticleCard from './articleCard';
import Modal from './modal';
import { blogs } from './blogs';


const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 mx-auto p-4 pt-24">
      
      {blogs?.map(blog => (
        <ArticleCard 
          key={blog.id}
          title={blog.product_name}
          excerpt={blog.description}
          
          
          imageUrl={blog.image_url}
          tags={blog.tags}
          onShowFull={() => openModal(blog)}
        />
      ))}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedBlog}
      />
    </div>
  );
};

export default BlogPage;
