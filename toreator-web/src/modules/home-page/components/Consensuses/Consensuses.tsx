import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {Filters} from "../../constants/toreator";
import {InfoLinkWrapper, Item} from "../Info/Info.styled";
import messages from "./Consensuses.messages";

export const getTimeWithMessage = (
  item: string[],
  message: React.ReactNode,
  getIpAddressInfo: (object: {}) => string,
) =>
  item.length === 2 ? (
    <span>
      {message}{" "}
      <span>
        ("
        <InfoLinkWrapper>
          <Link
            to={getIpAddressInfo({
              filter: Filters.TIME,
              time: `${item[0]} ${item[1]}`,
            })}
          >
            {item[0]}
            &nbsp;
            {item[1]}
          </Link>
        </InfoLinkWrapper>
        ")
      </span>
    </span>
  ) : null;

interface ConsensusesProps {
  inconsensus_val_after?: string[];
  inconsensus_fresh_until?: string[];
  inconsensus_val_until?: string[];
  getIpAddressInfo: (object: {}) => string;
}

const Consensuses = ({
  inconsensus_val_after = [],
  inconsensus_fresh_until = [],
  inconsensus_val_until = [],
  getIpAddressInfo,
}: ConsensusesProps) => {
  if (
    inconsensus_val_after.length === 2 ||
    inconsensus_fresh_until.length === 2 ||
    inconsensus_val_until.length === 2
  ) {
    return (
      <Item>
        <FormattedMessage {...messages.header} />{" "}
        {getTimeWithMessage(
          inconsensus_val_after,
          <FormattedMessage {...messages.after} />,
          getIpAddressInfo,
        )}
        {inconsensus_val_after.length === 2 && ", "}
        {getTimeWithMessage(
          inconsensus_fresh_until,
          <FormattedMessage {...messages.fresh} />,
          getIpAddressInfo,
        )}
        {inconsensus_fresh_until.length === 2 && ", "}
        {getTimeWithMessage(
          inconsensus_val_until,
          <FormattedMessage {...messages.valid} />,
          getIpAddressInfo,
        )}
      </Item>
    );
  }
  return null;
};

export default Consensuses;
