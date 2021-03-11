import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted,rol,logged, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route logged={logged} rol={rol}
      render={(props) =>
        props.rol ? (
          <Redirect to="/inicio" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
