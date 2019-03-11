import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {compose} from "redux";
import {withInjectedReducersAndSagas} from "../../../common/store/helpers";
import Box from "../../shared/components/Box";
import loading from "../assets/icons8-satellite-signal-96.png";
import Menu from "../components/Menu/Menu";
import {
  API_REDUCER,
  API_SAGA,
  SEARCH_FORM_REDUCER,
  SEARCH_PATH_REDUCER,
} from "../constants/toreator";
import {reducer} from "../ducks/reducers/api";
import {reducer as searchFormReducer} from "../ducks/reducers/searchForm";
import {reducer as searchPathReducer} from "../ducks/reducers/searchPath";
import {rootSaga} from "../ducks/sagas/api";
import {isLoadingLastRequest} from "../ducks/selectors/api";
import messages from "./HomePage.messages";
import "./HomePage.scss";
import {Container, Loading} from "./HomePage.styled";
import Results from "./Results/Results";
import SearchForm from "./SearchForm";
interface Props {
  isLoading?: boolean;
}
const HomePage = ({isLoading}: Props) => {
  return (
    <Box>
      <Menu />
      <Container>
        <Box
          as="h1"
          pl={4}
          pr={4}
          mb={6}
          mt={["80px", "80px", "150px"]}
          fontSize={["24px", "24px", "36px"]}
          textAlign={["left", "left", "center"]}
        >
          <FormattedMessage {...messages.header} />
        </Box>
        <SearchForm />
        <Results />
        <Loading isLoading={isLoading}>
          <img height="80px" src={loading} />
        </Loading>
      </Container>
    </Box>
  );
};

export default compose(
  withInjectedReducersAndSagas({
    reducers: [
      {
        key: API_REDUCER,
        value: reducer,
      },
      {
        key: SEARCH_PATH_REDUCER,
        value: searchPathReducer,
      },
      {
        key: SEARCH_FORM_REDUCER,
        value: searchFormReducer,
      },
    ],
    sagas: [
      {
        key: API_SAGA,
        value: rootSaga,
      },
    ],
  }),
  connect((state, props) => ({
    isLoading: isLoadingLastRequest(state),
  })),
)(HomePage);
