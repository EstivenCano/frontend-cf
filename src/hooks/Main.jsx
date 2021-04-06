import React, { useState, useEffect } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import Start from "../components/Start/Start";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import ApplyStudent from "../components/Apply/ApplyStudent";
import ApplyList from "../components/Apply/ApplyList";
import Announcement from "../components/Announcement/Announcement";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import firebase from "firebase/app";
import { useUser } from "reactfire";
import axios from "axios";
import { Loader, Dimmer } from "semantic-ui-react";
import "../css/Main.css";

function Main(props) {
  const user = useUser();
  const [logged, setLogged] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [isBusy, setBusy] = useState(true);
  const [student, setStudent] = useState(false);
  const [manager, setManager] = useState(false);
  const [teacher, setTeacher] = useState(false);

  /**
   * Añade el usuario a la DB si es us nuev
   * Obtiene su rol para administrar sus permisos
   */
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
      fetchData().then(() => {
        getRoles();
      });
    }
  }, [user.data]);

  /**
   * Verifica si el usuario esta logeado y reestablece los hooks a false. 
   */
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

  /**Verifica si esta ocupado con una petición, si lo está renderiza la pantalla de carga
   * si no, renderiza las rutas.
   */
  return (
    <div>
      {isBusy ? (
        <div>
          <Dimmer active inverted>
            <Loader size="massive">Cargando...</Loader>
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
              component={Announcement}
            />
            <PrivateRoute
              rol={manager}
              path="/applylist"
              component={ApplyList}
            />
            <Redirect to="/start" />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default withRouter(Main);
