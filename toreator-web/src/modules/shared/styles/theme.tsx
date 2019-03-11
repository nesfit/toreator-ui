// tslint:disable:object-literal-sort-keys
import {css} from "styled-components";
interface Breakpoints {
  [key: string]: number;
}
const getMediaBreakpoints = (mediaBreakpoints: Breakpoints) =>
  // @ts-ignore
  Object.entries(mediaBreakpoints).reduce(
    (acc: [], [label, size]: [string, any]) => ({
      ...acc,
      [label]: (...args: [any]) => css`
        @media (min-width: ${size / 16}em) {
          ${css(...args)};
        }
      `,
    }),
    {},
  );

export const getEmBreakpoints = (mediaBreakpoints: Breakpoints): any =>
  // @ts-ignore
  Object.entries(mediaBreakpoints).map(
    // eslint-disable-next-line no-unused-vars
    ([_, size]: [string, any]) => `${size / 16}em`,
  );

const breakpoints: Breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const media = getMediaBreakpoints(breakpoints);

const theme: any = {
  space: [
    0, // 0
    4, // 1
    8, // 2
    12, // 3
    16, // 4
    20, // 5
    24, // 6
    28, // 7
    32, // 8
    36, // 9
    40, // 10
    44, // 11
    48, // 12
    52, // 13
    56, // 14
  ],
  media,
  breakpoints: getEmBreakpoints(breakpoints),
  fontSizes: [],
  lineHeights: [],
  weights: [],
  palette: {
    purpleColor: "#52489C",
    greenColor: "#20b04d",
    pinkColor: "#d84f87",
    redColor: "#e40421",
    pinkHoverColor: "#d84f97",
  },
};

export default theme;
