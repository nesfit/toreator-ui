package cz.fit.vutbr.model;

import org.springframework.http.HttpStatus;

/**
 * Response object.
 */
public class Response {
    private String status = HttpStatus.INTERNAL_SERVER_ERROR.toString();
    private String responseBody = "";

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResponseBody() {
        return responseBody;
    }

    public void setResponseBody(String responseBody) {
        this.responseBody = responseBody;
    }
}
