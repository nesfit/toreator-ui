import styled from "styled-components";
import {alignItems, flexDirection, flexWrap} from "styled-system";
import Box from "../Box/Box";

const Flex: any = styled(Box)`
  display: flex;
  ${flexDirection};
  ${flexWrap};
  ${alignItems};
`;

export default Flex;
