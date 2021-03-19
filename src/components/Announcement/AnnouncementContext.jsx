import React, { useEffect, useState } from "react";

export const AnnouncementContext = React.createContext([{}, () => {}]);

// This context provider is passed to any component requiring the context
export const AnnouncementProvider = (props) => {
  const [horarios, setHorario] = useState({
    dias: [],
    h_inicio: "",
    h_fin: "",
  });
  const [grupos, setGrupos] = useState([{
    cupos: "",
    grupo: "",
    horario: horarios,
  }]);

  const [cursos, setCursos] = useState([{
    curso: "",
    grupos: grupos,
  }])

  const [announcement, setAnnouncement] = useState({
    pregrado: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    cursos: cursos,
  });

  return (
    <AnnouncementContext.Provider
      value={{
        value: [announcement, setAnnouncement],
        value2: [cursos, setCursos],
        value3: [grupos, setGrupos],
        value4: [horarios, setHorario],
      }}
    >
      {props.children}
    </AnnouncementContext.Provider>
  );
};
