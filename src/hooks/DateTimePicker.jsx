import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Time = (props) => {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  return (
    <DatePicker
      selected={state.hora}
      onChange={(date) => {
        state.setStatement((state) => ({
          ...state,
          [props.name]: date
        }));
      }}
      placeholderText={props.placeHolder}
      showTimeSelect
      isClearable
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Hora"
      dateFormat="h:mm aa"
    />
  );
};

export default Time;
