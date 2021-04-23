import React, { useState, useRef } from "react";
import {
  Grid,
  Segment,
  Header,
  Icon,
  Button,
  Divider,
  HeaderContent,
  HeaderSubheader,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import "firebase/storage";
import firebase from "firebase/app";
import { useAuth } from "reactfire";
import { ReactComponent as Uploading } from "../../svg/uploading.svg";
import UploadDimmer from "./Dimmer";


//TODO Let upload evidence only to approved students
const UploadEvidence = () => {
  const btnRef = useRef();
  const auth = useAuth()
  const [evidence, setEvidence] = useState();
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(true);
  const [disabled, setDisabled] = useState(true);

  function completed() {
    setComplete(true ? false : true);
  }

  function desactivate() {
    setActive(false);
  }

  function handleOnChange(e) {
    setDisabled(false);
    setEvidence(btnRef.current.files[0]);
  }

  async function uploadFile() {
    setActive(true);
    const storageRef = firebase.storage().ref();
    if (evidence !== null) {
      const evidenceRef = storageRef.child("inscriptions/" + auth.currentUser.email);
      evidenceRef.put(evidence).then(function (snapshot) {
        console.log("Archivo subido a la nube!");
        completed();
      });
    } else {
      setActive(false);
    }
  }
  return (
    <Grid container verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ marginTop: "2em" }}>
        <Grid.Row>
          <Segment placeholder>
            <Grid columns="16" verticalAlign="middle">
              <Grid.Column width="8" textAlign="center">
                <Header as="h2" color="teal" textAlign="center">
                  Evidencia de inscripción
                </Header>
                <Divider></Divider>
                <Header as="h4" color="grey" textAlign="center">
                  Adjunta aquí el screenshot una vez hayas finalizado la
                  inscripción en el link que fue proporcionado a tu correo.
                </Header>
                <Button
                  animated="vertical"
                  style={{backgroundColor:'#3a3768', color: 'white'}}
                  onClick={() => btnRef.current.click()}
                >
                  <Button.Content visible>
                    Evidencia inscripción{" "}
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="paperclip" />
                  </Button.Content>
                </Button>
                <input
                  type="file"
                  ref={btnRef}
                  hidden
                  accept=".png, .jpg"
                  onChange={(e) => {
                    handleOnChange();
                  }}
                />
                <HeaderSubHeader>
                  Los formatos permitidos para la imagen son .pgn y .jpg
                </HeaderSubHeader>
                <br />
                <Button
                  animated="vertical"
                  color="teal"
                  disabled={disabled}
                  onClick={uploadFile}
                >
                  <Button.Content visible>Subir </Button.Content>
                  <Button.Content hidden>
                    <Icon name="cloud upload" />
                  </Button.Content>
                </Button>
                <Header as="h5" color="grey" textAlign="center">
                  <HeaderSubheader>
                    ¿Aún no has realizado la inscripción?
                  </HeaderSubheader>
                  <HeaderContent>
                    Ingresa aqui para realizarla:{" "}
                    <a
                      href="https://app.udem.edu.co/OfertaExtracurricular/indexCf.html"
                      target="blank"
                    >
                      Inscribirme
                    </a>
                  </HeaderContent>
                </Header>
              </Grid.Column>
              <Grid.Column width="8">
                <Uploading width="50vw" height="70vh" />
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Row>
      </Grid.Column>
      <UploadDimmer
        active={active}
        desactivate={desactivate}
        complete={complete}
      />
    </Grid>
  );
};

export default UploadEvidence;
