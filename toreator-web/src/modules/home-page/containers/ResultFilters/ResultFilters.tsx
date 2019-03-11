import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import Box from "../../../shared/components/Box";
import Flex from "../../../shared/components/Flex";
import filter from "../../assets/icons8-filter-50.png";
import {ResultFilters as filters} from "../../constants/toreator";
import {setResultFilter} from "../../ducks/actions/searchForm";
import messages from "./ResultFilters.messages";
import {ResultFilter} from "./ResultFilters.styled";

interface Props {
  activeResultFilter: string;
  setActiveResultFilter: (filter: string) => void;
}

const ResultFilters = ({activeResultFilter, setActiveResultFilter}: Props) => (
  <Box pt={8} pl={4} pr={4}>
    <Flex>
      <Box>
        <img height="26px" src={filter} />
      </Box>
      <Box fontSize="24px" pl={2}>
        <FormattedMessage {...messages.header} />
      </Box>
    </Flex>
    <Flex mt={4} alignItems="center" flexWrap="wrap">
      <Box mr={4} mb={[2, 2, 0]} fontWeight={500}>
        <Box>
          <FormattedMessage {...messages.ipAddressFilter} />
        </Box>
      </Box>
      <ResultFilter
        onClick={() => setActiveResultFilter(filters.IPV4)}
        isActive={activeResultFilter === filters.IPV4}
      >
        <FormattedMessage {...messages.filterIpv4} />
      </ResultFilter>
      <ResultFilter
        onClick={() => setActiveResultFilter(filters.IPV6)}
        isActive={activeResultFilter === filters.IPV6}
      >
        <FormattedMessage {...messages.filterIpv6} />
      </ResultFilter>
    </Flex>
  </Box>
);

export default connect(
  state => ({}),
  dispatch => ({
    setActiveResultFilter: (activeFilter: string) =>
      dispatch(setResultFilter(activeFilter)),
  }),
)(ResultFilters);
