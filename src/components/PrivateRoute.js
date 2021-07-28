import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ isAuthenticated, component, path }) => {
  return isAuthenticated ? <Route path={path} component={component}/> : <Redirect to='/'/>
}

export default React.memo(PrivateRoute)