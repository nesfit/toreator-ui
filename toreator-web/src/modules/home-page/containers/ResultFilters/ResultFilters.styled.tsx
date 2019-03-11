import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";

export const ResultFilter = styled(Box)`
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 4px;
  font-weight: 500;
  background: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  ${({isActive}) =>
    isActive &&
    `
  background: #20b04d;
  color: white;
  border: 1px solid white;
  `};
`;