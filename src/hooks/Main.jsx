import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Start from './Start';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Main(props) {
  return (
    <div>
      <Switch>
        <Route path="/inicio" component={Start} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/inicio" />
      </Switch>
    </div>
  );
}

export default withRouter(Main);
