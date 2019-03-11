import * as React from "react";
import {FormattedMessage} from "react-intl";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";
import filter from "../../assets/icons8-filter-white-50.png";
import {Filters as FilterParams} from "../../constants/toreator";
import messages from "./Filters.messages";
import {FilterSelect, FilterWrapper, Label} from "./Filters.styled";

interface FilterProps {
  filterName: string;
  onChange: (filterName: string) => void;
  isChecked: boolean;
  children?: React.ReactNode;
}
export const Filter = ({
  filterName,
  isChecked,
  onChange,
  children,
}: FilterProps) => (
  <Box>
    <Label as="label" isChecked={isChecked}>
      <input
        checked={isChecked}
        type="checkbox"
        onChange={() => onChange(filterName)}
      />
      {children}
    </Label>
  </Box>
);

interface FiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const Filters = ({activeFilter, setActiveFilter}: FiltersProps) => (
  <FilterWrapper maxWidth="900px" m="0 auto" flexDirection={"column"}>
    <Flex alignItems="center">
      <Box>
        <img src={filter} height="24px" />
      </Box>
      <Box pl={1} fontSize="16px">
        <FormattedMessage {...messages.header} />
      </Box>
    </Flex>
    <FilterSelect mt={2} mb={2} alignItems="flex-start" flexWrap="wrap">
      <Filter
        filterName={FilterParams.DATE}
        onChange={setActiveFilter}
        isChecked={FilterParams.DATE === activeFilter}
      >
        <FormattedMessage {...messages.filterDate} />
      </Filter>
      <Filter
        filterName={FilterParams.YEAR}
        onChange={setActiveFilter}
        isChecked={FilterParams.YEAR === activeFilter}
      >
        <FormattedMessage {...messages.filterYear} />
      </Filter>
      <Filter
        filterName={FilterParams.MONTH}
        onChange={setActiveFilter}
        isChecked={FilterParams.MONTH === activeFilter}
      >
        <FormattedMessage {...messages.filterMonth} />
      </Filter>
      <Filter
        filterName={FilterParams.TIME}
        onChange={setActiveFilter}
        isChecked={FilterParams.TIME === activeFilter}
      >
        <FormattedMessage {...messages.filterTime} />
      </Filter>
    </FilterSelect>
  </FilterWrapper>
);

export default Filters;
