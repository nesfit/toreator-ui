import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";
import Flex from "../../../shared/components/Flex/Flex";
import data from "../../assets/icons8-combo-chart-50.png";
import messages from "./Results.messages";

interface TitleProps {
  hasSearchResults?: boolean;
}
export const Title = ({hasSearchResults}: TitleProps) => (
  <Flex alignItems="center" pt={8} pl={4} pr={4}>
    <Box>
      <img height="26px" src={data} />
    </Box>
    <Box ml={2} fontSize="24px">
      {hasSearchResults ? (
        <Box>
          <FormattedMessage {...messages.results} />
        </Box>
      ) : (
        <Box>
          <FormattedMessage {...messages.ipAddresses} />
        </Box>
      )}
    </Box>
  </Flex>
);

export const LinkWrapper = styled(Box)`
  font-size: 16px;
  text-decoration: none;
  a,
  a:focus,
  a:visited {
    color: ${({theme: {palette}}) => palette.pinkColor};
  }
  a:hover {
    color: ${({theme: {palette}}) => palette.pinkHoverColor};
  }
`;

export const NoResultsBox = styled(props => (
  <Box pl={4} pr={4} textAlign="center" {...props}>
    {props.hasError ? (
      <Box>
        <FormattedMessage {...messages.unavailable} />
      </Box>
    ) : (
      <Box>
        <FormattedMessage {...messages.noResults} />
      </Box>
    )}
    <LinkWrapper pt={4}>
      <Link to="/">
        <FormattedMessage {...messages.defaultLink} />
      </Link>
    </LinkWrapper>
  </Box>
))`
  font-weight: 500;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 8px;
  font-size: 18px;
`;

export const Container = styled(Box)`
  background: white;
  color: black;
  ${({hasInitialLoading}) =>
    !hasInitialLoading &&
    `
  padding-bottom: 32px;`};
  ${({hasResults}) =>
    hasResults &&
    `
  min-height: 100vh;
  `};

  position: relative;
`;
export const Overlay = styled(Box)`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
`;

export const Table = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;
export const InfoList = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  ul {
    margin: 0 auto;
  }
`;
export const Row = styled(Box)`
  a {
    text-decoration: none;
    color: black;
  }
  a:visited,
  a:active,
  a:hover {
    color: black;
  }
  padding: 4px;
  margin: 4px;
  min-width: 200px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;
