import FormCreateOffer from './CreateOffer'
import FormGrupo from './FormGrupo'
import FormHorario from './FormHorario'
import FormCurso from './FormCurso'
import { Container, Grid, GridColumn, Segment, Form, Button} from "semantic-ui-react";
import PreviewAnnouncement from "./PreviewAnnouncement";
import {AnnouncementContext} from "./AnnouncementContext"
import "./Announcement.css";
import { useContext } from 'react';

function Announcement() {

  const{value} = useContext(AnnouncementContext)

  const[announcement] = value
  return (
    <Container className="pp-container" fluid>
      <Grid className="principal-grid" columns={2}>
        <GridColumn width={7}>
          <Segment>
            <Form>
            <FormCreateOffer/>
            <FormCurso/>
            <FormGrupo/>
            <FormHorario/> 
            </Form> 
            <br/>
            <Button onClick={()=>{
              console.log(announcement)
            }}>
              Guardar Convocatoria
            </Button>
          </Segment>
        </GridColumn>
        <GridColumn width={9}>
          <PreviewAnnouncement />
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default Announcement;
