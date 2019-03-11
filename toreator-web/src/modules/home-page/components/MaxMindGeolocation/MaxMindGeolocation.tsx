import {includes} from "ramda";
import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Filters} from "../../constants/toreator";
import {InfoLink, Item} from "../Info/Info.styled";
import messages from "./MaxMindGeolocation.messages";

const hiddenFields = ["geolocation source", "timestamp"];

export const parseArraysToList = (
  array: string[][],
  getIpAddressInfo: (object: {}) => void,
) => {
  if (!array || array.length === 0) {
    return null;
  }
  return (
    <ul>
      {array.map(
        (item: any = []) =>
          item.length === 2 &&
          !includes(item[0], hiddenFields) && (
            <li key={item[0]}>
              {item[0]}:{" "}
              {item[0] === "network" ? (
                <InfoLink
                  onClick={() =>
                    getIpAddressInfo({filter: Filters.NONE, id: item[1]})
                  }
                >
                  {item[1]}
                </InfoLink>
              ) : (
                item[1]
              )}
            </li>
          ),
      )}
    </ul>
  );
};

interface MaxMindGeolocationProps {
  maxMindGeolocation?: any;
  children?: React.ReactNode;
  getIpAddressInfo: (object: {}) => void;
}
const MaxMindGeolocation = ({
  maxMindGeolocation = {},
  children,
  getIpAddressInfo,
}: MaxMindGeolocationProps) => {
  const keys = Object.keys(maxMindGeolocation);
  if (!keys || keys.length === 0) {
    return null;
  }
  return (
    <Item>
      {children}
      <ul>
        {keys.map((key: string) => (
          <li key={key}>
            <FormattedMessage {...messages.from} />{" "}
            <InfoLink
              onClick={() =>
                getIpAddressInfo({
                  filter: Filters.TIME,
                  time: `${key}`,
                })
              }
            >
              {key}
            </InfoLink>
            :
            <ul>
              {parseArraysToList(maxMindGeolocation[key], getIpAddressInfo)}
            </ul>
          </li>
        ))}
      </ul>
    </Item>
  );
};

export default MaxMindGeolocation;
