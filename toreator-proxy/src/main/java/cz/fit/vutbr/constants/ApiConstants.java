package cz.fit.vutbr.constants;

/**
 * Toreator Proxy constants.
 */
public class ApiConstants {
    public static final String BASE_URL = System.getenv("TOREATOR_URL");
    public static final String CACHE_ADDRESSES = "CACHE_ADDRESSES";
    public static final String CACHE_INFO = "CACHE_INFO";
    public static final String CACHE_ADDRESSES_DEFAULT = "CACHE_ADDRESSES_DEFAULT";
    public static final String CACHE_ADDRESSES_TIMES = "CACHE_ADDRESSES_TIMES";
    public static final String CACHE_ADDRESSES_DATES = "CACHE_ADDRESSES_DATES";
    public static final String CACHE_ADDRESSES_YEARS = "CACHE_ADDRESSES_YEARS";
    public static final String CACHE_ADDRESSES_MONTHS = "CACHE_ADDRESSES_MONTHS";
    public static final String CACHE_INFO_TIMES = "CACHE_INFO_TIMES";
    public static final String CACHE_INFO_DATES = "CACHE_INFO_DATES";
    public static final String CACHE_INFO_YEARS = "CACHE_INFO_YEARS";
    public static final String CACHE_INFO_MONTHS = "CACHE_INFO_MONTHS";
    public static final String CACHE_REQUESTS = "CACHE_REQUESTS";

    public static final String PARAM_LAST_MODIFIED = "lastModified";
    public static final String PARAM_DATA = "data";
    public static final String PARAM_RESPONSE_BODY = "responseBody";
    public static final String PARAM_STATUS = "status";
    // Default in millis
    public static final String DEFAULT_CACHE_TTL = System.getenv("TOREATOR_PROXY_CACHE_TTL");
}
