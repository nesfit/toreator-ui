import * as React from "react";
import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";

export const SearchPath = styled(Box)`
  font-weight: 300;
  color: gray;
  font-size: 16px;
  cursor: pointer;
  a,
  a:visited,
  a:active,
  a:hover {
    text-decoration: none;
    color: gray;
  }
  a:hover {
    font-weight: 500;
  }

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
  color: white;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  img {
    display: block;
    padding-right: 4px;
  }
  background: #e40421;
`;
