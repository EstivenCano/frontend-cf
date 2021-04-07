import FormCreateOffer from "./CreateOffer";
import FormGrupo from "./FormGrupo";
import FormHorario from "./FormHorario";
import FormCurso from "./FormCurso";
import {
  Container,
  Grid,
  GridColumn,
  Segment,
  Form,
  Button,
  Confirm,
  GridRow,
} from "semantic-ui-react";
import PreviewAnnouncement from "./PreviewAnnouncement";
import { AnnouncementContext } from "./AnnouncementContext";
import {useHistory} from 'react-router-dom'
import "./Announcement.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Announcement() {
  // State variables
  const { value } = useContext(AnnouncementContext);
  const [announcement] = value;
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const backTo = useHistory()

  /**
   *  Add the announcement to Firestore
   */

  async function addConvocatoria() {
    if (!disable) {
      await axios
        .post(`http://localhost:3001/createAnnouncement`, announcement)
        .then((res) => {
          console.log(res.data);
          setOpen(false);
          backTo.goBack('start')
        });
    } else {
      console.log("No pudo agregarse la convocatoria");
    }
  }

  /**
   * Check if the announcement has an empty attribute or is null
   * and enable or disable the button to add it
   */
  function enableButton() {
    if (
      announcement !== null &&
      announcement.nombre !== "" &&
      announcement.descripcion !== "" &&
      announcement.cursos.length !== 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  /**
   * Call enableButton function to verify the announcement
   * when announcement changes.
   */

  useEffect(() => {
    enableButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement]);

  return (
    <Container className="pp-container" fluid>
      <Grid className="principal-grid" columns={2} verticalAlign="middle">
        <GridRow className='row-content' stretched>
          <GridColumn width={7} className="stick-column">
            <Segment>
              <Form>
                <FormCreateOffer />
                <FormCurso />
                <FormGrupo />
                <FormHorario />
              </Form>
              <br />
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                color="green"
                disabled={disable}
              >
                Guardar Convocatoria
              </Button>
              <Confirm
                open={open}
                content="¿Quieres publicar la convocatoria?"
                cancelButton="Cancelar"
                confirmButton="Si, Publicar"
                onCancel={() => {
                  setOpen(false);
                }}
                onConfirm={addConvocatoria}
              />
            </Segment>
          </GridColumn>
          <GridColumn width={9} className='preview-column'>
            <PreviewAnnouncement />
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Announcement;
