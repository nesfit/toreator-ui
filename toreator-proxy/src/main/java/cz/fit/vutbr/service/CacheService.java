package cz.fit.vutbr.service;

public interface CacheService {
    void evictSingleCacheValue(String cacheName, Object cacheKey);

    void evictAllCacheValues(String cacheName);

    void evictAllCaches();

    void setTTL(String cacheName, Integer milliseconds);

    void setTTL(String cacheName, Object cacheKey, Integer milliseconds);

    void addToCache(String cacheName, Object cacheKey, Object data);

    Object getCacheValue(String cacheName, Object cacheKey);

    Boolean isInValidTimeRange(String lastModified);
    Boolean isInValidTimeRange(String lastModified, long cacheControl);
}
