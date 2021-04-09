import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Image,
  Button,
  Icon,
  ButtonContent,
  Segment,
  Divider,
  Step,
} from "semantic-ui-react";
import { ReactComponent as Educate } from "../../svg/education.svg";
import { ReactComponent as Down } from "../../svg/down.svg";
import PreviewAnnouncement from "../Announcement/PreviewAnnouncement";
import "./Start.css";
import axios from "axios";

const Start = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isBusy, setBusy] = useState(true);

  // Component did mount
  // Alternative solution to useHistory() bug.
  useEffect(() => {
    getAnnouncements();
    window.scrollTo({ top: 0 });
  }, []);

  async function getAnnouncements() {
    setBusy(true);
    await axios
      .get(`http://localhost:3001/announcements`)
      .then((respuesta) => {
        respuesta.data.ok.forEach((doc) => {
          setAnnouncements((announcements) => [
            ...announcements,
            {
              id: doc.id,
              data: doc.data,
            },
          ]);
        });
      })
      .finally(() => {
        setBusy(false);
      });
  }

  return (
    <Container fluid>
      <Grid columns={2}>
        <GridRow>
          <GridColumn className="column-content">
            <GridRow className="row-content">
              <Header as="h1">
                <Header.Content>¡Bienvenido a Camino Flexible!</Header.Content>
              </Header>
              <br />
              <Image
                width="50%"
                src="https://repository.udem.edu.co/themes/Mirage2/images/logo_udem.png"
              />
            </GridRow>
            <br />
            <GridRow className="row-buttons">
              <Button secondary animated href="#grid-divider">
                <ButtonContent visible>Ver Convocatorias</ButtonContent>
                <Button.Content hidden>
                  <Icon name="arrow down" />
                </Button.Content>
              </Button>
            </GridRow>
          </GridColumn>
          <GridColumn className="column-image">
            <Educate width="100%" height="100%"></Educate>
          </GridColumn>
        </GridRow>
      </Grid>
      <div id="grid-divider" />
      <br />
      {/*TODO Stepper for applyment process */}
      <Grid columns={2} id="grid-announcements">
        <GridColumn textAlign="center">
          <Grid className="stick" columns={2}>
            <Down width="50%" height="50%" />
            <GridColumn verticalAlign="middle">
              <Segment>
                <Header as="h4" color="teal">
                  Proceso para aplicar
                </Header>
                <Divider />
                <Step.Group vertical>
                  <Step active>
                    <Icon name="announcement" />
                    <Step.Content>
                      <Step.Title>Convocatoria</Step.Title>
                      <Step.Description>
                        Presiona el botón 'Ver más'
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step>
                    <Icon name="book" />
                    <Step.Content>
                      <Step.Title>Materia</Step.Title>
                      <Step.Description>
                        Ubica la materia deseada
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step>
                    <Icon name="group" />
                    <Step.Content>
                      <Step.Title>Aplicar</Step.Title>
                      <Step.Description>
                        Aplica al grupo deseado
                      </Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
              </Segment>
            </GridColumn>
          </Grid>
        </GridColumn>
        {/*TODO FIX bug when open multiples groups at the same time */}
        <GridColumn id="column-announcement">
          {!isBusy ? (
            announcements.map((announcement) => {
              return (
                <PreviewAnnouncement
                  key={announcement.id}
                  id_ann={announcement.id}
                  announcement={announcement.data}
                />
              );
            })
          ) : (
            <></>
          )}
        </GridColumn>
      </Grid>
    </Container>
  );
};

export default Start;
