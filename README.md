# Toreator-ui
 
**Toreator-ui** is PWA application for searching IPs in Tor network.
Project is divided into the 2 modules:

* Toreator proxy - GraphQL proxy implementation provides forwarding and caching for Toreator service.
* Toreator web - Single-page React application.  

Project was generated with [create-sbspa](https://www.npmjs.com/package/create-sbspa) tool.


## Getting Started
Install **yarn**
```
npm install -g yarn
```
### Prerequisites
* [Node (recommended 10.13.0)](https://nodejs.org/en/) 
* [Gradle](https://gradle.org/)

## Build and Run application
Application contains Docker configuration for *web* and *proxy*.
### Docker enviroment
Use docker command in root directory of the application
```
docker-compose up --built
```
This will build images and create container with running *proxy* and *web*
### Frontend (in toreator-web/)
Besides docker configuration, it is possible to run modules separately.
In frontend directory install and run *web*.

#### Install dependecies
Yarn:
```
yarn install
```
Gradle:
```
gradle build
```
#### Run in DEV mode
```
yarn start:dev
```
#### Run in PROD mode
Yarn:
```
yarn start
```
Gradle:
```
gradle runWeb
```
Available at [localhost:3000](http://localhost:3000).

### Backend (in toreator-proxy/)
In backend directory install and run *proxy*.

#### Install dependecies
```
gradle build
```
#### Run in PROD mode
```
gradle runApi
```
Available at [localhost:8080](http://localhost:8080).

Graphical UI available at [localhost:8080/graphiql](http://localhost:8080/graphiql).

## Running the tests

### Frontend

Run tests with *yarn*
```
yarn run test
```
Run tests on changed files
```
yarn run test:changed
```
Run tests with coverage
```
yarn run test:coverage
```
Update tests
```
yarn run test:update
```
### Backend

Run **checkstyle** (build/reports/checkstyle.html)
```
gradle checkstyleMain
```
Run **findbugs** (build/reports/findbugs.html)
```
gradle findbugsMain
```

### Coding style tests
* Coding styles for Backend are defined in <backend_folder>/config
* Coding styles for Frontend are defined in <fronted_folder>/tslint.json

Check tests for backend and frontend for more information.

### Hooks
**Frontend** application uses **prepush** and **precommit** hooks.

* *Prepush* is invoked before push to central repository with command:
```
yarn run test:coverage
```
Coverage threshold can be modified in *jest.config.js*

* *Precommit* is invoked before commit. Calls *lint* (static analyzer) to check coding styles.
```
yarn run lint-staged
```
Static analyzer can be modified in *tslint.json*
## Deployment
Deploy frontend or backend with provided docker configuration.
In root frontend or backend directory run
```
docker build . -t <name>:<version>
```
Or use *docker-compose* command
```
docker-compose up --built
```
## Styling

For styling ui, there are [styled-components](https://www.styled-components.com/).

For creating layout, there are two components *Box* and *Flex* (/toreator-web/src/modules/shared/components).

Components can be styled with props or extended with template syntax
```
const StyledDiv = styled.div`
  background: black;
  color: ${props => props.theme.palette.purpleColor};
```
**theme.tsx** (/toreator-web/src/modules/shared/styles/) defines application theme, colors and breakpoints.

This theme is available in props of the styled component. 

Styled components are separated from components with business logic, they use file suffix *.styled.tsx*

Padding based on breakpoints
```
<Box p={[2,2,3,3,4]} />
```
For mobile it will use (2\*4 = 8 -> 2 is index in *space* array in theme.tsx).

For tablet it will use (3\*4 = 12)

For desktop it will use (4\*4 = 16)

## Frontend Modules
This section describes some specific modules in Application

### ToreatorUi.tsx (toreator-web/src/modules)
Main application class with Async route definition. 

Each page (container/component) can be asynchronously loaded with support of Webpack chunks.
It helps to break application into the smaller chunks, which are lazy loaded.

Route definition:
*HomePage* route with root container in "./modules/home-page".
```
export const routes = {
  homePage: () =>
    // @ts-ignore
    lazy(() => import(/* webpackChunkName: "HomePage" */ "./home-page")),
};
```
Routes are evaluated in **Router.tsx** class (modules/shared/components/Router.tsx). You can freely change loading component and other properties of the **DynamicRouter** component.
Each page should be separate module  - lazy loaded.

## Redux and Sagas
Generator provides support for redux and sagas with **async injection** feature. 
This is basic flux implementation for controlling application state.
This logic is used for api calls. 

In development mode redux actions can be seen in [Chrome Redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) 

### Store
Store is defined in *common/store/store.tsx*. It contains store setup with reducers and sagas. Also includes Redux devtools extension for development.

You can add your reducer directly to store or inject it asynchronously.

#### Adding directly to store

Create your reducer **myReducer.tsx**
```
import {combineActions, handleActions} from "redux-actions";

const defaultState = "";

const reducer = handleActions(
  {
    ["MY_REDUCER_ACTION"]:
      (state, {payload: {value}}) => value,
  },
  defaultState,
);
export default reducer;
```
Add it to reducerRegistry **reducerRegistry.tsx**
```

import myReducer from "./reducers/myReducer"

...

 public getReducers() {
    return {
      myReducer: myReducer,
      ...this._reducers};
  }
  
...

```
#### Adding asynchronously to store
Reducers and sagas can be injected asynchronously with implemented helper function in *common/store/helpers.tsx*

**Example usage of async reducer and saga.**

Create an app container
```
import {compose} from "redux";
import * as React from "react";
import {connect} from "react-redux";
import reducer from "./reducers/myReducer";
import {withInjectedReducersAndSagas} from "../../common/store/helpers";
import saga from "./sagas/mySaga";
import {myReducerAction} from "./actions/myActions";

const ExampleContainer = ({value, myReducerAction}) =><div onClick={()=>myReducerAction("click")}>{value}My container!</div>

export default compose(
	withInjectedReducersAndSagas({
		reducers:[
			{
				key: "MY_REDUCER",
				value: reducer
			}
		],
		sagas:[
			{
				key: "MY_SAGA",
				value: saga
			}
		]
	}),
	// after async injection u can easily connect to store
	connect(
		(state)=>({
				value: state["MY_REDUCER"].value
			}), 
		(dispatch)=>({
				myReducerAction: value => dispatch(myReducerAction(value))
			})
        )
	)(ExampleContainer);

```
Reducer definition **./reducers/myReducer**
```
import {combineActions, handleActions} from "redux-actions";

const defaultState = "";

const reducer = handleActions(
    {
        ["MY_REDUCER/MY_REDUCER_ACTION"]:
            (state, {payload: {value}}) => value,
    },
    defaultState,
);
export default reducer;
```
Saga definition **./sagas/mySaga**
```
import {takeEvery} from "redux-saga/effects";

const watchAction = function* watchAction() {
  yield;
};

function* rootSaga() {
  yield takeEvery("MY_REDUCER/MY_REDUCER_ACTION", watchAction);
}

export default rootSaga;
```
Actions definition **./actions/myActions**
```
export const {
  myReducer: {myReducerAction},
} = createActions({
  ["MY_REDUCER"]: {
    [`MY_REDUCER_ACTION`]: value => ({value}),
  },
});
```
### Ducks
Ducks (home-page/ducks/) contain implementation of above example

#### Actions (ducks/actions)
Contains UI actions

* api.tsx - API request and response actions. There are defined graphql requests with two basic API actions
```
export const ApiActions: Action = {
  apiFulfilled: [`${API_REDUCER}/API_FULFILLED`],
  apiRequest: [`${API_REDUCER}/API_REQUEST`],
};
```
*apiRequest* is action that calls *toreator-proxy*

*apiFulfilled* is action invoked after reponse is acquired from *toreator-proxy*

Each request can define variety of props that will be send to **Saga** function described bellow.

*cache* parameter is used to keep response until a page is refreshed. It is used for request that are not changing that often.

**Important**: *getCustomRequest* method can be used for creating custom requests to *toreator-proxy* 

* searchForm.tsx - Search form actions. Actions invoked after user input
```
export const SearchFormActions: Action = {
  setFilter: [`${SEARCH_FORM_REDUCER}/SET_FILTER`],
  setResultFilter: [`${SEARCH_FORM_REDUCER}/SET_RESULT_FILTER`],
  setIpAddress: [`${SEARCH_FORM_REDUCER}/SET_IP_ADDRESS`],
  setFilterInput: [`${SEARCH_FORM_REDUCER}/SET_FILTER_INPUT`],
  submitSearchForm: [`${SEARCH_FORM_REDUCER}/SUBMIT_SEARCH_FORM`],
};
```
* searchPath.tsx - Search history. Actions that save last searched IP address.
```
export const SearchPathActions: Action = {
  addSearchPath: [`${SEARCH_PATH_REDUCER}/ADD_SEARCH_PATH`],
  resetSearchPath: [`${SEARCH_PATH_REDUCER}/RESET_SEARCH_PATH`],
};
```
#### Reducers (ducks/reducers)
Reducers are used to update application state in store

* api.tsx - Api reducer that changes state according to *api* actions
* searchForm.tsx - SearchForm reducer that changes state according to *searchForm* actions
* searchPath.tsx - SearchPath reducer that changes state according to *searchPath* actions
#### [Sagas](https://github.com/redux-saga/redux-saga) (ducks/sagas)
Sagas are used to react on actions in UI. It is great for cache control, api requests, etc.
In this application, there is *api.tsx* saga that reacts on actions:
```
  yield takeEvery(ApiActions.apiRequest, watchApiRequest);
  yield takeEvery(ApiActions.apiRequest, watchDefaultListRequest);
  yield takeLatest(SearchFormActions.setResultFilter, watchSetResultFilter);
  yield takeLatest(SearchFormActions.submitSearchForm, watchSubmitSearchForm);
```
First parameter is action we want to listen on. Second one is fuction with custom logic.
For API request we use action effect *watchApiRequest*
```
const watchApiRequest = function*(action: Action) {
  const {
    query,
    variables,
    requestKey,
    dataType,
    cache,
  } = action.payload.request;
  const api = yield select(getApi);
  const lastValue = api[requestKey].data;

  try {
    // Caching all requests with cache attribute
    if (cache && lastValue) {
      yield put(apiFulfilled({response: {...lastValue}, requestKey, dataType}));
      return;
    }

    const response = yield client.request(query, variables);
    yield put(apiFulfilled({response, requestKey, dataType}));
  } catch (error) {
    yield put(apiFulfilled({error, requestKey, dataType}));
  }
};

```
Properties (query,variables, ...) are obtained from action creators in *ducks/actions/api.tsx*.

*Cache* prop and last value in cache are used to decide if request is needed.

*dataType* prop is used to decide if response should be displayed in a table or as an information list. (because we can get two types of data structures)

You can create another sagas and reducers.
How to add created saga and reducer to store is described above, but example can be found in HomePage.tsx (home-page/containers/)
```
export default compose(
  withInjectedReducersAndSagas({
    reducers: [
      {
        key: API_REDUCER,
        value: reducer,
      },
      {
        key: SEARCH_PATH_REDUCER,
        value: searchPathReducer,
      },
      {
        key: SEARCH_FORM_REDUCER,
        value: searchFormReducer,
      },
    ],
    sagas: [
      {
        key: API_SAGA,
        value: rootSaga,
      },
    ],
  }),
  connect((state, props) => ({
    isLoading: isLoadingLastRequest(state),
  })),
)(HomePage);

```
#### Selectors (ducks/selectors)
Selectors are used to select state from store. They are separated for better understanding of the application lifecycle.
They use basic definition.
```
export const getSearchForm = (state: any): any => state[SEARCH_FORM_REDUCER];

export const getActiveFilter = createSelector(
  getSearchForm,
  (filterState: FilterState) => filterState.filter,
);
```
### Containers/Components

* HomePage.tsx - Root home page container, registers reducers, sagas in store
* SearchForm.tsx - Form with search input and filter select
* Results.tsx - Result container that displays results
* ResultFilters.tsx - Filters in result section (IPv4 and IPv6 filter)
* History.tsx - History components that displays search path
* Filters.tsx - Filters used in search form

### Additional information

Api endpoint can be changed in *toreator.tsx* (constants/)

Webpack build is located in root directory (webpack.config.js)

## Backend Modules
This section describes some specific modules in Application


### Api configuration (ApiConfiguration)
This class contains configuration for API

* headers configuration
* Toreator service url configuration

### Cache configuration (CacheConfiguration)
This class contains configuration for cache

* List of available caches

### CORS filter (CORSFilter)
Filter implementation to allow JavaScript OPTION requests

### Services (/service)
Services are used to define requests, process requests and cache responses

* ApiServiceImpl - API REST client for Toreator service with response parsing
* CacheServiceImpl - Util cache functions
* AddressServiceImpl, InfoServiceImpl, RequestServiceImpl -  request definitions for address, info or custom requests

### Resolvers (/resolver)
Resolvers are used for postprocessing of model fields. For address we can acquire data, which is postprocessing of Address object.

### Models (/model)
Models contains object definition -> same as in schema definition. If getter or setter defined in schema definition is missing in model, it has to
be defined in Resolver. 

For example *getInfo* getter is not in model, so it is in resolver.
### Helper (/helper)
Util functions.

* AddressHelper - util functions to parse Address data

### DAO  (/dao)
Each DAO object contains functions called from Query. 

Each request starts with getting value and last modified timestamp from cache

```
        JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_ADDRESSES_DEFAULT, "");
        String lastModified = AddressHelper.getLastModified(cachedValue);
```
If the value is in cache and value is not older than stated time, the value is returned from the cache.
```
       if (cachedValue != null  && cacheService.isInValidTimeRange(lastModified)) {
            return getResultFromCachedValue(cachedValue);
        }
```
Otherwise we call request to Toreator service. If the service returns 304. We return value from cache.
```
        JSONObject response = addressService.getAddressList(lastModified);
        if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
            JSONArray results = (JSONArray) response.get(ApiConstants.PARAM_DATA);
            List<Address> addresses =
                    resultsToList(results).stream().map(id -> addAddress(id, null)).collect(Collectors.toList());
            addToCache(ApiConstants.CACHE_ADDRESSES_DEFAULT, "", addresses,
                    response.get(ApiConstants.PARAM_LAST_MODIFIED));
            return addresses;
        } else if (response.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
            return getResultFromCachedValue(cachedValue);
        }
```

### Schema (/resources/graphql/address.graphqls)
Schema definition with supporoted queries.

### Additional information
 default cache TTL is defined in ApiConstants (/constants)

## Built With

* [React](https://reactjs.org/) - The web framework used
* [GraphQL](https://graphql.org/learn/) - The api framework used
* [Spring-boot](https://spring.io/projects/spring-boot) - The backend framework used

## Authors

* **Norbert Durcansky** - *Initial work* - [norbertdurcansk](https://bitbucket.org/norbertdurcansk)

## License

This project is licensed under the MIT License
