// src/components/ArticleCard.js
import React from 'react';

const ArticleCard = ({ title, excerpt, author, publishDate, imageUrl, tags, onShowFull }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 mx-2">
      <img src={`https://ui-avatars.com/api/?name=${title}&background=random&size=200`} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
       <p> <p className="text-gray-600 h-[70px] bg bg-gradient-to-r from-gr overflow-hidden">{excerpt}</p>...</p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">{publishDate}</div>
          <div>
            {tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700  p-1 text-xs font-medium px-2 rounded-full mr-1">{tag}</span>
            ))}
          </div>
        </div>
      
        <button 
          onClick={onShowFull}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
