import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { useAuth, useUser } from "reactfire";

function LoginForm() {
  //useState
  const auth = useAuth();
  const { data: actualUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState([
    {
      Student: true,
      Manager: true,
    },
  ]);

  const login = async () => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      actualUser.providerData.map((profile) => {
        if (profile) {
          return console.log(profile.email);
        } else {
          return console.log("Null profile");
        }
      });
    });
  };

  const GoogleSign = async () => {
    await auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        actualUser.providerData.map((profile) => {
          if (profile) {
            async function fetchData() {
              const result = await axios.post(
                `http://localhost:3001/addUser/${profile.email}`
              );

              console.log(result.data.mensaje)
            }
            return fetchData();
          } else {
            return console.log("Null profile");
          }
        });
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" inverted color="black" textAlign="center">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/1200px-Escudo_Universidad_de_Medellin.svg.png" />
          Iniciar Sesión
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Dirección de correo"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Contraseña"
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button color="teal" fluid size="large" onClick={login}>
              Iniciar sesión
            </Button>
          </Segment>
        </Form>
        <Message>
          ¿No tienes una cuenta? <a href="/signup">Crear una</a>
        </Message>
        <Button color="google plus" fluid size="large" onClick={GoogleSign}>
          <Icon name="google" /> Google
        </Button>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
