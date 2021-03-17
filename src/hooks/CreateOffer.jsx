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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const pregrados = [
  { key: "m", text: "Ingenieria de sistemas", value: "Ingenieria de sistemas" },
  { key: "f", text: "Ingenieria Financiera", value: "Ingenieria Financiera" },
  {
    key: "o",
    text: "Ingenieria de telecomunicaciones",
    value: "Ingenieria de telecomunicaciones",
  },
];

function FormCreateOffer() {
  const [dias, setDias] = useState({
    dia: "",
    h_inicio: "",
    h_fin: "",
  });
  const [horario, setHorario] = useState({
    dias: dias,
  });
  const [grupos, setGrupos] = useState({
    cupos: "",
    grupo: "",
    horario: horario,
  });
  const [cursos, setCursos] = useState({
    curso: "",
    grupos: grupos,
  });
  const [announcement, setAnnouncement] = useState({
    pregrado: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    cursos: cursos,
  });

  const [arrayCursos, setArrayCursos] = useState([]);
  const [countCursos, setCountCursos] = useState(1);


  useEffect(() => {
    setAnnouncement({ ...announcement, cursos: cursos });
  }, [cursos]);

  useEffect(() => {
    setCursos({ ...cursos, grupos: grupos });
  }, [grupos]);

  useEffect(() => {
    setGrupos({ ...grupos, horario: horario });
  }, [horario]);

  useEffect(() => {
    setHorario({ ...horario, dias: dias });
  }, [dias]);

  useEffect(() => {
    setArrayCursos([...arrayCursos, countCursos]);
  }, [countCursos]);

  const StartDate = () => {
    return (
      <DatePicker
        selected={announcement.fecha_inicio}
        isClearable
        onChange={(date) =>
          setAnnouncement({ ...announcement, fecha_inicio: date })
        }
        showMonthDropdown
        showYearDropdown
        placeholderText="Fecha de inicio"
      />
    );
  };

  const FinishDate = () => {
    return (
      <DatePicker
        selected={announcement.fecha_fin}
        isClearable
        onChange={(date) =>
          setAnnouncement({ ...announcement, fecha_fin: date })
        }
        showMonthDropdown
        showYearDropdown
        placeholderText="Fecha de fin"
      />
    );
  };

  const StartTime = () => {
    return (
      <DatePicker
        selected={dias.h_inicio}
        onChange={(date) => setDias({ ...dias, h_inicio: date })}
        placeholderText="Hora de inicio"
        showTimeSelect
        isClearable
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="h:mm aa"
      />
    );
  };

  const FinishTime = () => {
    return (
      <DatePicker
        selected={dias.h_fin}
        onChange={(date) => setDias({ ...dias, h_fin: date })}
        showTimeSelect
        isClearable
        showTimeSelectOnly
        placeholderText="Hora de fin"
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="h:mm aa"
      />
    );
  };

  const AddCurso = () => {
    return (
      <div>
        {arrayCursos.map((nCurso) => (
          <Container textAlign="justified">
            <Divider />
            <Form.Group widths="16">
              <Form.Input width="10"
                label={
                  <Header as="h5" color="teal" textAlign="center">
                    Nombre de materia/curso {nCurso}
                  </Header>
                }
                placeholder="Ingresa el nombre del curso/materia"
                onChange={(e) => {
                  setCursos({ ...cursos, curso: e.target.value });
                }}
              />
              <Form.Input width='6'
                label={
                  <Header as="h5" color="teal" textAlign="center">
                    Cupos
                  </Header>
                }
                placeholder="Ingresa el numero"
                onChange={(e) => {
                  setGrupos({ ...grupos, cupos: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label={
                  <Header as="h5" color="teal" textAlign="center">
                    Número de grupo
                  </Header>
                }
                placeholder="Ingresa el numero"
                onChange={(e) => {
                  setGrupos({ ...grupos, grupo: e.target.value });
                }}
              />
            </Form.Group>

            <Grid.Row centered>
              <Grid.Column className="col-button">
                <Header as="h5" color="teal" textAlign="center">
                  Selecciona el horario del curso/materia
                </Header>
                <Button.Group size="mini" className="button-group">
                  <Button>L</Button>
                  <Button>M</Button>
                  <Button>M</Button>
                  <Button>J</Button>
                  <Button>V</Button>
                  <Button>S</Button>
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
            <br />
            <Grid.Row centered className="row-datepickers">
              <Grid.Column>
                <Header size="small" color="teal" textAlign="center">
                  Hora inicio
                </Header>
                <StartTime />
              </Grid.Column>
              <Grid.Column>
                <Header size="small" color="teal" textAlign="center">
                  Hora fin
                </Header>
                <FinishTime />
              </Grid.Column>
            </Grid.Row>
          </Container>
        ))}
      </div>
    );
  };


  return (
    <Container className="pp-container" fluid>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className="principal-grid"
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Form size="small">
            <Segment stacked>
              <Header as="h2" color="teal" textAlign="center">
                Crear una convocatoria
              </Header>
              <Divider />
              <Form.Group widths="equal">
                <Form.Select
                  selection
                  options={pregrados}
                  onChange={(e, { value }) =>
                    setAnnouncement({ pregrado: value })
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
                  <StartDate />
                </Grid.Column>
                <Grid.Column className="column-datepickers">
                  <Header size="tiny" color="teal" textAlign="center">
                    Fecha fin
                  </Header>
                  <FinishDate />
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
              <AddCurso />
              <Grid.Row centered>
                <Button
                  animated="vertical"
                  color="blue"
                  onClick={() => setCountCursos(countCursos + 1)}
                >
                  <Button.Content visible>
                    <Icon name="add" />
                  </Button.Content>
                  <Button.Content hidden>Añadir</Button.Content>
                </Button>
              </Grid.Row>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default FormCreateOffer;
