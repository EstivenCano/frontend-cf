import React, { useState, useEffect } from "react";
import {
  Container,
  Segment,
  Form,
  Grid,
  Button,
  Header,
  Divider,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import axios from "axios";

const SetTeacher = (props) => {
  const [highSchool, setHighSchool] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [teacher, setTeacher] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    instituto: "",
    correo: "",
    telefono: "",
  });

  //TODO Add all high-schools directly from the server
  const getHighSchools = async () => {
    setIsBusy(true);
    await axios
      .get(
        "https://opendata.arcgis.com/datasets/cadce6e9b76d4177a8fbf0931995e826_0.geojson",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "access-control-allow-origin",
          },
        }
      )
      .then((response) => {
        console.log(response);
        response.data.features.forEach((element, index) => {
          if (element.properties.CLASIFICACION === "Oficial - Sede Principal")
            setHighSchool((highSchool) => [
              ...highSchool,
              {
                key: index,
                text: element.properties.NOMBRE_ESTABLECIMIENTO,
                value: element.properties.NOMBRE_ESTABLECIMIENTO,
              },
            ]);
        });
      })
      .then(() => {
        setIsBusy(false);
      });
  };

  //
  useEffect(() => {
    if (highSchool.length === 0) {
      getHighSchools();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (value === "") isComplete = false;
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
          instituto: "",
          correo: "",
          telefono: "",
        });
      });
  }

  return (
    <>
      {isBusy ? (
        <Dimmer active={isBusy}>
          <Loader size="massive">Cargando...</Loader>
        </Dimmer>
      ) : (
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
                    <Form.Select
                      value={props.moderator ? "Universidad de Medellin" : teacher.instituto}
                      options={highSchool}
                      disabled={props.moderator}
                      label="Instituto"
                      placeholder="Selecciona tu instituto"
                      onChange={(e, { value }) =>
                        setTeacher({ ...teacher, instituto: value })
                      }
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
      )}
    </>
  );
};

export default SetTeacher;
