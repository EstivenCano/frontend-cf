import FormDia from "./FormDia";
import { Container, Grid, GridColumn } from "semantic-ui-react";
import '../css/Announcement.css'

function Announcement() {
  return (
    <Container className="pp-container" fluid>
      <Grid
        className="principal-grid"
        columns={2}
      >
        <GridColumn>
          <FormDia />
        </GridColumn>
        <GridColumn>
          <FormDia />
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default Announcement;
