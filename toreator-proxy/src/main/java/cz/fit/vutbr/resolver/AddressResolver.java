package cz.fit.vutbr.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import cz.fit.vutbr.dao.InfoDao;
import cz.fit.vutbr.model.Address;
import cz.fit.vutbr.model.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Address resolver for additional requests.
 */
@Component
public class AddressResolver implements GraphQLResolver<Address> {

    @Autowired
    InfoDao infoDao;

    public AddressResolver(InfoDao infoDao) {
        this.infoDao = infoDao;
    }

    /**
     * Returns valid info based on parameters
     */
    public List<Info> getInfo(Address address) {
        if (!address.getDate().isEmpty()) {
            return infoDao.getAddressInfoWithDate(address.getId(), address.getDate());
        } else if (!address.getTime().isEmpty()) {
            return infoDao.getAddressInfoWithTime(address.getId(), address.getTime());
        } else if (!address.getYear().isEmpty()) {
            return infoDao.getAddressInfoWithYear(address.getId(), address.getYear());
        } else if (!address.getMonth().isEmpty()) {
            return infoDao.getAddressInfoWithMonth(address.getId(), address.getMonth());
        }
        return infoDao.getAddressInfo(address.getId());
    }
}
