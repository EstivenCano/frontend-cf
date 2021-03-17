import React, { useState, useEffect } from "react";
import { Form, Header, Divider } from "semantic-ui-react";
import FormCreateOffer from "./CreateOffer";

function FormGrupo(props) {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  const [cursos, setCursos] = useState({
    curso: "",
    grupos: state.grupos,
  });

  useEffect(() => {
    setCursos((cursos) => ({
      ...cursos,
      grupos: state.grupos,
    }));
    console.log(cursos);
  }, [state]);

  return (
    <>
      <FormCreateOffer cursos={cursos} />
      <Divider />
      <Form.Group widths="16">
        <Form.Input
          width="16"
          label={
            <Header as="h5" color="teal" textAlign="center">
              Nombre de materia/curso
            </Header>
          }
          placeholder="Ingresa el nombre del curso/materia"
          onChange={(e) => {
            setCursos({ ...cursos, curso: e.target.value });
          }}
        />
      </Form.Group>
    </>
  );
}

export default FormGrupo;
