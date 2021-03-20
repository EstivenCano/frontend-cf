import React from "react";
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
import { ReactComponent as Educate } from "../../svg/education.svg"
import "./Start.css";

const Start = () => {
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
        <GridRow>
          
        </GridRow>
      </Grid>
    </Container>
  );
};

export default Start;
