import * as React from "react";
import {Route} from "react-router-dom";

// @ts-ignore
const Suspense = React.Suspense;

interface DynamicProps {
  component?: React.ComponentType;
  loadAsyncModuleFn?: () => any;
  path?: string;
  exact?: boolean,
}

export const getAsyncModule = ({asyncComponent: AsyncComponent}: any) => ({
  ...restProps
}: any) => (
  <Suspense fallback={<div />}>
    <AsyncComponent {...restProps} />
  </Suspense>
);
const DynamicRoute = ({
  // @ts-ignore
  component: Component = Route,
  loadAsyncModuleFn,
  ...otherProps
}: DynamicProps) => {
  const asyncComponent = loadAsyncModuleFn();
  const Module = getAsyncModule({asyncComponent});

  // @ts-ignore
  return <Component {...otherProps} component={Module} />;
};

export default DynamicRoute;
