import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';

import { addLocaleData, IntlProvider } from 'react-intl';

import en_GB from 'antd/lib/locale-provider/en_GB';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import { CookiesProvider } from 'react-cookie';
const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

const appLocale = window.appLocale;

addLocaleData(appLocale.data);

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={en_GB}>
      <CookiesProvider>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/user"
            component={UserLayout}
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
      </IntlProvider>
      </CookiesProvider>
    </LocaleProvider>
  );
}

export default RouterConfig;
