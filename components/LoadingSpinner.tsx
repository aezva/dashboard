'use client';

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-nia-pink/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-nia-pink rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 