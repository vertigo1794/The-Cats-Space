/**
 * High-performance Video Caching & Preloading Engine
 * Leverages the browser Cache Storage API & in-memory Blob URLs
 * to ensure instant playback without network delays.
 */

const CACHE_NAME = 'ocean-whiskers-video-v1';
const memoryBlobMap = new Map<string, string>();
const inFlightRequests = new Map<string, Promise<string>>();

/**
 * Checks if a video URL is already cached in browser Cache Storage or memory.
 */
export async function getCachedVideoUrl(url: string): Promise<string> {
  // Check in-memory map first (instant 0ms)
  if (memoryBlobMap.has(url)) {
    return memoryBlobMap.get(url)!;
  }

  // Deduplicate simultaneous requests for same video
  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)!;
  }

  const promise = (async () => {
    try {
      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME);
        const matched = await cache.match(url);
        if (matched) {
          const blob = await matched.blob();
          const blobUrl = URL.createObjectURL(blob);
          memoryBlobMap.set(url, blobUrl);
          return blobUrl;
        }

        // Fetch and cache in background
        const res = await fetch(url, { cache: 'force-cache' });
        if (res.ok) {
          // Clone response before consuming
          const resClone = res.clone();
          await cache.put(url, resClone);
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          memoryBlobMap.set(url, blobUrl);
          return blobUrl;
        }
      }
    } catch {
      // Fallback to direct network URL if Cache Storage is blocked or throws
    }
    return url;
  })();

  inFlightRequests.set(url, promise);
  try {
    const result = await promise;
    return result;
  } finally {
    inFlightRequests.delete(url);
  }
}

/**
 * Preload high-priority videos into browser cache during idle periods
 */
export function preloadVideos(urls: string[]) {
  if (typeof window === 'undefined') return;

  const preloadTask = () => {
    urls.forEach((url) => {
      getCachedVideoUrl(url).catch(() => {
        // Silently tolerate preload errors
      });
    });
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(preloadTask);
  } else {
    setTimeout(preloadTask, 1200);
  }
}
