import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message,
} from "semantic-ui-react";
import "firebase/auth";
import { useAuth } from "reactfire";

function LoginForm() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [pass1, setPassword1] = useState("");
  const [pass2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const ValidatePass = (pass) => {
    if (pass1 !== pass) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  const createUser = async () => {
    if (pass1 === pass2) {
      setError(false);
      await auth.createUserWithEmailAndPassword(email, pass1);
    } else {
      setError(true);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/1200px-Escudo_Universidad_de_Medellin.svg.png" /> 
          Crear una cuenta
        </Header>
        <Form size="large" error={error}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Ingresa una dirección de correo"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Ingresa una contraseña"
              type="password"
              error={error}
              onChange={(ev) => setPassword1(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              error={invalid}
              iconPosition="left"
              placeholder="Vuelve a escribir la contraseña"
              type="password"
              onChange={(ev) => {
                setPassword2(ev.target.value);
                ValidatePass(ev.target.value);
              }}
            />
            <Message
              error
              header="No pudimos crear la cuenta"
              content="Las contraseñas deben coincidir"
            />
            <Button color="teal" fluid size="large" onClick={createUser}>
              Crear cuenta
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
