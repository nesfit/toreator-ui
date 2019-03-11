import createSagaMiddleware from "redux-saga";
// @ts-ignore
import createSagaMiddlewareHelpers from "redux-saga-watch-actions/lib/middleware";

const sagaMiddleware = createSagaMiddleware();
const runSaga = (saga: any) => sagaMiddleware.run(saga);
const {injectSaga, cancelTask} = createSagaMiddlewareHelpers(sagaMiddleware);

export {cancelTask, injectSaga, runSaga};
export default sagaMiddleware;
