import React, { useState, useEffect } from "react";
import FormGrupo from "./FormGrupo";

function FormHorario(props) {

  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  const [horario, setHorario] = useState({
    dias: state.dias,
  });

  useEffect(
    () => {
      setHorario((horario) => ({
        ...horario,
        dias: state.dias
      }));
      console.log(horario);
    },
    [state]
  );

  return (
    <>
        <FormGrupo horario={horario}/>
    </>
  );
}

export default FormHorario;
