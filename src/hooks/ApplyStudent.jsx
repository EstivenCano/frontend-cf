import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  GridRow,
  Container,
  Divider,
} from "semantic-ui-react";
import { AnnouncementContext } from "../components/Announcement/AnnouncementContext";
import ApplyDimmer from "../components/Apply/Dimmer";
import "../css/ApplyStudent.css";
import "firebase/storage";
import firebase from "firebase/app";
import axios from "axios";

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

const FormApplyStudent = (props) => {
  const btnRef = useRef();
  const btnRef2 = useRef();
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(true);
  const { value5 } = useContext(AnnouncementContext);
  const [applyInfo] = value5;
  const [authorization, setAuthorization] = useState(null);
  const [letter, setLetter] = useState(null);
  const [applyForm, setapplyForm] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    instituto: "",
    correo: "",
    telefono: "",
    comuna: "",
    docente: "",
    c_docente: "",
  });

  function handleChange(e, name) {
    setapplyForm({
      ...applyForm,
      [name]: e.target.value,
    });
  }

  async function onSubmit() {
    setActive(true);
    const storageRef = firebase.storage().ref();
    await axios
      .post(`http://localhost:3001/createRequest`, { applyForm, applyInfo })
      .then((res) => {
        if (letter !== null) {
          const letterRef = storageRef.child("letters/" + applyForm.documento);
          letterRef.put(letter).then(function (snapshot) {
            console.log("Archivo subido a la nube!");
          });
        }
        if (authorization !== null) {
          const authoRef = storageRef.child(
            "authorizations/" + applyForm.documento
          );
          authoRef
            .put(letter)
            .then(function (snapshot) {
              console.log("Archivo subido a la nube!");
              completed();
            })
        }
      });
  }

  function validarInfo() {
    let isComplete = true;
    for (const property in applyForm) {
      const value = applyForm[property];
      if (value === "") isComplete = false;
    }
    return isComplete;
  }

  function validarDocs() {
    if (letter !== null && authorization !== null) {
      return true;
    }
    return false;
  }

  function desactivate() {
    setActive(false);
  }

  function completed() {
    setComplete(true ? false : true);
  }

  return (
    <Container>
      <Grid className="principal-grid">
        <GridRow>
          <Grid.Column width={8} className="form-column">
            <Form size="large">
              <Segment stacked>
                <Header as="h2" color="teal" textAlign="center">
                  Aplicar a la Convocatoria
                </Header>
                <Divider />
                <Form.Group widths="equal">
                  <Form.Input
                    label="Documento"
                    placeholder="Ingrese su documento de identidad"
                    onChange={(e) => {
                      handleChange(e, "documento");
                    }}
                  />
                  <Form.Input
                    label="Nombres"
                    placeholder="Ingrese su nombre"
                    onChange={(e) => {
                      handleChange(e, "nombres");
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos"
                    onChange={(e) => {
                      handleChange(e, "apellidos");
                    }}
                  />
                  <Form.Input
                    label="Correo electronico"
                    placeholder="ejemplo@dominio.com"
                    onChange={(e) => {
                      handleChange(e, "correo");
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select
                    options={institutos}
                    label="Instituto"
                    placeholder="Selecciona tu instituto"
                    onChange={(e, { value }) =>
                      setapplyForm({ ...applyForm, instituto: value })
                    }
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Telefono de contacto"
                    placeholder="xxx-xxxx-xxxx"
                    onChange={(e) => {
                      handleChange(e, "telefono");
                    }}
                  />
                  <Form.Input
                    label="Comuna de residencia"
                    placeholder="Ingresa el numero"
                    onChange={(e) => {
                      handleChange(e, "comuna");
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Nombre de docente acompañante"
                    placeholder="Ingresa el nombre del docente"
                    onChange={(e) => {
                      handleChange(e, "docente");
                    }}
                  />
                  <Form.Input
                    label="Correo electronico del docente"
                    placeholder="Ingresa el correo del docente"
                    onChange={(e) => {
                      handleChange(e, "c_docente");
                    }}
                  />
                </Form.Group>
                <GridRow>
                  <Divider />
                  <Header as="h5" color="grey">
                    Recuerda que debes adjuntar la autorización de tu acudiente
                    y la carta del rector de la institución educativa, en los
                    botones ubicados en la parte inferior
                  </Header>
                  <br />
                </GridRow>
                <Grid.Row centered>
                  <Button
                    animated="vertical"
                    type="file"
                    color="black"
                    onClick={() => btnRef.current.click()}
                  >
                    <Button.Content visible>
                      Autorizacion de acudiente
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="paperclip" />
                    </Button.Content>
                  </Button>
                  <input
                    type="file"
                    ref={btnRef}
                    hidden
                    accept=".doc, .pdf"
                    onChange={(e) => {
                      setAuthorization(btnRef.current.files[0]);
                    }}
                  />
                  <Button
                    animated="vertical"
                    color="blue"
                    onClick={() => btnRef2.current.click()}
                  >
                    <Button.Content visible>Carta del rector </Button.Content>
                    <Button.Content hidden>
                      <Icon name="paperclip" />
                    </Button.Content>
                  </Button>
                  <input
                    type="file"
                    ref={btnRef2}
                    hidden
                    accept=".doc, .pdf"
                    onChange={(e) => {
                      setLetter(btnRef2.current.files[0]);
                    }}
                  />
                </Grid.Row>
                <br />
                <GridRow>
                  <Button
                    animated="vertical"
                    color="green"
                    disabled={!(validarDocs() && validarInfo())}
                    onClick={onSubmit}
                  >
                    <Button.Content visible>
                      Aplicar a la convocatoria{" "}
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="check" />
                    </Button.Content>
                  </Button>
                </GridRow>
              </Segment>
            </Form>
          </Grid.Column>
        </GridRow>
      </Grid>
      <ApplyDimmer
        active={active}
        desactivate={desactivate}
        complete={complete}
      />
    </Container>
  );
};

export default FormApplyStudent;
