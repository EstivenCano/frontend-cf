import React from "react";
import firebase from "firebase/app";
import { useAuth, useUser, AuthCheck } from "reactfire";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonContent,
  Grid,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";

const AppBar = (props) => {
  const user = useUser();
  const history = useHistory();

  function AuthenticationButtons() {
    const auth = useAuth();
    const signIn = async () => {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    };
    const signOut = async () => {
      await auth.signOut();
    };
    // When authenticated, show the Sign out button, else Sign in
    return (
      <AuthCheck
        fallback={
          <Button color="teal" fluid onClick={signIn} animated>
            <ButtonContent visible>
              <Icon name="google" /> Iniciar con Google
            </ButtonContent>
            <ButtonContent hidden>
              <Icon name="user" />
            </ButtonContent>
          </Button>
        }
      >
        <Button style={{backgroundColor:'#3a3768', color: 'white'}} fluid onClick={signOut} animated>
          <ButtonContent visible>
            <Icon name="google" /> Cerrar sesión
          </ButtonContent>
          <ButtonContent hidden>
            <Icon name="arrow left" />
          </ButtonContent>
        </Button>
      </AuthCheck>
    );
  }

  const ModeratorView = () => {
    return (
      <>
        <Menu.Item
          onClick={() => {
            history.push("/create");
          }}
        >
          Crear convocatoria
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push("/approvedStudents");
          }}
        >
          Estudiantes aprobados
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push("/setUTeacher");
          }}
        >
          Añadir profesor
        </Menu.Item>
      </>
    );
  };

  const TeacherView = () => {
    return (
      <>
        <Menu.Item
          onClick={() => {
            history.push("/create");
          }}
        >
          Realizar seguimiento
        </Menu.Item>
      </>
    );
  };

  const ManagerView = () => {
    return (
      <>
        <Menu.Item
          onClick={() => {
            history.push("/applylist");
          }}
        >
          Solicitudes
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push("/setTeacher");
          }}
        >
          Asignar profesores
        </Menu.Item>
      </>
    );
  };

  function AppB() {
    return (
      <Grid>
        <Segment
          textAlign="center"
          style={{ minHeight: 50, padding: "1em 0em" }}
        >
          <Menu fixed="top" size="large">
            <Menu.Item active>
              {user.data != null ? user.data.displayName : "Invitado"} 🔥
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/start");
              }}
            >
              Inicio
            </Menu.Item>
            {props.moderator ? (
              <ModeratorView />
            ) : props.manager ? (
              <ManagerView />
            ) : props.teacher ? (
              <TeacherView />
            ) : (
              ""
            )}
            <Menu.Item position="right">
              <AuthenticationButtons />
            </Menu.Item>
          </Menu>
        </Segment>
      </Grid>
    );
  }

  return AppB();
};

export default AppBar;
