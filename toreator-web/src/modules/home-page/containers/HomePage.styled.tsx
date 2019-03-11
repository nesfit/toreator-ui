import styled from "styled-components";
import Box from "../../shared/components/Box/Box";

export const Container = styled(Box)`
  position: relative;
`;

export const Loading = styled(Box)`
  position: absolute;
  display: none;
  ${({isLoading}) =>
    isLoading &&
    `
  display:block;
  
  `};
  top: -10px;
  right: 20px;
  ${({theme: {media}}) => media.md`
  right: 100px;`} @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      -webkit-box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      -moz-box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  animation: pulse 2s infinite;
  border-radius: 100px;
  width: 80px;
`;