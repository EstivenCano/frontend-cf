import React from "react";
import firebase from "firebase/app";
import { useAuth, useUser, AuthCheck } from "reactfire";
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
          <Button color="instagram" fluid onClick={signIn} animated>
            <ButtonContent visible>
              <Icon name="google" /> Iniciar con Google
            </ButtonContent>
            <ButtonContent hidden>
              <Icon name="user" />
            </ButtonContent>
          </Button>
        }
      >
        <Button color="google plus" fluid onClick={signOut} animated>
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

  function getRol() {
    if (props.moderator === true) {
      window.open("/create", "_self");
    }
    else{
      if (props.manager === true) {
        window.open("/applylist", "_self");
      }
    }
    
  }

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
            <Menu.Item href="/start">Inicio</Menu.Item>
            <Menu.Item onClick={getRol}>
              {props.moderator === true
                ? "Crear"
                : props.manager === true
                ? "Lista de aplicaciones"
                : props.teacher === true
                ? "Observaciones"
                : ""}
            </Menu.Item>
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
