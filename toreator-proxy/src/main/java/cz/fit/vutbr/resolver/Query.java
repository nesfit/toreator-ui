package cz.fit.vutbr.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import cz.fit.vutbr.dao.AddressDao;
import cz.fit.vutbr.dao.RequestDao;
import cz.fit.vutbr.model.Address;
import cz.fit.vutbr.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Query GraphQL configuration.
 */
@Component
public class Query implements GraphQLQueryResolver {
    @Autowired
    AddressDao addressDao;

    @Autowired
    RequestDao requestDao;


    public List<Address> addresses() {
        return addressDao.getAddresses();
    }

    public List<Address> addressInfo(String address) {
        return addressDao.getAddresses(address);
    }

    public List<Address> addressesIpv4() {
        return addressDao.getIpv4Addresses();
    }

    public List<Address> addressesIpv6() {
        return addressDao.getIpv6Addresses();
    }


    public List<Address> addressByDate(String address, String date) {
        return addressDao.getAddressByDate(address, date);
    }

    public List<Address> addressByTime(String address, String time) {
        return addressDao.getAddressByTime(address, time);
    }

    public List<Address> addressByYear(String address, String year) {
        return addressDao.getAddressByYear(address, year);
    }

    public List<Address> addressByMonth(String address, String month) {
        return addressDao.getAddressByMonth(address, month);
    }

    public Response  create(String url) {
        return requestDao.create(url);
    }
}
