import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Start from './Start';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ApplyStudent from './ApplyStudent';
import CreateOffer from './CreateOffer';

function Main(props) {
  return (
    <div>
      <Switch>
        <Route path="/inicio" component={Start} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/aplicar" component={ApplyStudent} />
        <Route path="/crearConvocatoria" component={CreateOffer} />
        <Redirect to="/inicio" />
      </Switch>
    </div>
  );
}

export default withRouter(Main);
