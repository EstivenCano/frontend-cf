import React, { useEffect, useState } from "react";
import Time from "./DateTimePicker";
import {
  Button,
  Grid,
  Header,
  Container,
  Segment,
  Form,
  ButtonContent,
  GridRow,
  Icon,
  GridColumn,
} from "semantic-ui-react";
import FormHorario from "./FormHorario";
import "../css/CreateOffer.css";

function FormDia() {
  const [dias, setDias] = useState({
    dia: [],
    h_inicio: "",
    h_fin: "",
  });

  return (
    <Grid.Column style={{ maxWidth: 600 }}>
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
          <br />
          <GridRow className="row-buttons">
            <Button primary animated>
              <ButtonContent visible>Añadir materia</ButtonContent>
              <Button.Content hidden>
                <Icon name="add" />
              </Button.Content>
            </Button>
          </GridRow>
        </Segment>
      </Form>
    </Grid.Column>
  );
}

export default FormDia;
