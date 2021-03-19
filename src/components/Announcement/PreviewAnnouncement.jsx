import React, { useContext } from "react";
import { AnnouncementContext } from "./AnnouncementContext";
import {
  Image,
  Grid,
  GridRow,
  Header,
  GridColumn,
  Button,
  Divider,
  ButtonContent,
  Segment,
  Icon,
  Label,
} from "semantic-ui-react";
import "./PreviewAnnouncement.css";

const PreviewAnnouncement = () => {
  const {value} = useContext(AnnouncementContext)
  const [announcement] = value;

  return (
    <Segment stacked style={{ minWidth: 600 }}>
      <Grid columns={2}>
        <GridRow stretched>
          <GridColumn width={9}>
            <GridRow>
              <Image
                src="https://react.semantic-ui.com/images/wireframe/image-text.png"
                as="a"
                size="medium"
                href="/start"
                target="_blank"
              />
              <GridRow>
                <br />
                <Label as="a" color="blue" image>
                  <Icon name="calendar alternate" />
                  Inicio
                  <Label.Detail>
                    {announcement.fecha_inicio != null
                      ? announcement.fecha_inicio.toString().slice(4, 16)
                      : ""}
                  </Label.Detail>
                </Label>
                <Label as="a" color="red" image>
                  <Icon name="calendar alternate" />
                  Fin
                  <Label.Detail>
                    {announcement.fecha_fin != null
                      ? announcement.fecha_fin.toString().slice(4, 16)
                      : ""}
                  </Label.Detail>
                </Label>
              </GridRow>
            </GridRow>
          </GridColumn>
          <GridColumn width={7}>
            <Header as="h3" color="teal" textAlign="center">
              <Icon name="graduation" />
              {announcement.nombre}
            </Header>
            <GridRow>
              <Header as="h4" color="teal" attached="top">
                <strong>Pregrado: </strong> {announcement.pregrado}
              </Header>
              <Header as="h4" color="grey" textAlign="justified" attached style={{ maxHeight: 215 }}>
                {announcement.descripcion}
              </Header>
            </GridRow>
          </GridColumn>
          <GridColumn width="16">
            <Divider />
            <Button animated='vertical'>
              <ButtonContent hidden>Ver más</ButtonContent>
              <Button.Content visible>
                <Icon name="arrow alternate circle down" />
              </Button.Content>
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  );
};

export default PreviewAnnouncement;
