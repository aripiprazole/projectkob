import React from "react";

import { useSelector } from "react-redux";

import { Redirect, Route, RouteProps } from "react-router-dom";

const GuestRoute: React.FC<RouteProps> = (props) => {
  const { token, user } = useSelector((state) => state.session);

  if (token && user) {
    return <Redirect to={"/"} />;
  }

  return <Route {...props} />;
};

export default GuestRoute;
