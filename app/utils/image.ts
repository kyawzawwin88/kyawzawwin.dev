/**
 * Client-side utility to get image URL for a project.
 * If image_url is a full URL, return as is.
 * If image_url is provided but not a URL, it's treated as an S3 object name and a presigned URL route is returned.
 * Otherwise, returns null.
 */
const imageUrlCache = new Map<string, string>();

export function getImageUrl(imageUrl: string | null | undefined): string | null {
    if (!imageUrl) {
        return null;
    }

    // If it's already a full URL (http/https), return as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
    }

    // Use cache to avoid re-encoding and recreating the route for the same image name
    if (imageUrlCache.has(imageUrl)) {
        return imageUrlCache.get(imageUrl)!;
    }

    const presignedRoute = `/api/image/${encodeURIComponent(imageUrl)}`;
    imageUrlCache.set(imageUrl, presignedRoute);

    return presignedRoute;
}

