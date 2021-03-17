/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider,
  Container,
  TextArea,
} from "semantic-ui-react";
import "../css/CreateOffer.css";
import Date from "./DatePicker";

const pregrados = [
  { key: "m", text: "Ingenieria de sistemas", value: "Ingenieria de sistemas" },
  { key: "f", text: "Ingenieria Financiera", value: "Ingenieria Financiera" },
  {
    key: "o",
    text: "Ingenieria de telecomunicaciones",
    value: "Ingenieria de telecomunicaciones",
  },
];

function FormCreateOffer(props) {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  const [announcement, setAnnouncement] = useState({
    pregrado: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    cursos: state.cursos,
  });

  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        Crear una convocatoria
      </Header>
      <Divider />
      <Form.Group widths="equal">
        <Form.Select
          selection
          options={pregrados}
          onChange={(e, { value }) => setAnnouncement({ pregrado: value })}
          label={
            <Header as="h5" color="teal" textAlign="center">
              Selecciona el pregrado
            </Header>
          }
          placeholder="Selecciona un pregrado"
        />
      </Form.Group>
      <Grid.Row className="row-datepickers">
        <Grid.Column className="column-datepickers">
          <Header size="tiny" color="teal" textAlign="center">
            Fecha inicio
          </Header>
          <Date
            date={announcement.fecha_inicio}
            name="fecha_inicio"
            placeholder="Fecha de Inicio"
            setStatement={setAnnouncement}
          />
        </Grid.Column>
        <Grid.Column className="column-datepickers">
          <Header size="tiny" color="teal" textAlign="center">
            Fecha fin
          </Header>
          <Date
            date={announcement.fecha_fin}
            name="fecha_fin"
            placeholder="Fecha de fin"
            setStatement={setAnnouncement}
          />
        </Grid.Column>
      </Grid.Row>
      <br />
      <Form.Group>
        <TextArea
          placeholder="Añade una descripción de la convocatoria"
          label={
            <Header as="h5" color="teal" textAlign="center">
              Añade una descripción para la convocatoria
            </Header>
          }
          onChange={(e) => {
            setAnnouncement({
              ...announcement,
              descripcion: e.target.value,
            });
          }}
        />
      </Form.Group>
    </>
  );
}

export default FormCreateOffer;
