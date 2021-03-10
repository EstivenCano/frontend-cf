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
import "../css/AppBar.css";
import axios from 'axios'

const AppBar = () => {
  const user = useUser();

  function AuthenticationButtons() {
    const auth = useAuth();
    const signIn = async () => {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
        var googleUser = result.user;
        console.log(googleUser.email);
        if (googleUser) {
          async function fetchData() {
            const result = await axios.post(
              `http://localhost:3001/addUser/${googleUser.email}`
            );
            console.log(result.data.mensaje);
          }
          return fetchData();
        } else {
          return console.log("Null profile");
        }
      });;
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

  function AppB() {
    return (
      <Grid>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 50, padding: "1em 0em" }}
          vertical
        >
          <Menu fixed="top" size="large">
            <Menu.Item as="a" active>
              {user.data != null ? user.data.displayName : "Invitado"} 🔥
            </Menu.Item>
            <Menu.Item as="a">Convocatorias</Menu.Item>
            <Menu.Item as="a">Aplicar</Menu.Item>
            <Menu.Item as="a">Crear</Menu.Item>
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
