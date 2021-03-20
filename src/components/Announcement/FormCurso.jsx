import React, { useContext } from "react";
import { Form, Header, Divider } from "semantic-ui-react";
import { AnnouncementContext } from "./AnnouncementContext";

function FormCurso() {
  const { value, value2, nValue2 } = useContext(AnnouncementContext);

  const [nCurso] = nValue2
  const [cursos] = value2;
  const [announcement, setAnnouncement] = value;

  function handleChange(e) {
    // 1. Make a shallow copy of the items
    let cur = cursos;
    // 2. Make a shallow copy of the item you want to mutate
    let curso = {
      ...cur[nCurso],
      curso: e.target.value,
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    cur[nCurso] = curso;
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
          value={cursos[nCurso] !== undefined ? cursos[nCurso].curso : ""}
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
