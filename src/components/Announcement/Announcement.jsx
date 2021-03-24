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
import "./Announcement.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Announcement() {
  const { value } = useContext(AnnouncementContext);
  const [announcement] = value;
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);

  async function addConvocatoria() {
    if (!disable) {
      await axios
        .post(`http://localhost:3001/createAnnouncement`, announcement)
        .then((res) => {
          console.log(res.data);
          setOpen(false);
        });
    } else {
      console.log("No pudo agregarse la convocatoria");
    }
  }

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

  useEffect(() => {
    enableButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement]);

  return (
    <Container className="pp-container" fluid>
      <Grid className="principal-grid" columns={2} verticalAlign="middle">
        <GridRow className='row-content'>
          <GridColumn width={7}>
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
          <GridColumn width={9}>
            <PreviewAnnouncement />
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Announcement;
