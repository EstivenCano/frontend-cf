/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext} from "react";
import { Form, Grid, Header, Divider, TextArea } from "semantic-ui-react";
import "./CreateOffer.css";
import Date from "../../hooks/DatePicker";
import { AnnouncementContext } from "./AnnouncementContext";

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
  const {value} = useContext(AnnouncementContext)
  const [announcement, setAnnouncement] = value;

  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        Crear convocatoria
      </Header>
      <Divider />
      <Form.Group widths="equal">
        <Form.Input
          label={
            <Header as="h5" color="teal" textAlign="center">
              Nombre de la convocatoria
            </Header>
          }
          onChange={(e) => {
            setAnnouncement({
              ...announcement,
              nombre: e.target.value,
            });
          }}
          placeholder="Nombre para la convocatoria"
        />
        <Form.Select
          selection
          options={pregrados}
          onChange={(e, { value }) =>
            setAnnouncement({ ...announcement, pregrado: value })
          }
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
          maxLength="352"
          placeholder="Añade una descripción de la convocatoria (Max 150 caracteres)"
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
