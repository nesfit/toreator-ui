package cz.fit.vutbr.dao;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.fit.vutbr.constants.ApiConstants;
import cz.fit.vutbr.helper.AddressHelper;
import cz.fit.vutbr.model.Info;
import cz.fit.vutbr.service.CacheService;
import cz.fit.vutbr.service.InfoService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Info dao object.
 */
@Component
public class InfoDao {
    @Autowired
    InfoService infoService;

    @Autowired
    CacheService cacheService;

    /**
     * Returns specific device address info.
     */
    public List<Info> getAddressInfo(String address) {
        if (!AddressHelper.hasNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_INFO, address);
            String lastModified = AddressHelper.getLastModified(cachedValue);

            if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
                return getResultFromCachedValue(cachedValue);
            }
            JSONObject response = infoService.getAddressInfo(address, lastModified);
            return processApiResponse(response, address, cachedValue, ApiConstants.CACHE_INFO, address);
        }
        return new ArrayList<>();
    }

    /**
     * Returns specific device address info for Date.
     */
    public List<Info> getAddressInfoWithDate(String address, String date) {
        if (!AddressHelper.hasNetworkPrefix(address) && !AddressHelper.hasURLNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_INFO_DATES,
                    address + date);
            String lastModified = AddressHelper.getLastModified(cachedValue);

            if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
                return getResultFromCachedValue(cachedValue);
            }
            JSONObject response = infoService.getAddressInfoWithDate(address, date, lastModified);
            return processApiResponse(response, address, cachedValue, ApiConstants.CACHE_INFO_DATES, address + date);
        }
        return new ArrayList<>();
    }

    /**
     * Returns specific device address info for Time.
     */
    public List<Info> getAddressInfoWithTime(String address, String time) {
        if (!AddressHelper.hasNetworkPrefix(address) && !AddressHelper.hasURLNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_INFO_TIMES,
                    address + time);
            String lastModified = AddressHelper.getLastModified(cachedValue);

            if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
                return getResultFromCachedValue(cachedValue);
            }
            JSONObject response = infoService.getAddressInfoWithTime(address, time, lastModified);
            return processApiResponse(response, address, cachedValue, ApiConstants.CACHE_INFO_TIMES, address + time);
        }
        return new ArrayList<>();

    }

    /**
     * Returns specific device address info for Year.
     */
    public List<Info> getAddressInfoWithYear(String address, String year) {

        if (!AddressHelper.hasNetworkPrefix(address) && !AddressHelper.hasURLNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_INFO_YEARS,
                    address + year);
            String lastModified = AddressHelper.getLastModified(cachedValue);

            if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
                return getResultFromCachedValue(cachedValue);
            }
            JSONObject response = infoService.getAddressInfoWithYear(address, year, lastModified);
            return processApiResponse(response, address, cachedValue, ApiConstants.CACHE_INFO_YEARS,
                    address + year);
        }
        return new ArrayList<>();
    }

    /**
     * Returns specific device address info for Month.
     */
    public List<Info> getAddressInfoWithMonth(String address, String month) {
        if (!AddressHelper.hasNetworkPrefix(address) && !AddressHelper.hasURLNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_INFO_MONTHS,
                    address + month);
            String lastModified = AddressHelper.getLastModified(cachedValue);

            if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
                return getResultFromCachedValue(cachedValue);
            }
            JSONObject response = infoService.getAddressInfoWithMonth(address, month, lastModified);
            return processApiResponse(response, address, cachedValue, ApiConstants.CACHE_INFO_MONTHS,
                    address + month);

        }
        return new ArrayList<>();
    }

    /**
     * Calls Api service and caches response.
     */
    private List<Info> processApiResponse(JSONObject response, String address,
                                          JSONObject cachedValue, String cacheName, String cacheKey) {
        if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
            JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
            List<Info> info = results.toList().stream()
                    .map(result -> addInfo(address, result)).collect(Collectors.toList());
            addToCache(cacheName, cacheKey, info, response.get(ApiConstants.PARAM_LAST_MODIFIED));
            return info;
        } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
            return getResultFromCachedValue(cachedValue);
        }
        return new ArrayList<>();
    }


    private Info addInfo(String address, Object result) {
        Info info = new Info();
        info.setAddressId(address);
        try {
            info.setData(new JSONObject(new HashMap<String, String>() {{
                putAll((HashMap<String, String>) result);
            }}).toString());
        } catch (Exception e) {
            info.setData("");
        }
        return info;
    }

    private void addToCache(String cacheName, Object cacheKey, List<Info> info, Object lastModified) {
        JSONObject cacheValue = new JSONObject();
        cacheValue.put(ApiConstants.PARAM_DATA, info);
        cacheValue.put(ApiConstants.PARAM_LAST_MODIFIED, lastModified);
        cacheService.addToCache(cacheName, cacheKey, cacheValue);
    }

    private List<Info> getResultFromCachedValue(JSONObject cachedValue) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(cachedValue.get(ApiConstants.PARAM_DATA).toString(),
                    new TypeReference<List<Info>>() {
            });
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
