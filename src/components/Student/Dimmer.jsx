import React from "react";
import { Header, Icon, Dimmer, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const UploadDimmer = (props) => {
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
          La evidencia de inscripción esta siendo guardada
          <Header.Subheader>Esto solo tomará un momento...</Header.Subheader>
        </Header>
      ) : (
        <Header as="h2" icon inverted>
          <Icon color="green" name="check" />
          ¡La evidencia fue guardada exitosamente!
          <Header.Subheader>Ahora solo debes esperar a que esta sea revisada</Header.Subheader>
          <Header.Subheader>y ser oficialmente parte de la Universidad de Medellin!</Header.Subheader>
          <br />
          <Button color="green" onClick={Back}>
            <Button.Content visible>Volver al inicio</Button.Content>
          </Button>
        </Header>
      )}
    </Dimmer>
  );
};

export default UploadDimmer;
