import styled from "styled-components";
import {
  alignSelf,
  color,
  display,
  flex,
  fontSize,
  fontWeight,
  justifyContent,
  maxWidth,
  minWidth,
  space,
  textAlign,
  width,
} from "styled-system";

const Box: any = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${fontWeight}
  ${color}
  ${flex}
  ${alignSelf}
  ${maxWidth}
  ${minWidth}
  box-sizing: border-box;
  ${display}  
  ${justifyContent}  
  ${textAlign}  
`;

export default Box;
