import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon
} from "semantic-ui-react";

const institutos = [
  { key: '001', text: 'CENTRO EDUCACIONAL CONQUISTADORES', value: 'CENTRO EDUCACIONAL CONQUISTADORES' },
  { key: '002', text: 'COLEGIO SAN IGNACIO', value: 'COLEGIO SAN IGNACIO' },
  { key: '003', text: 'COLEGIO THE COLUMBUS SCHOOL', value: 'COLEGIO THE COLUMBUS SCHOOL' },
]

function FormApplyStudent() {

  return(
    <Grid textAlign="center" verticalAlign="center">
      <Form size="large">
      <Segment stacked>
        <Header as="h2" color="teal" textAlign="center" verticalAlign="middle">
        Aplicar a la Convocatoria
        </Header>
      <Form.Group widths='equal'>
        <Form.Input
        label='Nombres'
        placeholder='Ingrese su nombre'
        />
        <Form.Input
        label='Apellidos'
        placeholder='Ingrese sus apellidos'
        />
        <Form.Select
        institutos={institutos}
        label= 'Instituto'
        placeholder='Selecciona tu instituto'
      />
      </Form.Group>

      <Form.Group>
        <Form.Input style={{width : "60vh"}}
        label='Correo electronico'
        placeholder='ejemplo@dominio.com'
        />
        <Form.Input style={{width : "35vh"}}
        label='Telefono de contacto'
        placeholder='xxx-xxxx-xxxx'
        />
        <Form.Input style={{width : "25vh"}}
        label='Comuna de residencia'
        placeholder='Ingresa el numero'
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
        label='Nombre de docente acompañante'
        placeholder='Ingresa el nombre del docente de tu instituto'
        />
        <Form.Input
        label='Correo electronico del docente'
        placeholder='Ingresa el correo de tu profesor'
        />
      </Form.Group>
      </Segment>

      <Grid.Row centered>
      <Button animated='vertical' color='black'>
      <Button.Content visible>Autorizacion de acudiente</Button.Content>
      <Button.Content hidden>
        <Icon name='cloud upload' />
      </Button.Content>
      </Button>
      <Button animated='vertical' color='blue'>
      <Button.Content visible>Carta del rector </Button.Content>
      <Button.Content hidden>
        <Icon name='cloud upload' />
      </Button.Content>
      </Button>
      </Grid.Row>
    </Form>
    </Grid>
  );
}

export default FormApplyStudent;
