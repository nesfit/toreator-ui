import * as React from "react";
import reducerRegistry from "./reducerRegistry";
import {injectSaga} from "./sagas";
interface Spec {
  key: string;
  value: any;
}

interface Props {
  reducers?: Spec[];
  sagas?: Spec[];
}

// Reducer and saga dynamic injector
export const withInjectedReducersAndSagas = ({reducers, sagas}: Props) => (
  BaseComponent: React.ComponentType,
) => {
  if (reducers) {
    reducers.map(reducer =>
      reducerRegistry.register(reducer.key, reducer.value),
    );
  }
  if (sagas) {
    sagas.map(saga => injectSaga({key: saga.key, saga: saga.value}));
  }

  return BaseComponent;
};
