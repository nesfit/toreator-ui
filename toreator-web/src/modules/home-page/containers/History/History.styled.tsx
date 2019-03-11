import * as React from "react";
import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";

export const SearchPath = styled(Box)`
  font-weight: 300;
  color: gray;
  font-size: 16px;
  cursor: pointer;
  > span {
    white-space: nowrap;
  }
`;
export const HistoryTitle = styled(Flex)`
  img {
    display: block;
  }
`;

export const ResetButton = styled(Box)`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  img {
    display: block;
    padding-right: 4px;
  }
  a,
  a:focus,
  a:hover,
  a:visited {
    text-decoration: none;
    color: white;
  }
  background: #e40421;
`;
