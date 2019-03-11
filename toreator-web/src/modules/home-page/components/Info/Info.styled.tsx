import * as React from "react";
import styled from "styled-components";
import Box from "../../../shared/components/Box";

export const Title = styled.h2`
margin 0 auto;
font-weight: 500;
font-size: 20px;
padding-bottom: 24px;
`;

export const InfoLink = styled(Box)`
  display: inline-block;
  color: ${({theme: {palette}}) => palette.purpleColor};
  cursor: pointer;
`;

export const Item = styled.li``;
