import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Icon
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
  );
};

const pregrados = [

]

function FormCreateOffer(){
  return(
    <Grid textAlign="center" verticalAlign="center">
      <Form size="large">
      <Segment stacked>
        <Header as="h2" color="teal" textAlign="center" verticalAlign="middle">
        Crear una convocatoria
        </Header>
      <Form.Group widths='equal'>
        <Form.Input
        label='Curso/Materia'
        placeholder='Ingresa el nombre del curso/materia'
        />
        <Form.Select
        pregrados={pregrados}
        label= 'Pregrado'
        placeholder='Selecciona un pregrado'
      />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
        label='Cupos'
        placeholder='Ingresa el numero'
        />
        <Form.Input
        label='Numero de Grupo'
        placeholder='Ingresa el numero'
        />
        <Form.Input
        label='Horario'
        placeholder='X:XX AM/PM - X:XX AM/PM'
        />
      </Form.Group>

        <Header as="h5" color="teal" textAlign="center" verticalAlign="middle">
          Selecciona el horario del curso/materia
        </Header>
      <Grid.Row centered>
        <Button.Group size='mini'>
        <Button disable>L</Button>
        <Button disable>M</Button>
        <Button disable>X</Button>
        <Button disable>J</Button>
        <Button disable>V</Button>
        <Button disable>S</Button>
        </Button.Group>
      </Grid.Row>

      <Header size="10px" color="teal" textAlign="center" verticalAlign="middle">
      </Header>

      <Form.Group widths="equal">
        <Form.Input
        label='Fecha de Inicio'
        placeholder='DD-MM-YYYY'
        />
        <Form.Input
        label='Fecha de Terminacion'
        placeholder='DD-MM-YY'
        />
      </Form.Group>

      <Grid.Row centered>
      <Button animated='vertical' color='blue'>
      <Button.Content visible>
        <Icon name='add' /><
      /Button.Content>
      <Button.Content hidden>
          Añadir
      </Button.Content>
      </Button>
      </Grid.Row>
      </Segment>

      <Grid.Row centered>
      <Button animated color='blue'>
      <Button.Content visible>Crear convocatoria</Button.Content>
      <Button.Content hidden>
        <Icon name='pencil alternate' />
      </Button.Content>
      </Button>
      </Grid.Row>
    </Form>
    </Grid>
  );
}

export default FormCreateOffer;
