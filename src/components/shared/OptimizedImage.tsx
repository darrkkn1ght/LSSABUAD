import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  ...props 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {!loaded && !error && <Skeleton className="absolute inset-0 z-10" />}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-700 ease-out",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs p-2 text-center">
          Failed to load image
        </div>
      )}
    </div>
  );
}
