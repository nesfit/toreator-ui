import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {connect} from "react-redux";
import Box from "../../../shared/components/Box/Box";
import AddressList from "../../components/AddressList/AddressList";
import Info from "../../components/Info";
import {Filters} from "../../constants/toreator";
import {
  getDefaultApiListRequest,
  getIPv4ListRequest,
  getIPv6ListRequest,
} from "../../ducks/actions/api";
import {
  setFilter,
  setIpAddress,
  submitSearchForm,
} from "../../ducks/actions/searchForm";
import {addSearchPath} from "../../ducks/actions/searchPath";
import {
  getResultDataType,
  getResults,
  hasError,
  hasInitialLoading,
  hasSearchResults,
  isLoadingLastRequest,
} from "../../ducks/selectors/api";
import {
  getActiveFilter,
  getActiveResultFilter,
  getIpAddress,
  getRequestIpAddress,
  getRequestParamFromFilter,
} from "../../ducks/selectors/searchForm";
import {initialize} from "../../utils/results";
import History from "../History";
import ResultFilters from "../ResultFilters";
import {
  Container,
  InfoList,
  NoResultsBox,
  Overlay,
  Table,
  Title,
} from "./Results.styled";

interface Props {
  setIpAddress: (address: string) => void;
  activeResultFilter: string;
  getDefaultIpList: () => void;
  getIPv4ListRequest: () => void;
  getIPv6ListRequest: () => void;
  addSearchPath: (address: string) => void;
  setActiveFilter: (filter: string) => void;
  submitForm: (object: {}) => void;
  results: any;
  isLoading?: boolean;
  hasSearchResults?: boolean;
  hasResults?: boolean;
  ipAddress?: string;
  activeFilter?: string;
  hasNoResults?: boolean;
  hasError?: boolean;
  hasInitialLoading?: boolean;
  resultDataType?: string;
  pathname?: string;
}

interface State {
  dataLength: number;
}

interface IpAddressInfoProps {
  id?: string;
  year?: string;
  month?: string;
  time?: string;
  date?: string;
  filter?: string;
}

const DEFAULT_DATA_LENGTH = 10;

class Results extends React.Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, state: State) {
    if (props.isLoading) {
      return {...state, dataLength: DEFAULT_DATA_LENGTH};
    }
    return null;
  }
  public state = {
    dataLength: DEFAULT_DATA_LENGTH,
  };
  public componentDidMount() {
    initialize(this.props);
  }

  public getIpAddressInfo = ({
    id = this.props.ipAddress,
    year,
    month,
    time,
    date,
    filter,
  }: IpAddressInfoProps) => {
    let filterInput;
    const {activeFilter} = {activeFilter: filter} || this.props;
    switch (activeFilter) {
      case Filters.DATE:
        filterInput = date;
        break;
      case Filters.YEAR:
        filterInput = year;
        break;
      case Filters.MONTH:
        filterInput = month;
        break;
      case Filters.TIME:
        filterInput = time;
        break;
      default:
        filterInput = "";
        break;
    }
    const activeFilterRequestParam = getRequestParamFromFilter(activeFilter);
    return `/${getRequestIpAddress(id)}${
      activeFilterRequestParam ? "/" + activeFilterRequestParam : ""
    }${filterInput !== "" ? "/" + filterInput : ""}`;
  };

  /** Allows render on scroll */
  public fetchMoreData = () => {
    if (this.state.dataLength === this.props.results.length) {
      return;
    }
    let newLength = this.state.dataLength + DEFAULT_DATA_LENGTH;
    newLength =
      newLength > this.props.results.length
        ? this.props.results.length
        : newLength;
    this.setState(state => ({...state, dataLength: newLength}));
  };

  public render() {
    const {
      activeResultFilter,
      results,
      isLoading,
      hasSearchResults,
      hasNoResults,
      hasInitialLoading,
      resultDataType,
      hasError,
    } = this.props;

    return (
      <Container
        mt={6}
        hasResults={!hasNoResults}
        hasInitialLoading={hasInitialLoading}
      >
        {isLoading && <Overlay />}
        {!hasNoResults && (
          <Box maxWidth="1200px" m="0 auto">
            {!hasSearchResults ? (
              <ResultFilters activeResultFilter={activeResultFilter} />
            ) : (
              <History getIpAddressInfo={this.getIpAddressInfo} />
            )}
            <Title hasSearchResults={hasSearchResults} />
            <Box mt={4}>
              {resultDataType === "INFO" ? (
                <InfoList ml={4} mr={4} pl={4} pr={4} pt={4} pb={4}>
                  <InfiniteScroll
                    dataLength={this.state.dataLength}
                    next={this.fetchMoreData}
                    hasMore={this.state.dataLength < results.length}
                    loader={<Box />}
                  >
                    {results
                      .slice(0, this.state.dataLength)
                      .map((result: any, index: number) => (
                        <Info
                          key={`${result.id}${index}`}
                          data={result.data}
                          getIpAddressInfo={this.getIpAddressInfo}
                        />
                      ))}
                  </InfiniteScroll>
                </InfoList>
              ) : (
                <Table ml={4} mr={4} pl={2} pr={2} pt={4} pb={4}>
                  {results.map((result: any, index: number) => (
                    <AddressList
                      key={`${result.id}${index}`}
                      result={result}
                      getIpAddressInfo={this.getIpAddressInfo}
                    />
                  ))}
                </Table>
              )}
            </Box>
          </Box>
        )}
        {!hasInitialLoading &&
          hasNoResults && <NoResultsBox hasError={hasError} />}
      </Container>
    );
  }
}

export default connect(
  state => {
    return {
      activeFilter: getActiveFilter(state),
      activeResultFilter: getActiveResultFilter(state),
      results: getResults(state),
      isLoading: isLoadingLastRequest(state),
      hasSearchResults: hasSearchResults(state),
      hasNoResults: getResults(state).length === 0,
      hasInitialLoading: hasInitialLoading(state),
      resultDataType: getResultDataType(state),
      hasError: hasError(state),
      ipAddress: getIpAddress(state),
    };
  },
  dispatch => ({
    getDefaultIpList: () => dispatch(getDefaultApiListRequest()),
    getIPv4ListRequest: () => dispatch(getIPv4ListRequest()),
    getIPv6ListRequest: () => dispatch(getIPv6ListRequest()),
    submitForm: (form: object) => dispatch(submitSearchForm(form)),
    addSearchPath: (path: string) => dispatch(addSearchPath(path)),
    setIpAddress: (ipAddress: string) => dispatch(setIpAddress(ipAddress)),
    setActiveFilter: (filter: string) => dispatch(setFilter(filter)),
  }),
  // @ts-ignore
)(Results);
