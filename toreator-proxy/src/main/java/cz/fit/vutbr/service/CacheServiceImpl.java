package cz.fit.vutbr.service;

import cz.fit.vutbr.constants.ApiConstants;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.support.SimpleValueWrapper;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Cache util functions.
 */
@Service
public class CacheServiceImpl implements CacheService {

    @Autowired
    CacheManager cacheManager;

    public void evictSingleCacheValue(String cacheName, Object cacheKey) {
        cacheManager.getCache(cacheName).evict(cacheKey);
    }

    public void evictAllCacheValues(String cacheName) {
        cacheManager.getCache(cacheName).clear();
    }

    public void evictAllCaches() {
        cacheManager.getCacheNames().stream()
                .forEach(cacheName -> cacheManager.getCache(cacheName).clear());
    }

    public void addToCache(String cacheName, Object cacheKey, Object data) {
        cacheManager.getCache(cacheName).put(cacheKey, data);
    }


    public Object getCacheValue(String cacheName, Object cacheKey) {
        SimpleValueWrapper cachedValue = (SimpleValueWrapper) cacheManager.getCache(cacheName).get(cacheKey);
        if (cachedValue != null) {
            return (JSONObject) cachedValue.get();
        }
        return null;
    }

    /**
     * Evicts cache after period of time.
     */
    public void setTTL(String cacheName, Integer milliseconds) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Thread.sleep(milliseconds);
                } catch (InterruptedException ie) {
                }
                evictAllCacheValues(cacheName);
            }
        }).start();
    }

    /**
     * Evicts cache key after period of time.
     */
    public void setTTL(String cacheName, Object cacheKey, Integer milliseconds) {
        new Thread(new Runnable() {
            public void run() {
                try {
                    Thread.sleep(milliseconds);
                } catch (InterruptedException ie) {
                }
                evictSingleCacheValue(cacheName, cacheKey);
            }
        }).start();
    }

    /**
     * Checks if cache value is still valid.
     */
    public Boolean isInValidTimeRange(String lastModified) {
        if(lastModified!= null && !lastModified.isEmpty()) {
          return  (new Date(Long.parseLong(lastModified)).getTime() +
                  ApiConstants.DEFAULT_CACHE_TTL ) > new Date().getTime();
        }
        return false;
    }
}