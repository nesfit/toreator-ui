package cz.fit.vutbr;

import cz.fit.vutbr.constants.ApiConstants;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class CacheConfiguration {

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(
                ApiConstants.CACHE_ADDRESSES_DEFAULT,
                ApiConstants.CACHE_ADDRESSES,
                ApiConstants.CACHE_ADDRESSES_DATES,
                ApiConstants.CACHE_ADDRESSES_YEARS,
                ApiConstants.CACHE_ADDRESSES_MONTHS,
                ApiConstants.CACHE_ADDRESSES_TIMES,
                ApiConstants.CACHE_INFO,
                ApiConstants.CACHE_INFO_DATES,
                ApiConstants.CACHE_INFO_YEARS,
                ApiConstants.CACHE_INFO_MONTHS,
                ApiConstants.CACHE_INFO_TIMES,
                ApiConstants.CACHE_REQUESTS
        );
    }
}
