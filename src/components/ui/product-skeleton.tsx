import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border overflow-hidden shadow-soft bg-background animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-80 bg-gradient-to-br from-secondary/30 via-secondary/20 to-secondary/30 bg-[length:200%_200%] animate-shimmer" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gradient-to-r from-secondary/40 via-secondary/20 to-secondary/40 rounded-full w-3/4 bg-[length:200%_200%] animate-shimmer" />
        
        {/* Price */}
        <div className="h-6 bg-gradient-to-r from-secondary/40 via-secondary/20 to-secondary/40 rounded-full w-1/3 bg-[length:200%_200%] animate-shimmer" />
        
        {/* Color Swatches */}
        <div className="flex gap-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-secondary/40 bg-[length:200%_200%] animate-shimmer"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
