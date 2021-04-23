import React, { useState, useEffect } from "react";
import {
  Container,
  Segment,
  Form,
  Grid,
  Button,
  Header,
  Divider
} from "semantic-ui-react";
import axios from "axios";

const SetUTeacher = (props) => {
  const [teacher, setTeacher] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    instituto: "Universidad de Medellín",
    materia: "",
    grupo: "",
    correo: "",
    telefono: "",
  });

  /**
   * HandleChange function
   * @param {*} e event
   * @param {*} name name of the attribute to update
   */

  function handleChange(e, name) {
    setTeacher({
      ...teacher,
      [name]: e.target.value,
    });
  }

  /**
   * Validate that every attribute is different to ""
   * @returns true if info is complete or false if it isn't
   */

  function validarInfo() {
    let isComplete = true;
    for (const property in teacher) {
      const value = teacher[property];
      if (value === "") return isComplete = false;
    }
    return isComplete;
  }

  async function addTeacher() {
    await axios
      .post(`http://localhost:3001/setTeacher`, teacher)
      .then((res) => {
        setTeacher({
          documento: "",
          nombres: "",
          apellidos: "",
          instituto: "Universidad de Medellín",
          materia: "",
          grupo: "",
          correo: "",
          telefono: "",
        });
      });
  }

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column width={8}>
          <Form size="large">
            <Segment stacked>
              <Header as="h2" color="teal" textAlign="center">
                Asignar profesor
              </Header>
              <Divider />
              <Form.Group widths="equal">
                <Form.Input
                  value={teacher.documento}
                  label="Documento"
                  placeholder="Ingrese su documento de identidad"
                  onChange={(e) => {
                    handleChange(e, "documento");
                  }}
                />
                <Form.Input
                  value={teacher.nombres}
                  label="Nombres"
                  placeholder="Ingrese su nombre"
                  onChange={(e) => {
                    handleChange(e, "nombres");
                  }}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  value={teacher.apellidos}
                  label="Apellidos"
                  placeholder="Ingrese sus apellidos"
                  onChange={(e) => {
                    handleChange(e, "apellidos");
                  }}
                />
                <Form.Input
                  value={teacher.correo}
                  label="Correo electronico"
                  placeholder="ejemplo@dominio.com"
                  onChange={(e) => {
                    handleChange(e, "correo");
                  }}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  value="Universidad de Medellin"
                  disabled
                  label="Instituto"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  value={teacher.materia}
                  label="Materia"
                  placeholder="Ingrese la materia del profesor"
                  onChange={(e) => {
                    handleChange(e, "materia");
                  }}
                />
                <Form.Input
                  value={teacher.grupo}
                  label="Grupo"
                  placeholder="Ingrese el grupo del profesor"
                  onChange={(e) => {
                    handleChange(e, "grupo");
                  }}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  value={teacher.telefono}
                  label="Telefono de contacto"
                  placeholder="xxx-xxxx-xxxx"
                  onChange={(e) => {
                    handleChange(e, "telefono");
                  }}
                />
              </Form.Group>
              <Grid.Row>
                <Button
                  color="teal"
                  disabled={!validarInfo()}
                  onClick={() => {
                    addTeacher();
                  }}
                >
                  Guardar profesor
                </Button>
              </Grid.Row>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SetUTeacher;
