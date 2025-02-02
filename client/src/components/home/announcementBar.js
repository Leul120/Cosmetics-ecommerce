import React, { useState } from 'react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-indigo-600 text-white py-3 px-4 flex items-center justify-between">
      <div className="flex-1"></div>
      <p className="text-sm font-medium">
        Free shipping on orders over $50! Use code <span className="font-bold">FREESHIP</span> at checkout.
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="flex-1 flex justify-end focus:outline-none"
        aria-label="Close announcement"
      >
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;