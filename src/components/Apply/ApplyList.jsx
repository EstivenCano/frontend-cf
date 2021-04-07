import React, { useEffect, useState } from "react";
import axios from "axios";
import "firebase/storage";
import firebase from "firebase/app";
import {
  Container,
  Grid,
  Icon,
  Label,
  Table,
  Dimmer,
  Loader,
  Button,
  Modal,
} from "semantic-ui-react";

const ApplyList = () => {
  // State variables
  const [requests, setRequests] = useState({});
  const [isBusy, setIsBusy] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [student, setStudent] = useState({});

  // Get all the requests when component did mount
  useEffect(() => {
    getRequests();
  }, []);

  // Call approveStudent function when student changes.
  useEffect(() => {
    if (Object.keys(student).length !== 0) {
      ApproveStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  /**
   * getRequest function
   * isBusy = false when promise finish
   */
  function getRequests() {
    setIsBusy(true);
    axios
      .get(`http://localhost:3001/getRequests`)
      .then((respuesta) => {
        setRequests(respuesta.data.requests);
      })
      .then(() => {
        setIsBusy(false);
      });
  }

  /**
   * Store the student on the specific Firestore collection
   */
  async function ApproveStudent() {
    setIsBusy(true);
    await axios
      .post(`http://localhost:3001/addApprovedStudent/${requests[index].id}`, student)
      .then((respuesta) => {
        setOpen(false);
        getRequests();
      })
      .then(() => {
        setIsBusy(false);
      });
  }

  /**
   * getDocumentUrl takes two params and returns the document's url.
   * @param {*} folder folder where is the document
   * @param {*} file name of the file
   */
  async function getDocumentUrl(folder, file) {
    const storageRef = firebase.storage().ref();

    await storageRef
      .child(`${folder}/${file}`)
      .getDownloadURL()
      .then(function (url) {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          link.setAttribute("href", url);
          link.setAttribute("target", "_blank");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch(function (error) {
        // Handle any errors
        console.log(error);
      });
  }

  return (
    <Container>
      {isBusy ? (
        <Dimmer active inverted>
          <Loader size="massive">Cargando...</Loader>
        </Dimmer>
      ) : (
        <Grid style={{ marginTop: "100px" }} verticalAlign="middle">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Convocatoria</Table.HeaderCell>
                <Table.HeaderCell>Pregrado</Table.HeaderCell>
                <Table.HeaderCell>Materia</Table.HeaderCell>
                <Table.HeaderCell>Grupo</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {requests.map((request, index) => {
                return (
                  <Table.Row key={request.id}>
                    <Table.Cell>
                      <Label ribbon color="blue"></Label>
                      {request.data.convocatoria}
                    </Table.Cell>
                    <Table.Cell>{request.data.pregrado}</Table.Cell>
                    <Table.Cell>{request.data.materia}</Table.Cell>
                    <Table.Cell>{request.data.id_grupo}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="small"
                        color="blue"
                        fluid
                        onClick={() => {
                          setIndex(index);
                          setOpen(true);
                        }}
                      >
                        Ver solicitud
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5"></Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Modal.Header style={{ backgroundColor: "teal", color: "white" }}>
              Información de la solicitud
            </Modal.Header>
            <Modal.Content>
              <Grid>
                <Table celled structured>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell rowSpan="2" textAlign="center">
                        Documento
                      </Table.HeaderCell>
                      <Table.HeaderCell rowSpan="2" textAlign="center">
                        Nombres
                      </Table.HeaderCell>
                      <Table.HeaderCell rowSpan="2" textAlign="center">
                        Apellidos
                      </Table.HeaderCell>
                      <Table.HeaderCell rowSpan="2" textAlign="center">
                        Correo
                      </Table.HeaderCell>
                      <Table.HeaderCell colSpan="2" textAlign="center">
                        Autorizaciones
                      </Table.HeaderCell>
                      <Table.HeaderCell rowSpan="2" textAlign="center">
                        Acciones
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center">
                        Acudiente
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Rector
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell textAlign="center">
                        {requests[index].data.documento}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {requests[index].data.nombres}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {requests[index].data.apellidos}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {requests[index].data.correo}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Icon
                          color="teal"
                          size="big"
                          link
                          name="file archive"
                          onClick={() => {
                            getDocumentUrl(
                              "letters",
                              requests[index].data.documento
                            );
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Icon
                          color="blue"
                          size="big"
                          link
                          name="file archive"
                          onClick={() => {
                            getDocumentUrl(
                              "authorizations",
                              requests[index].data.documento
                            );
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button.Group>
                          <Button>Rechazar</Button>
                          <Button.Or />
                          <Button
                            positive
                            onClick={() => {
                              setStudent(requests[index].data);
                            }}
                          >
                            Seleccionar
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content="Salir"
                labelPosition="right"
                icon="x"
                onClick={() => setOpen(false)}
                negative
              />
            </Modal.Actions>
          </Modal>
          <Dimmer active={open}>
            <Loader size="massive">Cargando...</Loader>
          </Dimmer>
        </Grid>
      )}
    </Container>
  );
};

export default ApplyList;
