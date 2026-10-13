import React from "react";

interface CachedImageProps {
    src: string | null;
    alt: string;
    className?: string;
    fallback?: React.ReactNode;
}

// Global cache for loaded images to persist across component re-renders
const imageCache = new Set<string>();

export function CachedImage({ src, alt, className, fallback }: CachedImageProps) {
    const [imageSrc, setImageSrc] = React.useState<string | null>(src);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        if (!src) {
            setIsLoading(false);
            return;
        }

        // Check if image is already cached
        if (imageCache.has(src)) {
            setIsLoaded(true);
            setIsLoading(false);
            setImageSrc(src);
            return;
        }

        // Preload the image
        setIsLoading(true);
        setHasError(false);
        const img = new Image();

        img.onload = () => {
            // Add to cache
            imageCache.add(src);
            setImageSrc(src);
            setIsLoaded(true);
            setIsLoading(false);
        };

        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };

        img.src = src;

        return () => {
            // Cleanup
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (!src || hasError) {
        return fallback || <span className="text-muted">No image</span>;
    }

    return (
        <div className="relative w-full">
            {isLoading && !isLoaded && (
                <div className="flex min-h-24 items-center justify-center bg-bg">
                    <p className="font-mono text-xs text-muted">Loading screenshot</p>
                </div>
            )}
            <img
                src={imageSrc || undefined}
                alt={alt}
                className={`${className || ""} ${isLoading && !isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                loading="lazy"
                decoding="async"
                onLoad={() => {
                    setIsLoaded(true);
                    setIsLoading(false);
                }}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
            />
        </div>
    );
}

