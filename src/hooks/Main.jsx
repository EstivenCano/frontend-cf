import React, { useState, useEffect } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import Start from "./Start";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import ApplyStudent from "./ApplyStudent";
import CreateOffer from "./CreateOffer";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import firebase from "firebase/app";
import { useUser } from "reactfire";
import axios from "axios";
import { Loader, Dimmer } from "semantic-ui-react";

function Main(props) {
  const user = useUser();
  const [logged, setLogged] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [isBusy, setBusy] = useState(true);
  const [student, setStudent] = useState(false);
  const [manager, setManager] = useState(false);
  const [teacher, setTeacher] = useState(false);

  useEffect(() => {
    setBusy(true);
    if (user.data != null) {
      async function fetchData() {
        const result = await axios.post(
          `http://localhost:3001/addUser/${user.data.email}`
        );
        console.log(result.data.mensaje);
      }
      function getRoles() {
        axios
          .get(`http://localhost:3001/roles/${user.data.email}`)
          .then((respuesta) => {
            setModerator(
              respuesta.data.roles._fieldsProto.moderator.booleanValue
            );
            setTeacher(respuesta.data.roles._fieldsProto.teacher.booleanValue);
            setStudent(respuesta.data.roles._fieldsProto.student.booleanValue);
            setManager(respuesta.data.roles._fieldsProto.manager.booleanValue);
          })
          .then(() => {
            setBusy(false);
          });
      }
      fetchData().then(()=>{
        getRoles();
      })
    }
  }, [user.data]);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLogged(true);
    } else {
      setModerator(false);
      setManager(false);
      setStudent(false);
      setTeacher(false);
      setLogged(false);
      setBusy(false);
    }
  });

  return (
    <div>
      {isBusy ? (
        <div>
          <Dimmer active inverted>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </div>
      ) : (
        <div className="App">
          <AppBar
            user={user}
            logged={logged}
            moderator={moderator}
            student={student}
            teacher={teacher}
            manager={manager}
          />
          <Switch>
            <PublicRoute
              logged={logged}
              rol={moderator}
              path="/start"
              component={Start}
            />
            <PublicRoute
              logged={logged}
              rol={true}
              path="/signin"
              component={SignIn}
            />
            <PrivateRoute rol={moderator} path="/signup" component={SignUp} />
            <PrivateRoute
              rol={student}
              path="/apply"
              component={ApplyStudent}
            />
            <PrivateRoute
              rol={moderator}
              path="/create"
              component={CreateOffer}
            />
            <Redirect to="/start" />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default withRouter(Main);
