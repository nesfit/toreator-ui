import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";
import reset from "../../assets/icons8-delete-filled.svg";
import history from "../../assets/icons8-time-machine-50.png";
import {getSearchPath} from "../../ducks/selectors/searchPath";
import messages from "./History.messages";
import {HistoryTitle, ResetButton, SearchPath} from "./History.styled";
interface Props {
  searchPath: string[];
  getIpAddressInfo: (address: object) => void;
}

const History = ({searchPath, getIpAddressInfo}: Props) => (
  <Box pt={8} fontSize="18px" fontWeight={500} pl={4} pr={4}>
    <HistoryTitle alignItems="center">
      <Box pr={2}>
        <img height="20px" src={history} />
      </Box>
      <Box>History:</Box>
    </HistoryTitle>
    <Flex pt={2} alignItems="center">
      <Box>
        {searchPath.map((path, index) => (
          <Box
            key={path}
            onClick={() => getIpAddressInfo({id: path})}
            as="span"
          >
            <SearchPath as="span" pb={2}>
              {index > 0 ? <span> -></span> : ""}
              {path}{" "}
            </SearchPath>
          </Box>
        ))}
      </Box>
      <ResetButton alignSelf="center" ml={4}>
        <Link to="/">
          <Flex>
            <Box>
              <img alt="reset" src={reset} width="18px" />
            </Box>
            <Box>
              <FormattedMessage {...messages.clear} />
            </Box>
          </Flex>
        </Link>
      </ResetButton>
    </Flex>
  </Box>
);

export default connect(state => ({
  searchPath: getSearchPath(state),
}))(History);
