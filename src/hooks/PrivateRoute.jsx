import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component,logged,rol, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route 
      {...rest}
      render={(props) =>
        rol ? <Component {...props} /> : <Redirect to="/inicio" />
      }
    />
  );
};

export default PrivateRoute;
