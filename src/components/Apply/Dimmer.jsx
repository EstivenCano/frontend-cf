import React from "react";
import { Header, Icon, Dimmer, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const ApplyDimmer = (props) => {
  const backTo = useHistory();

  /**
   *  Go back to the start when the button is pressed
   */
  function Back() {
    props.desactivate();
    backTo.push("/start", { from: "apply" });
  }

  return (
    <Dimmer active={props.active} page>
      {props.complete ? (
        <Header as="h2" icon inverted>
          <Icon loading name="spinner" />
          Tu aplicación está siendo guardada
          <Header.Subheader>Esto solo tomará un momento...</Header.Subheader>
        </Header>
      ) : (
        <Header as="h2" icon inverted>
          <Icon color="green" name="check" />
          ¡Tu aplicación fue guardada exitosamente!
          <Header.Subheader>Recuerda estar atento a tu correo</Header.Subheader>
          <Header.Subheader>para saber si fuiste seleccionado</Header.Subheader>
          <br />
          <Button color="teal" onClick={Back}>
            <Button.Content visible>Volver al inicio</Button.Content>
          </Button>
        </Header>
      )}
    </Dimmer>
  );
};

export default ApplyDimmer;
