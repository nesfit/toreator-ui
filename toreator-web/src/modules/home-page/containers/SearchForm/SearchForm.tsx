import * as React from "react";
import {SyntheticEvent} from "react";
import {FormattedMessage} from "react-intl";
import NumberFormat from "react-number-format";
import {connect} from "react-redux";
import {compose} from "redux";
import Box from "../../../shared/components/Box";
import Flex from "../../../shared/components/Flex";
import {Filters as FilterParams} from "../../constants/toreator";
import {submitSearchForm} from "../../ducks/actions/searchForm";
import {isLoadingLastRequest} from "../../ducks/selectors/api";
import {
  getActiveFilter,
  getFilterInput,
  getIpAddress,
  getResponseIpAddress,
} from "../../ducks/selectors/searchForm";
import {validateInput} from "../../utils/validators";
import Filters from "../Filters";
import messages from "./SearchForm.messages";
import {
  Button,
  CustomFilterInput,
  ErrorMessage,
  StyledInput,
} from "./SearchForm.styled";

export const getPropsForFilter = (filter: string) => {
  switch (filter) {
    case FilterParams.MONTH: {
      return {
        format: "####/##",
        mask: ["Y", "Y", "Y", "Y", "M", "M"],
        placeholder: "YYYY/MM",
      };
    }
    case FilterParams.YEAR: {
      return {
        format: "####",
        mask: ["Y", "Y", "Y", "Y"],
        placeholder: "YYYY",
      };
    }
    case FilterParams.DATE: {
      return {
        format: "####/##/##",
        mask: ["Y", "Y", "Y", "Y", "M", "M", "D", "D"],
        placeholder: "YYYY/MM/DD",
      };
    }
    case FilterParams.TIME: {
      return {
        format: "####/##/## ##:##:##",
        mask: [
          "Y",
          "Y",
          "Y",
          "Y",
          "M",
          "M",
          "D",
          "D",
          "H",
          "H",
          "M",
          "M",
          "S",
          "S",
        ],
        placeholder: "YYYY/MM/DD HH/MM/SS",
      };
    }
  }
};

interface Props {
  activeFilter: string;
  lastIpAddress?: string;
  lastActiveFilter?: string;
  submitSearchForm?: (object: {}) => void;
  lastFilterInput?: string;
  isLoadingLastRequest?: boolean;
}

const Input = (props: any) => <StyledInput {...props} />;

const SearchForm = ({
  lastActiveFilter,
  lastIpAddress,
  submitSearchForm,
  lastFilterInput,
  isLoadingLastRequest,
}: Props) => {
  // @ts-ignore
  const [ipAddress, setIpAddress] = React.useState(lastIpAddress);
  // @ts-ignore
  const [filterInput, setFilterInput] = React.useState(lastFilterInput);
  // @ts-ignore
  const [activeFilter, setActiveFilterState] = React.useState(lastActiveFilter);
  // @ts-ignore
  const [error, setError] = React.useState({});

  // @ts-ignore
  React.useEffect(
    () => {
      setIpAddress(getResponseIpAddress(lastIpAddress));
      setFilterInput(lastFilterInput);
      setActiveFilterState(lastActiveFilter);
      setError({});
    },
    [lastIpAddress, lastFilterInput, lastActiveFilter],
  );

  const setActiveFilter = (newFilter: string) => {
    setActiveFilterState(
      activeFilter === newFilter ? FilterParams.NONE : newFilter,
    );
    setFilterInput("");
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    const errors = validateInput(ipAddress, filterInput);
    if (Object.keys(errors).length !== 0) {
      setError(errors);
      return false;
    }
    submitSearchForm({ipAddress, filterInput, activeFilter});
  };

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Box pl={4} pr={4}>
          <Filters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <Flex
            flexDirection={["column", "column", "row"]}
            maxWidth="900px"
            m="0 auto"
            alignItems="space-between"
          >
            <Box flex="1 1 auto" mr={[0, 0, 4]}>
              <StyledInput
                value={ipAddress}
                // @ts-ignore
                hasError={error.ipAddress}
                onChange={e => {
                  setError({});
                  setIpAddress(e.target.value);
                }}
                maxLength={39}
                type="text"
                placeholder="Enter IP address"
              />
              <ErrorMessage hasError={error.ipAddress}>
                <FormattedMessage {...messages.ipAddressError} />
              </ErrorMessage>
            </Box>
            <CustomFilterInput
              isVisible={activeFilter !== FilterParams.NONE}
              flex="0"
              minWidth={220}
              mr={[0, 0, 4]}
              mt={[4, 4, 0]}
            >
              <NumberFormat
                type="tel"
                onValueChange={({formattedValue}) => {
                  setError({});
                  setFilterInput(formattedValue);
                }}
                customInput={Input}
                value={filterInput}
                // @ts-ignore
                hasError={error.filterInput}
                {...getPropsForFilter(activeFilter)}
              />
              <ErrorMessage hasError={error.filterInput}>
                <FormattedMessage {...messages.filterInputError} />
              </ErrorMessage>
            </CustomFilterInput>
            <Box flex="0 0 auto" mt={[4, 4, 0]}>
              <Button type="submit" disabled={isLoadingLastRequest}>
                <FormattedMessage {...messages.submit} />
              </Button>
            </Box>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default compose(
  connect(
    state => ({
      activeFilter: getActiveFilter(state),
      lastIpAddress: getIpAddress(state),
      lastActiveFilter: getActiveFilter(state),
      lastFilterInput: getFilterInput(state),
      isLoading: isLoadingLastRequest(state),
    }),
    dispatch => ({
      submitSearchForm: (form: object) => dispatch(submitSearchForm(form)),
    }),
  ),
)(SearchForm);
