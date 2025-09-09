import {
  fontCache,
  lineNumberWidthCache,
  sizeCache,
  tokenCache,
} from "./utils";

let disposeHighlighters: (() => void) | undefined;

export function setHighlighterDisposeFunction(fn: () => void) {
  disposeHighlighters = fn;
}

export class CacheManager {
  private static instance: CacheManager;
  private cleanupInterval?: NodeJS.Timeout;

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  checkMemoryUsage(): void {
    const memUsage = process.memoryUsage();
    if (memUsage.heapUsed > 100 * 1024 * 1024) {
      this.clear();
    }
  }

  startCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(
      () => {
        this.checkMemoryUsage();
      },
      5 * 60 * 1000,
    );
  }

  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
  }

  clear(): void {
    lineNumberWidthCache.clear();
    tokenCache.clear();
    fontCache.clear();
    sizeCache.clear();
    if (disposeHighlighters) {
      disposeHighlighters();
    }
  }

  stats(): {
    cache: Record<string, number>;
    used: number;
    total: number;
    limit: number;
    heapUsed: number;
    heapTotal: number;
    external: number;
    arrayBuffers: number;
    rss: number;
  } {
    const memUsage = process.memoryUsage();

    return {
      cache: {
        lineNumberWidthCache: lineNumberWidthCache.size,
        tokenCache: tokenCache.size,
        fontCache: fontCache.size,
        sizeCache: sizeCache.size,
      },
      used: Math.round(memUsage.heapUsed / 1024),
      total: Math.round(memUsage.heapTotal / 1024),
      limit: Math.round((memUsage.heapTotal + memUsage.external) / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024),
      external: Math.round(memUsage.external / 1024),
      arrayBuffers: Math.round(memUsage.arrayBuffers / 1024),
      rss: Math.round(memUsage.rss / 1024),
    };
  }

  forceGC(): void {
    if (global.gc) {
      global.gc();
    }
  }
}

CacheManager.getInstance().startCleanup();
