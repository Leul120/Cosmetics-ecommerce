// src/components/SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-lg p-4 mb-4">
      <div className="h-48 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-400 rounded mb-2"></div>
      <div className="h-4 bg-gray-400 rounded mb-2"></div>
      <div className="h-4 bg-gray-400 rounded mb-2"></div>
    </div>
  );
};

export default SkeletonLoader;
