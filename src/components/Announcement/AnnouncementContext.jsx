import React, { useState } from "react";

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
    nombre: "",
    pregrado: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    cursos: cursos,
  });

  const [applyInfo, setApplyInfo] = useState({
    id_convocatoria:'',
    materia: '',
    id_grupo:'',
  })

  const [nCurso, setNCurso] = useState(0)
  const [nGrupo, setNGrupo] = useState(0)

  return (
    <AnnouncementContext.Provider
      value={{
        value: [announcement, setAnnouncement],
        value2: [cursos, setCursos],
        value3: [grupos, setGrupos],
        value4: [horarios, setHorario],
        value5: [applyInfo, setApplyInfo],
        nValue2: [nCurso, setNCurso],
        nValue3: [nGrupo, setNGrupo]
      }}
    >
      {props.children}
    </AnnouncementContext.Provider>
  );
};
