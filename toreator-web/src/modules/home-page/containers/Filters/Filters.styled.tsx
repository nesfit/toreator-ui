import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";

export const Label = styled(Box)`
  input {
    position: absolute;
    left: -9999px;
  }
  display: block;
  position: relative;
  padding: 8px 16px 8px 32px;
  border: 1px solid white;
  border-radius: 4px;
  color: #fff;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  ${({isChecked}) =>
    isChecked &&
    `
  color: black;
    background: white;
  `};
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    color: black;
    background: white;

    &::before {
      ${({theme: {palette}}) => `
        border: 1px solid ${palette.greenColor};
        `};
    }
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    width: 12px;
    border: 1px solid white;
    background: white;
    border-radius: 100px;
    transition: background-color 0.2s;
    ${({isChecked, theme: {palette}}) =>
      isChecked &&
      `
    border: 1px solid ${palette.greenColor};
    background: ${palette.greenColor};
    
    `};
  }
`;

export const FilterSelect = styled(Flex)`
  > ${Box}:not(:last-of-type) {
    margin-right: 16px;
  }
  > ${Box} {
    margin-bottom: 16px;
  }
`;

export const FilterWrapper = styled(Flex)``;
