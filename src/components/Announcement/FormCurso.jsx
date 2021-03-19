import React, { useContext, useEffect, useState } from "react";
import { Form, Header, Divider } from "semantic-ui-react";
import { AnnouncementContext } from "./AnnouncementContext";

function FormCurso() {
  const { value, value2 } = useContext(AnnouncementContext);

  const [cursos, setCursos] = value2;
  const [announcement, setAnnouncement] = value;

  function handleChange(e) {
    // 1. Make a shallow copy of the items
    let cur = cursos;
    // 2. Make a shallow copy of the item you want to mutate
    let curso = {
      ...cur[0],
      curso: e.target.value,
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    cur[0] = curso;
    // 5. Set the state to our new copy
    setAnnouncement({
      ...announcement,
      cursos: cur,
    });
  }


  return (
    <>
      <Divider />
      <Form.Group widths="16">
        <Form.Input
          width="16"
          label={
            <Header as="h5" color="teal" textAlign="center">
              Nombre del curso
            </Header>
          }
          placeholder="Ingresa el nombre del curso/materia"
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
}

export default FormCurso;
