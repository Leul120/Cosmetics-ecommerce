import React from 'react';

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'path_to_image' },
    { id: 2, name: 'Product 2', price: 59.99, image: 'path_to_image' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Wishlist</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
            <p className="text-indigo-600 font-semibold mt-2">${item.price.toFixed(2)}</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="text-red-600">Remove</button>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg">Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
