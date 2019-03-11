import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Box from "../../../shared/components/Box/index";
import Flex from "../../../shared/components/Flex/Flex";
import logo from "../../assets/icons8-new-moon-48.png";
import messages from "./Menu.messages";
import {MenuBar} from "./Menu.styled";

const Title = styled(Box)`
  color: black;
  font-weight: 500;
  font-size: 26px;
`;
const Menu = () => (
  <MenuBar>
    <Link to={"/"}>
      <Flex pl={2} pt={2}>
        <Box>
          <img alt="toreator" src={logo} height="30px" />
        </Box>
        <Title as="span">
          <FormattedMessage {...messages.title} />
        </Title>
      </Flex>
    </Link>
  </MenuBar>
);

export default Menu;
