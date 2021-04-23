import React, { useContext, useEffect, useState } from "react";
import Time from "../../hooks/DateTimePicker";
import {
  Button,
  Grid,
  Header,
  ButtonContent,
  GridRow,
  Icon,
} from "semantic-ui-react";
import { AnnouncementContext } from "./AnnouncementContext";
import "./CreateOffer.css";

function FormHorario() {
  const { value2, value3, value4, nValue2, nValue3 } = useContext(
    AnnouncementContext
  );
  const [cursos, setCursos] = value2;
  const [grupos, setGrupos] = value3;
  const [horarios, setHorario] = value4;
  const [nCurso, setNCurso] = nValue2;
  const [nGrupo, setNGrupo] = nValue3;
  const [bLunes, setBLunes] = useState(false);
  const [bMartes, setBMartes] = useState(false);
  const [bMiercoles, setBMiercoles] = useState(false);
  const [bJueves, setBJueves] = useState(false);
  const [bViernes, setBViernes] = useState(false);
  const [bSabado, setBSabado] = useState(false);

  function handleChange() {
    // 1. Make a shallow copy of the items
    let gru = [...grupos];
    let cur = [...cursos];

    // 2. Make a shallow copy of the item you want to mutate
    let grupo = {
      ...gru[nGrupo],
      horario: horarios,
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    gru[nGrupo] = grupo;
    // 5. Set the state to our new copy
    setGrupos(gru);
    let curso = {
      ...cur[nCurso],
      grupos: gru,
    };
    cur[nCurso] = curso;
    setCursos(cur);
  }

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horarios]);

  function removeDia(dia, name) {
    var i = dia.indexOf(name);
    dia.splice(i, 1);
  }

  function addDia(name, ref) {
    let dia = [...horarios.dias];

    if (ref === true) {
      removeDia(dia, name);
      setHorario({
        ...horarios,
        dias: dia,
      });
    } else {
      dia.push(name);
      setHorario({
        ...horarios,
        dias: dia,
      });
    }
  }

  function validarGrupo() {
    var complete = false;
    grupos.forEach((grupo) => {
      if (grupo.cupos !== "" && grupo.grupo !== "") {
        if (validarHorario()) {
          complete = true;
        } else {
          complete = false;
        }
      } else {
        complete = false;
      }
    });
    //console.log(complete)
    return complete;
  }

  function validarHorario() {
    var complete = false;
    if (
      horarios.h_inicio !== "" &&
      horarios.h_inicio !== null &&
      horarios.h_fin !== "" &&
      horarios.h_fin !== null &&
      horarios.dias !== undefined
    ) {
      complete = true;
    } else {
      complete = false;
    }
    //console.log(complete)
    return complete;
  }

  function validarCurso() {
    var complete = false;
    cursos.forEach((curso) => {
      if (curso.curso !== "" && validarGrupo()) {
        complete = true;
      } else {
        complete = false;
      }
    });
    //console.log(complete)
    return complete;
  }

  function clear() {
    setHorario({ dias: [], h_inicio: "", h_fin: "" })
    setGrupos([{
      cupos: "",
      grupo: "",
      horario: horarios,
    }])    
  }

  function addCurso(callback) {
    if (validarCurso()) {
      setNCurso(nCurso + 1);
      setNGrupo(0);
      clear()
    } else {
      console.log(
        "Debes ingresar toda la información requerida antes de crear otro curso"
      );
    }
  }

  function addGrupo() {
    if (validarGrupo()) {
      setNGrupo(nGrupo + 1);
    } else {
      console.log(
        "Debes ingresar toda la información requerida antes de crear otro grupo"
      );
    }
  }

  function clearButtons() {
    setBLunes(false);
    setBMartes(false);
    setBMiercoles(false);
    setBJueves(false);
    setBViernes(false);
    setBSabado(false);
  }

  return (
    <>
      <Grid.Row centered>
        <Grid.Column className="col-button">
          <Header as="h5" color="teal" textAlign="center">
            Selecciona el horario del curso/materia
          </Header>
          <Button.Group size="mini" className="button-group" fluid>
            <Button
              positive={bLunes}
              onClick={() => {
                addDia("Lunes", bLunes);
                setBLunes(bLunes === true ? false : true);
              }}
            >
              L
            </Button>
            <Button
              positive={bMartes}
              onClick={() => {
                addDia("Martes", bMartes);
                setBMartes(bMartes === true ? false : true);
              }}
            >
              M
            </Button>
            <Button
              positive={bMiercoles}
              onClick={() => {
                addDia("Miercoles", bMiercoles);
                setBMiercoles(bMiercoles === true ? false : true);
              }}
            >
              Mi
            </Button>
            <Button
              positive={bJueves}
              onClick={() => {
                addDia("Jueves", bJueves);
                setBJueves(bJueves === true ? false : true);
              }}
            >
              J
            </Button>
            <Button
              positive={bViernes}
              onClick={() => {
                addDia("Viernes", bViernes);
                setBViernes(bViernes === true ? false : true);
              }}
            >
              V
            </Button>
            <Button
              positive={bSabado}
              onClick={() => {
                addDia("Sabado", bSabado);
                setBSabado(bSabado === true ? false : true);
              }}
            >
              S
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <br />
      <Grid.Row centered className="row-datepickers">
        <Grid.Column>
          <Header size="small" color="teal" textAlign="center">
            Hora inicio
          </Header>
          <Time
            setStatement={setHorario}
            name="h_inicio"
            hora={horarios !== undefined ? horarios.h_inicio : ""}
            placeHolder="Hora de inicio"
          />
        </Grid.Column>
        <Grid.Column>
          <Header size="small" color="teal" textAlign="center">
            Hora fin
          </Header>
          <Time
            setStatement={setHorario}
            name="h_fin"
            hora={horarios !== undefined ? horarios.h_fin : ""}
            placeHolder="Hora de fin"
          />
        </Grid.Column>
      </Grid.Row>
      <br />
      <GridRow className="row-buttons">
        <Button
          style={{backgroundColor:'#3a3768', color: 'white'}}
          animated
          onClick={() => {
            addGrupo();
            setHorario({ dias: [], h_inicio: "", h_fin: "" });
            clearButtons();
          }}
          disabled={!validarGrupo()}
        >
          <ButtonContent visible>Añadir grupo</ButtonContent>
          <Button.Content hidden>
            <Icon name="add" />
          </Button.Content>
        </Button>
        <Button
          style={{backgroundColor:'#3a3768', color: 'white'}}
          animated
          onClick={() => {
            addCurso(
              clearButtons(),
            );
          }}
          disabled={!validarCurso()}
        >
          <ButtonContent visible>Añadir curso</ButtonContent>
          <Button.Content hidden>
            <Icon name="add" />
          </Button.Content>
        </Button>
      </GridRow>
    </>
  );
}

export default FormHorario;
