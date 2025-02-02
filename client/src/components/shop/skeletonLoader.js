// src/components/SkeletonLoader.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <Skeleton height={160} className="rounded-md" />
      <div className="mt-4">
        <Skeleton height={20} width="75%" />
      </div>
      <div className="mt-2">
        <Skeleton height={20} width="50%" />
      </div>
      <div className="mt-4">
        <Skeleton height={35} className="rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
