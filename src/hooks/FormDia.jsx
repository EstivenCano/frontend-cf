import React, { useState } from "react";
import Time from "./DateTimePicker";
import { Button, Grid, Header, Container, Segment, Form } from "semantic-ui-react";
import FormHorario from "./FormHorario";
import '../css/CreateOffer.css'

function FormDia() {
  const [dias, setDias] = useState({
    dia: [],
    h_inicio: new Date(),
    h_fin: new Date(),
  });

  return (
      <Container className="pp-container" fluid>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          className="principal-grid"
        >
          <Grid.Column style={{ maxWidth: 650 }}>
            <Form size="small">
              <Segment stacked>
                <FormHorario dias={dias} name="dias" />
                <Grid.Row centered>
                  <Grid.Column className="col-button">
                    <Header as="h5" color="teal" textAlign="center">
                      Selecciona el horario del curso/materia
                    </Header>
                    <Button.Group size="mini" className="button-group">
                      <Button>L</Button>
                      <Button>M</Button>
                      <Button>M</Button>
                      <Button>J</Button>
                      <Button>V</Button>
                      <Button>S</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
                <br />
                <Grid.Row centered className="row-datepickers">
                  <Grid.Column>
                    <Header size="small" color="teal" textAlign="center">
                      Hora inicio
                    </Header>
                    <Time
                      setStatement={setDias}
                      name="h_inicio"
                      hora={dias.h_inicio}
                      placeHolder="Hora de inicio"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Header size="small" color="teal" textAlign="center">
                      Hora fin
                    </Header>
                    <Time
                      setStatement={setDias}
                      name="h_fin"
                      hora={dias.h_fin}
                      placeHolder="Hora de fin"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
  );
}

export default FormDia;
