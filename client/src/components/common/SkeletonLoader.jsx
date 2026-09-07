import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse space-y-3">
      <div className="w-full h-48 bg-gray-200 rounded-xl" />
      <div className="h-4 bg-gray-200 rounded-md w-3/4" />
      <div className="h-3 bg-gray-200 rounded-md w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 bg-gray-200 rounded-md w-1/3" />
        <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
      </div>
    </div>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
      <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-1" />
      <div className="h-3 bg-gray-200 rounded-md w-1/3" />
    </div>
  );
};
