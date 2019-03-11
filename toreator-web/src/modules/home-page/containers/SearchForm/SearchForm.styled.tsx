import * as React from "react";
import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";

export const StyledInput = styled.input`
  width: 100%;
  transition: 0.3s color, 0.3s background;
  background: transparent;
  border: 1px solid #fff;
  padding: 16px 8px;
  color: #fff;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  &::placeholder {
    color: #8590aa;
  }
  &:focus {
    background: white;
    color: black;
  }
  ::ms-clear {
    display: none;
  }
  // @ts-ignore
  ${({hasError, theme: {palette}}) =>
    hasError &&
    `
   border: 1px solid ${palette.redColor};
  `};
`;
export const CustomFilterInput = styled(Box)`
  ${({isVisible}) =>
    !isVisible &&
    `
display: none;
`};
  ${StyledInput} {
    &::placeholder,
    & {
      text-align: center;
    }
  }
`;
export const Button = styled.button`
  height: 52px;
  width: 100%;
  border: none;
  appearance: none;
  outline: none;
  background: #d84f87;
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 32px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({theme: {palette}}) => palette.pinkHoverColor};
  }
`;

export const ErrorMessage = styled(Box)`
  font-size: 14px;
  padding-top: 4px;
  ${({hasError}) =>
    !hasError &&
    `
  display: none;
  `}
  color: ${({theme: {palette}}) => palette.redColor};
`;
