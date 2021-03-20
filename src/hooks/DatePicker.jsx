import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = (props) => {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  return (
    <DatePicker
      selected={state.date}
      isClearable
      onChange={(date) => {
        state.setStatement(state => ({
            ...state,
            [props.name] : date
        }))
    }}
      showMonthDropdown
      showYearDropdown
      placeholderText={props.placeholder}
    />
  );
};

export default Date;
