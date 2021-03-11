import React, { useState, useEffect } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import Start from "./Start";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import PublicRoute from "./PublicRoute";
import { useUser } from "reactfire";
import axios from "axios";

function Main(props) {
  const user = useUser();
  const [logged, setLogged] = useState(false);
  const [roles, setRoles] = useState({});

  useEffect(() => {
    if (user.data != null) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [user]);

  useEffect(() => {
    async function getRoles() {
      if (user.data != null) {
        const resultado = await axios.get(
          `http://localhost:3001/roles/${user.data.email}`
        );
        setRoles(resultado.data.roles._fieldsProto)
        console.log(resultado.data.roles._fieldsProto)
      } 
      else {
        setRoles({});
      }
    }
    getRoles()
  }, [user.data]);

  return (
    <div className="App">
      <AppBar user={user} logged={logged} roles={roles} />
      <Switch>
        <PublicRoute logged={logged} path="/start" component={Start} />
        <PublicRoute logged={logged} path="/signin" component={SignIn} />
        <PublicRoute logged={logged} path="/signup" component={SignUp} />
        <Redirect to="/start" />
      </Switch>
    </div>
  );
}

export default withRouter(Main);
