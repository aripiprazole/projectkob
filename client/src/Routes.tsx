import React from "react";

import { Switch } from "react-router";

import GuestRoute from "components/GuestRoute";
import PrivateRoute from "components/PrivateRoute";

import AppNewPage from "pages/apps/New";
import HomePage from "pages/Home";
import AppViewPage from "pages/apps/View";
import AppsOverviewPage from "pages/apps/Overview";
import LoginPage from "pages/Login";
import OAuthCallbackPage from "pages/OAuthCallback";

const Routes: React.VFC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/apps/new"} component={AppNewPage} />
      <PrivateRoute exact path={"/apps/view"} component={AppViewPage} />
      <PrivateRoute exact path={"/apps"} component={AppsOverviewPage} />
      <PrivateRoute exact path={"/"} component={HomePage} />

      <GuestRoute exact path={"/login"} component={LoginPage} />
      <GuestRoute
        exact
        path={"/oauth-callback"}
        component={OAuthCallbackPage}
      />
    </Switch>
  );
};

export default Routes;
