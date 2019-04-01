import {Filters, ResultFilters as filters} from "../constants/toreator";
import {normalizedFilterInput} from "../ducks/actions/api";
import {
  getFilterParamFromRequest,
  getResponseIpAddress,
} from "../ducks/selectors/searchForm";

interface Props {
  activeResultFilter: string;
  getDefaultIpList: () => void;
  getIPv4ListRequest: () => void;
  getIPv6ListRequest: () => void;
  submitForm: (object: {}) => void;
  setActiveFilter: (filter: string) => void;
  pathname?: string;
}

export const initialize = ({
  pathname = "",
  submitForm,
  activeResultFilter,
  getDefaultIpList,
  getIPv4ListRequest,
  getIPv6ListRequest,
  setActiveFilter,
}: Props) => {
  // Process URL parameters
  const [ipAddress = "", activeFilter = "", filterInput = ""] = pathname
    .split("/")
    .filter(item => item.length > 0);

  const normalizedIpAddress = getResponseIpAddress(ipAddress);
  const normalizedActiveFilter = getFilterParamFromRequest(activeFilter);
  const normalizedFilter = normalizedFilterInput(
    filterInput,
    normalizedActiveFilter,
  );

  // Submit Form, get default results
  if (ipAddress !== "") {
    submitForm({
      ipAddress: normalizedIpAddress,
      filterInput: normalizedFilter,
      activeFilter: normalizedActiveFilter,
    });
  } else {
    setActiveFilter(Filters.NONE);
    if (activeResultFilter === filters.NONE) {
      getDefaultIpList();
    } else if (activeResultFilter === filters.IPV4) {
      getIPv4ListRequest();
    } else if (activeResultFilter === filters.IPV6) {
      getIPv6ListRequest();
    }
  }
};
