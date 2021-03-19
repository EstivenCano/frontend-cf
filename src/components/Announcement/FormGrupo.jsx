import React, { useContext, useEffect } from "react";
import { AnnouncementContext } from "./AnnouncementContext";
import { Form, Header } from "semantic-ui-react";

function FormGrupo() {
  const { value, value2, value3 } = useContext(AnnouncementContext);
  const [announcement, setAnnouncement] = value;
  const [cursos, setCursos] = value2;
  const [grupos, setGrupos] = value3;

  function handleChange(event, name) {
    // 1. Make a shallow copy of the items
    let gru = [...grupos];
    let cur = [...cursos];
    // 2. Make a shallow copy of the item you want to mutate
    let grupo = {
      ...gru[0],
      [name] : event.target.value,
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    gru[0] = grupo;
    // 5. Set the state to our new copy
    setGrupos(gru);
    let curso = {
      ...cur[0],
      grupos: gru,
    };
    cur[0] = curso;
    setCursos(cur);
  }

  useEffect(()=>{
    setAnnouncement({
      ...announcement,
      cursos: cursos,
    });
  },[cursos])

  return (
    <>
      <Form.Group widths="16">
        <Form.Input
          width="8"
          label={
            <Header as="h5" color="teal" textAlign="center">
              Cupos
            </Header>
          }
          placeholder="Ingresa el numero"
          onChange={(e) => handleChange(e,'cupos')}
        />
        <Form.Input
          width="8"
          label={
            <Header as="h5" color="teal" textAlign="center">
              Número de grupo
            </Header>
          }
          placeholder="Ingresa el numero"
          onChange={(e) => handleChange(e,'grupo')}
        />
      </Form.Group>
    </>
  );
}

export default FormGrupo;
