import React from 'react';
import { Skeleton } from './ui/skeleton';

const SkeletonDemo = () => {
  return (
    <div className="space-x-4 space-y-5 bg-white p-6">
      <Skeleton className="ml-5 h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-8 w-[250px]" />
      </div>
    </div>
  );
};

export default SkeletonDemo;
