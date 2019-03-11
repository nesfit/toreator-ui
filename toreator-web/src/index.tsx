import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ToreatorUi from "./modules/ToreatorUi";
// @ts-ignore
import registerServiceWorker from "./registerServiceWorker";

if (process.env.NODE_ENV === "production") {
  registerServiceWorker();
}

export interface Props {
  targetElementId: string;
}

const initialProps: Props = {
  targetElementId: "toreator-root",
  // messages:{
  // "HomePage.header": "RewrittenMessage"
  // }
};

export const render = (props: Props = initialProps) => {
  return ReactDOM.render(
    <ToreatorUi {...props} />,
    document.getElementById(props.targetElementId),
  );
};

render(initialProps);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(() => render(initialProps));
}
