import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  GridRow,
  Container,
} from "semantic-ui-react";
import "../css/ApplyStudent.css";

function FormApplyStudent() {
  const institutos = [
    {
      key: "001",
      text: "CENTRO EDUCACIONAL CONQUISTADORES",
      value: "CENTRO EDUCACIONAL CONQUISTADORES",
    },
    { key: "002", text: "COLEGIO SAN IGNACIO", value: "COLEGIO SAN IGNACIO" },
    {
      key: "003",
      text: "COLEGIO THE COLUMBUS SCHOOL",
      value: "COLEGIO THE COLUMBUS SCHOOL",
    },
  ];

  return (
    <Container>
      <Grid className="principal-grid">
        <GridRow className="row-column">
          <Grid.Column width={8}>
            <Form size="large">
              <Segment stacked>
                <Header as="h2" color="teal" textAlign="center">
                  Aplicar a la Convocatoria
                </Header>
                <Form.Group widths="equal">
                  <Form.Input label="Nombres" placeholder="Ingrese su nombre" />
                  <Form.Input
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Select
                    width="4"
                    options={institutos}
                    label="Instituto"
                    placeholder="Selecciona tu instituto"
                  />
                  <Form.Input
                    width="8"
                    label="Correo electronico"
                    placeholder="ejemplo@dominio.com"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Telefono de contacto"
                    placeholder="xxx-xxxx-xxxx"
                  />
                  <Form.Input
                    label="Comuna de residencia"
                    placeholder="Ingresa el numero"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    label="Nombre de docente acompañante"
                    placeholder="Ingresa el nombre del docente de tu instituto"
                  />
                  <Form.Input
                    label="Correo electronico del docente"
                    placeholder="Ingresa el correo de tu profesor"
                  />
                </Form.Group>
                <Grid.Row centered>
                  <Button animated="vertical" color="black">
                    <Button.Content visible>
                      Autorizacion de acudiente
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="cloud upload" />
                    </Button.Content>
                  </Button>
                  <Button animated="vertical" color="blue">
                    <Button.Content visible>Carta del rector </Button.Content>
                    <Button.Content hidden>
                      <Icon name="cloud upload" />
                    </Button.Content>
                  </Button>
                </Grid.Row>
              </Segment>
            </Form>
          </Grid.Column>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default FormApplyStudent;
