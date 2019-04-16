package cz.fit.vutbr.dao;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.fit.vutbr.constants.ApiConstants;
import cz.fit.vutbr.helper.AddressHelper;
import cz.fit.vutbr.helper.CacheHelper;
import cz.fit.vutbr.model.Address;
import cz.fit.vutbr.service.AddressService;
import cz.fit.vutbr.service.CacheService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static cz.fit.vutbr.helper.AddressHelper.*;

/**
 * Address dao object.
 */
@Component
public class AddressDao {
    @Autowired
    CacheService cacheService;

    @Autowired
    AddressService addressService;

    @Autowired
    CacheHelper cacheHelper;


    @Autowired
    InfoDao infoDao;

    /**
     * Returns address list.
     */
    public List<Address> getAddresses() {
        JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_DEFAULT, "");
        // Default caching without request to Toreator
        List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
        String lastModified = AddressHelper.getLastModified(cachedValue);
        if(validCacheResults != null){
            return validCacheResults;
        }
        JSONObject response = addressService.getAddressList(lastModified);
        if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
            JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
            List<Address> addresses =
                    resultsToList(results).stream().map(id -> addAddress(id, null)).collect(Collectors.toList());
            cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES_DEFAULT, "", addresses,
                    response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
            return addresses;
        } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
            return cacheHelper.getResultsFromCachedValue(cachedValue);
        }
        return new ArrayList<>();
    }
    /**
     * Returns address list for specific net address.
     * For device address returns same address.
     */
    public List<Address> getAddresses(String address) {
        if (AddressHelper.hasURLNetworkPrefix(address)) {
            JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES, address);
            List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
            String lastModified = AddressHelper.getLastModified(cachedValue);
            if(validCacheResults != null){
                return validCacheResults;
            }
            JSONObject response = addressService.getAddressList(address, lastModified);
            if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
                JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
                List<Address> addresses =
                        resultsToList(results).stream().map(id -> addAddress(id, address)).collect(Collectors.toList());
                cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES, address, addresses,
                        response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
                return addresses;
            } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
                return cacheHelper.getResultsFromCachedValue(cachedValue);
            }
            return new ArrayList<>();
        }
        return getInfoAddress(address, null, null, null, null);
    }

    /**
     * Returns dates for specific device address.
     */
    public List<Address> getAddressByDate(String address, String date) {
        if (date.isEmpty()) {
            JSONObject cachedValue =
                    (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_DATES, address);
            List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
            String lastModified = AddressHelper.getLastModified(cachedValue);
            if(validCacheResults != null){
                return validCacheResults;
            }
            JSONObject response = addressService.getAddressByDate(address, date, lastModified);
            if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
                JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
                List<Address> addresses = resultsToList(results).stream().map(id -> addAddressWithDate(id, address))
                        .collect(Collectors.toList());
                cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES_DATES, address, addresses,
                        response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
                return addresses;
            } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
                return cacheHelper.getResultsFromCachedValue(cachedValue);
            }
            return new ArrayList<>();
        }
        return getInfoAddress(address, date, null, null, null);
    }

    /**
     * Returns years for specific device address.
     */
    public List<Address> getAddressByYear(String address, String year) {
        if (year.isEmpty()) {
            JSONObject cachedValue =
                    (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_YEARS, address);
            List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
            String lastModified = AddressHelper.getLastModified(cachedValue);
            if(validCacheResults != null){
                return validCacheResults;
            }
            JSONObject response = addressService.getAddressByYear(address, year, lastModified);
            if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
                JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
                List<Address> addresses = resultsToList(results).stream().map(id -> addAddressWithYear(id, address))
                        .collect(Collectors.toList());
                cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES_YEARS, address, addresses,
                        response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
                return addresses;
            } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
                return cacheHelper.getResultsFromCachedValue(cachedValue);
            }
            return new ArrayList<>();
        }
        return getInfoAddress(address, null, null, year, null);
    }

    /**
     * Returns months for specific device address.
     */
    public List<Address> getAddressByMonth(String address, String month) {
        if (month.isEmpty()) {
            JSONObject cachedValue =
                    (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_MONTHS, address);
            List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
            String lastModified = AddressHelper.getLastModified(cachedValue);
            if(validCacheResults != null){
                return validCacheResults;
            }
            JSONObject response = addressService.getAddressByMonth(address, month, lastModified);
            if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
                JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
                List<Address> addresses = resultsToList(results).stream().map(id -> addAddressWithMonth(id, address))
                        .collect(Collectors.toList());
                cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES_MONTHS, address, addresses,
                        response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
                return addresses;
            } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
                return cacheHelper.getResultsFromCachedValue(cachedValue);
            }
            return new ArrayList<>();
        }
        return getInfoAddress(address, null, null, null, month);
    }


    /**
     * Returns times for specific device address.
     */
    public List<Address> getAddressByTime(String address, String time) {
        if (time.isEmpty()) {
            JSONObject cachedValue =
                    (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_TIMES, address);
            List<Address> validCacheResults = cacheHelper.getValidResultsFromCache(cachedValue);
            String lastModified = AddressHelper.getLastModified(cachedValue);
            if(validCacheResults != null){
                return validCacheResults;
            }
            JSONObject response = addressService.getAddressByTime(address, time, lastModified);
            if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
                JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
                List<Address> addresses = resultsToList(results).stream().map(id -> addAddressWithTime(id, address))
                        .collect(Collectors.toList());
                cacheHelper.addToCache(ApiConstants.CACHE_ADDRESSES_TIMES, address, addresses,
                        response.get(ApiConstants.PARAM_LAST_MODIFIED),response.get(ApiConstants.PARAM_CACHE_CONTROL));
                return addresses;
            } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
                return cacheHelper.getResultsFromCachedValue(cachedValue);
            }
            return new ArrayList<>();
        }
        return getInfoAddress(address, null, time, null, null);
    }


    /**
     * Returns ipv4 list.
     */
    public List<Address> getIpv4Addresses() {
        return getAddresses("0.0.0.0-0");
    }

    /**
     * Returns ipv6 list.
     */
    public List<Address> getIpv6Addresses() {
        return getAddresses("2000::-3");
    }

    private List<String> resultsToList(JSONArray results) {
        return results.toList().stream().map(record -> ((ArrayList<String>) record).get(0))
                .collect(Collectors.toList());
    }

}
