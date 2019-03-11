import styled from "styled-components";
import Box from "../../../shared/components/Box/Box";

export const MenuBar = styled(Box)`
  position: fixed;
  top: 0;
  height: 50px;
  background: white;
  z-index: 10;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.21);

  a {
    text-decoration: none;
  }
`;
