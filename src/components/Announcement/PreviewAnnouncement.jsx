import React, { useContext, useState } from "react";
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
  LabelDetail,
} from "semantic-ui-react";
import "./PreviewAnnouncement.css";

const PreviewAnnouncement = () => {
  const { value } = useContext(AnnouncementContext);
  const [announcement] = value;
  const [visible, setVisible] = useState(false);

  return (
    <Segment stacked style={{ minWidth: 600 }}>
      <Grid columns={2}>
        <GridRow stretched>
          <GridColumn width={9} verticalAlign="middle">
            <GridRow>
              <Image
                src="https://udem.edu.co/images/ADMISIONES/Imagenes/flexible.jpg"
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
              <Header
                as="h4"
                color="grey"
                textAlign="justified"
                attached
                style={{ maxHeight: 215 }}
              >
                {announcement.descripcion}
              </Header>
            </GridRow>
          </GridColumn>
          <GridColumn width="16">
            <Divider />
            <Button
              animated="vertical"
              color="blue"
              onClick={() => {
                setVisible(visible === true ? false : true);
              }}
            >
              <ButtonContent hidden>Ver más</ButtonContent>
              <Button.Content visible>
                <Icon name="arrow alternate circle down" />
              </Button.Content>
            </Button>
          </GridColumn>
        </GridRow>
        {visible ? (
          <>
            <GridRow centered>
              <Header as="h5" color="grey" textAlign="center">
                Recuerda revisar los cupos y el horario de las materias antes de
                aplicar.
              </Header>
            </GridRow>
            <Divider />
            <GridRow centered className="row-materias">
              {announcement.cursos.map((curso) => {
                return (
                  <>
                    <GridColumn width={6} verticalAlign="middle">
                      <Header as="h4" color="blue" textAlign="center">
                        <Icon name="book" />
                        {curso.curso}
                      </Header>
                    </GridColumn>
                    <GridColumn width={1}>
                      <Divider vertical>
                        <Icon name="long arrow alternate right" />
                      </Divider>
                    </GridColumn>
                    <GridColumn width={9}>
                      <Header as="h4" color="red" textAlign="center">
                        <Icon name="group" />
                        {"Grupos"}
                      </Header>
                      <GridRow>
                        {curso.grupos !== undefined ? curso.grupos.map((grupo) => {
                          return (
                            <>
                              <GridRow>
                                <Header
                                  textAlign="center"
                                  attached="top"
                                  className="header-grupo"
                                  color="grey"
                                >
                                  <GridColumn>
                                    {"Grupo:" + grupo.grupo}
                                  </GridColumn>
                                  <GridColumn>
                                    {"Cupos:" + grupo.cupos}
                                  </GridColumn>
                                </Header>
                              </GridRow>
                              <GridColumn>
                                <Header
                                  textAlign="center"
                                  attached
                                >
                                  <Label as="a" color="grey" image>
                                    <Icon name="calendar" />
                                    Dias
                                    <LabelDetail>
                                      {grupo.horario !== undefined ? grupo.horario.dias.toString() : ""}
                                    </LabelDetail>
                                  </Label>

                                  <Grid style={{ marginTop: 0 }}>
                                    <GridColumn textAlign="center">
                                      <Label as="a" color="blue" image>
                                        <Icon name="clock" />
                                        Inicio
                                        <Label.Detail>
                                          {grupo.horario !== undefined
                                            ? grupo.horario.h_inicio
                                                .toString()
                                                .slice(15, 25)
                                            : ""}
                                        </Label.Detail>
                                      </Label>
                                      <Label as="a" color="red" image>
                                        <Icon name="clock" /> Fin{" "}
                                        <Label.Detail>
                                          {grupo.horario !== undefined
                                            ? grupo.horario.h_fin
                                                .toString()
                                                .slice(15, 25)
                                            : ""}
                                        </Label.Detail>
                                      </Label>
                                    </GridColumn>
                                  </Grid>
                                </Header>
                              </GridColumn>
                              <Divider/>
                            </>
                          );
                        }) : <></>}
                      </GridRow>
                    </GridColumn>
                  </>
                );
              })}
            </GridRow>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Segment>
  );
};

export default PreviewAnnouncement;