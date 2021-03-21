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
} from "semantic-ui-react";
import { ReactComponent as Educate } from "../../svg/education.svg";
import PreviewAnnouncement from "../Announcement/PreviewAnnouncement";
import "./Start.css";
import axios from "axios";

const Start = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    getAnnouncements();
  }, []);

  async function getAnnouncements() {
    setBusy(true);
    await axios
      .get(`http://localhost:3001/announcements`)
      .then((respuesta) => {
        respuesta.data.ok.forEach((doc) => {
          setAnnouncements((announcements) => [...announcements, doc.data]);
        });
      })
      .finally(() => {
        setBusy(false);
      });
  }

  return (
    <Container fluid>
      <Grid columns={2} textAlign="center" verticalAlign="middle">
        <GridRow>
          <GridColumn className="column-content">
            <GridRow className="row-content">
              <Header as="h1">
                <Header.Content>¡Bienvenido a Camino Flexible!</Header.Content>
              </Header>
              <br />
              <Image
                width="60%"
                src="https://repository.udem.edu.co/themes/Mirage2/images/logo_udem.png"
              />
            </GridRow>
            <br />
            <GridRow className="row-buttons">
              <Button secondary animated>
                <ButtonContent visible>Ver Convocatorias</ButtonContent>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </GridRow>
          </GridColumn>
          <GridColumn className="column-image">
            <Educate width="100%" height="100%"></Educate>
          </GridColumn>
        </GridRow>
      </Grid>

      {!isBusy ? (
        announcements.map((announcement, index) => {
          return (
            <Grid verticalAlign="middle" padded key={index}>
              <GridRow  className="grid-announcement" style={{justifyContent: index % 2 === 0 ? "left" : "right"}}>
                <GridColumn width={8} key={index}>
                  <PreviewAnnouncement announcement={announcement} />
                </GridColumn>
              </GridRow>{" "}
            </Grid>
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Start;
