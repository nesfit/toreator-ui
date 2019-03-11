package cz.fit.vutbr.helper;

import cz.fit.vutbr.model.Address;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import static cz.fit.vutbr.constants.ApiConstants.PARAM_LAST_MODIFIED;

/**
 * Helper functions to parse address data.
 */
public class AddressHelper {

    public static Boolean hasURLNetworkPrefix(String query) {
        return query.matches(".*-\\d\\d?\\d?$");
    }

    public static Boolean hasNetworkPrefix(String query) {
        return query.matches(".*/\\d\\d?\\d?$");
    }

    private static String getLastPrefix(String id) {
        String idParts[] = id.split("\\s");
        if (idParts.length > 1) {
            return idParts[idParts.length - 1];
        }
        return "";
    }

    private static String getAddressPrefix(String id) {
        String idParts[] = id.split("\\s");
        return idParts[0];
    }

    public static Address addAddressWithDate(String id, String netAddress) {
        Address address = addAddress(getAddressPrefix(id), netAddress);
        address.setDate(getLastPrefix(id));
        return address;
    }

    public static Address addAddressWithYear(String id, String netAddress) {
        Address address = addAddress(getAddressPrefix(id), netAddress);
        address.setYear(getLastPrefix(id));
        return address;
    }

    public static Address addAddressWithMonth(String id, String netAddress) {
        Address address = addAddress(getAddressPrefix(id), netAddress);
        address.setMonth(getLastPrefix(id));
        return address;
    }

    public static Address addAddressWithTime(String id, String netAddress) {
        Address address = addAddress(getAddressPrefix(id), netAddress);
        address.setTime(getLastPrefix(id));
        return address;
    }

    public static Address addAddress(String id, String netAddress) {
        Address address;
        address = new Address();
        address.setId(id);
        address.setNetAddress(netAddress);
        return address;
    }

    public static List<Address> getInfoAddress(String address, String date, String time, String year, String month) {
        List<Address> infoAddresses = new ArrayList<>();
        Address infoAddress = new Address();
        infoAddress.setId(address);
        infoAddress.setDate(date);
        infoAddress.setTime(time);
        infoAddress.setYear(year);
        infoAddress.setMonth(month);
        infoAddresses.add(infoAddress);
        return infoAddresses;
    }

    public static String getLastModified(JSONObject object) {
        return object != null && object.get(PARAM_LAST_MODIFIED) != null ? object.get(PARAM_LAST_MODIFIED).toString() : null;
    }
}
