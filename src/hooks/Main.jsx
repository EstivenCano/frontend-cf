import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Start from "./Start";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";

function Main(props) {

    return (
      <div className="App">
        <AppBar/>
        <Switch>
          <Route path="/start" component={Start} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/start" />
        </Switch>
      </div>
    )
  
}

export default withRouter(Main);
