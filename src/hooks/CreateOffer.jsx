import React from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import "../css/CreateOffer.css";

function FormCreateOffer() {
  const pregrados = [
    { key: 'm', text: 'Ingenieria de sistemas', value: 'ings' },
    { key: 'f', text: 'Ingenieria Financiera', value: 'ingf' },
    { key: 'o', text: 'Ingenieria de telecomunicaciones', value: 'inft' },
  ]

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{ height: "100vh" }}
      className="principal-grid"
    >
      <Grid.Column style={{ maxWidth: 650 }}>
        <Form size="small">
          <Segment stacked>
            <Header as="h2" color="teal" textAlign="center">
              Crear una convocatoria
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                label="Curso/Materia"
                placeholder="Ingresa el nombre del curso/materia"
              />
              <Form.Select
                options={pregrados}
                label="Pregrado"
                placeholder="Selecciona un pregrado"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input label="Cupos" placeholder="Ingresa el numero" />
              <Form.Input
                label="Numero de Grupo"
                placeholder="Ingresa el numero"
              />
              <Form.Input
                fluid
                label="Horario"
                placeholder="X:XX AM/PM - X:XX AM/PM"
              />
            </Form.Group>

            <Header as="h5" color="teal" textAlign="center">
              Selecciona el horario del curso/materia
            </Header>
            <Grid.Row centered>
              <Button.Group size="mini">
                <Button>L</Button>
                <Button>M</Button>
                <Button>X</Button>
                <Button>J</Button>
                <Button>V</Button>
                <Button>S</Button>
              </Button.Group>
            </Grid.Row>

            <Header size="small" color="teal" textAlign="center"></Header>

            <Form.Group widths="equal">
              <Form.Input label="Fecha de Inicio" placeholder="DD-MM-YYYY" />
              <Form.Input label="Fecha de Terminacion" placeholder="DD-MM-YY" />
            </Form.Group>

            <Grid.Row centered>
              <Button animated="vertical" color="blue">
                <Button.Content visible>
                  <Icon name="add" />
                </Button.Content>
                <Button.Content hidden>Añadir</Button.Content>
              </Button>
            </Grid.Row>
          </Segment>

          <Grid.Row centered>
            <Button animated color="blue">
              <Button.Content visible>Crear convocatoria</Button.Content>
              <Button.Content hidden>
                <Icon name="pencil alternate" />
              </Button.Content>
            </Button>
          </Grid.Row>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default FormCreateOffer;
