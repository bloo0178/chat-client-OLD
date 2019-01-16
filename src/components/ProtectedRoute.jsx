import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, userid, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userid !== "" ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default ProtectedRoute;
