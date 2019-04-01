import * as React from "react";
import {Link} from "react-router-dom";
import Box from "../../../shared/components/Box/Box";
import {Row} from "../../containers/Results/Results.styled";
import {AddressRecord} from "../../ducks/selectors/api";

interface Props {
  result: AddressRecord;
  getIpAddressInfo: (object: {}) => string;
}
const AddressList = ({result, getIpAddressInfo}: Props) => {
  const date = result.date;
  const time = result.time;
  const month = result.month;
  const year = result.year;

  return (
    <Row>
      <Link to={getIpAddressInfo(result)}>
        {!year && !month && !time && !date && result.id}
        {date && <Box as="span">{date}</Box>}
        {year && <Box as="span">{year}</Box>}
        {month && <Box as="span">{month}</Box>}
        {time && <Box as="span">{time}</Box>}
      </Link>
    </Row>
  );
};

export default AddressList;
