import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const SocialProof = () => {
  const images = [
    { id: 1, src: '/user-image-1.jpg', alt: 'User 1' },
    { id: 2, src: '/user-image-2.jpg', alt: 'User 2' },
    { id: 3, src: '/user-image-3.jpg', alt: 'User 3' },
    { id: 4, src: '/user-image-4.jpg', alt: 'User 4' },
    { id: 5, src: '/user-image-5.jpg', alt: 'User 5' },
    { id: 6, src: '/user-image-6.jpg', alt: 'User 6' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 drop-shadow-lg">
          BeautyShop on Instagram
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group transition duration-300 transform hover:scale-105">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-50"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="#"
            className="text-pink-600 font-semibold hover:text-pink-700 transition duration-300 flex items-center justify-center"
          >
            <FaInstagram className="mr-2" />
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
