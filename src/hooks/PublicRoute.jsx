import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }, props) => {
  const logged = props.logged;
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        logged && restricted ? (
          <Redirect to="/inicio" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
