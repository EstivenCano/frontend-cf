import React, { useState, useEffect } from "react";
import { Form, Header } from "semantic-ui-react";
import FormCurso from "./FormCurso";

function FormGrupo(props) {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  const [grupos, setGrupos] = useState({
    cupos: "",
    grupo: "",
    horario: state.horario,
  });

  useEffect(() => {
    setGrupos((grupos) => ({
      ...grupos,
      horario: state.horario,
    }));
  }, [state]);

  return (
    <>
      <FormCurso grupos={grupos} />
      <Form.Group widths="16">
        <Form.Input
        width="8"
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
        <Form.Input
        width="8"
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
    </>
  );
}

export default FormGrupo;
