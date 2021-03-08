import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import 'firebase/auth'
import { useAuth } from "reactfire";

function LoginForm() {
    const auth = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async () => {
        await auth.createUserWithEmailAndPassword(email, password)
    }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Ingresa a tu cuenta
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Dirección de correo"
              onChange={ (ev) => setEmail(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Contraseña"
              type="password"
              onChange={ (ev) => setPassword(ev.target.value)}
            />

            <Button color="teal" fluid size="large" onClick={submit}>
              Iniciar sesión
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
