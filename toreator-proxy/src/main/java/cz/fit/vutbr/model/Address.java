package cz.fit.vutbr.model;

/**
 * Address object.
 */
public class Address {
    private String id;
    private String netAddress;
    private String month = "";
    private String year = "";
    private String time = "";
    private String date = "";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNetAddress() {
        return netAddress;
    }

    public void setNetAddress(String netAddress) {
        if (netAddress != null) {
            this.netAddress = netAddress;
        }
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        if (month != null) {
            this.month = month;
        }
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        if (year != null) {
            this.year = year;
        }
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        if (time != null) {
            this.time = time;
        }
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        if (date != null) {
            this.date = date;
        }
    }
}
