package cz.fit.vutbr;

import cz.fit.vutbr.constants.ApiConstants;
import cz.fit.vutbr.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.util.Collections;

/**
 * Api configuration class.
 */
@Configuration
public class ApiConfiguration {

    @Autowired
    CacheService cacheService;

    public static HttpEntity<Object> getRestHeaders(String lastModified) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        /* Add header if cache is not empty */
        if (lastModified != null && !lastModified.isEmpty()) {
            headers.setIfModifiedSince(Long.parseLong(lastModified));
        }
        return new HttpEntity<Object>(headers);
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(ApiConstants.BASE_URL));
        return restTemplate;
    }


}
