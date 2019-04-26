package cz.fit.vutbr.helper;

import cz.fit.vutbr.constants.ApiConstants;
import cz.fit.vutbr.model.Response;
import cz.fit.vutbr.service.CacheService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.sun.jmx.mbeanserver.Util.cast;

/**
 *  Helper functions for cache
 */
@Component
public class CacheHelper {

    @Autowired
    CacheService cacheService;


    public void addToCache(String cacheName, Object cacheKey, Object data, Object lastModified, Object cacheControl) {
        JSONObject cacheValue = new JSONObject();
        cacheValue.put(ApiConstants.PARAM_DATA, data);
        cacheValue.put(ApiConstants.PARAM_LAST_MODIFIED, lastModified);
        cacheValue.put(ApiConstants.PARAM_CACHE_CONTROL, cacheControl);
        cacheService.addToCache(cacheName, cacheKey, cacheValue);
    }

    public  <T> List<T> getResultsFromCachedValue(JSONObject cachedValue) {
        try {
            return cast(cachedValue.get(ApiConstants.PARAM_DATA));
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private Response getResultFromCachedValue(JSONObject cachedValue) {
        try {
            return (Response) cachedValue.get(ApiConstants.PARAM_DATA);
        } catch (Exception e) {
            return   new Response();
        }
    }

    /**
     * Returns valid cached results
     */
    public <T> List<T> getValidResultsFromCache(JSONObject cachedValue){
        String lastModified = AddressHelper.getLastModified(cachedValue);
        Long cacheControl = AddressHelper.getCacheControl(cachedValue);
        if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified,cacheControl)) {
            return getResultsFromCachedValue(cachedValue);
        }
        return null;
    }

    /**
     * Returns valid cached result
     */
    public Response getValidResultFromCache(JSONObject cachedValue){
        String lastModified = AddressHelper.getLastModified(cachedValue);
        Long cacheControl = AddressHelper.getCacheControl(cachedValue);
        if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified,cacheControl)) {
            return getResultFromCachedValue(cachedValue);
        }
        return null;
    }
}
