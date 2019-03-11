import * as React from "react";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import store from "../common/store/store";
import DynamicRoute from "./shared/components/Router";
import theme from "./shared/styles/theme";

// @ts-ignore
const lazy = React.lazy;

export const routes = {
  homePage: () =>
    // @ts-ignore
    lazy(() => import(/* webpackChunkName: "HomePage" */ "./home-page")),
};
interface Props {
  defaultLocale: string;
  locale: string;
  messages: object;
}

class ToreatorUi extends React.PureComponent<Props> {
  public static defaultProps = {
    defaultLocale: "en",
    locale: "en",
    messages: {},
  };

  public render() {
    const {defaultLocale, locale, messages} = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IntlProvider
            defaultLocale={defaultLocale}
            locale={locale}
            messages={messages}
          >
            <Router>
              <Switch>
                <DynamicRoute
                  exact={true}
                  path="/"
                  loadAsyncModuleFn={routes.homePage}
                />
              </Switch>
            </Router>
          </IntlProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default ToreatorUi;
