import React, { useState, useEffect } from "react";
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
  Form,
  TextArea
} from "semantic-ui-react";

const ApprovedStudents = () => {
  // State variables
  const [students, setStudents] = useState({});
  const [reason, setReason] = useState("");
  const [openReason, setOpenReason] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getApprovedStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) {
      verifyDocument("inscriptions", students[index].data.correo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /**
   * Get all the approved students from FireStore
   * isBusy = false when promise finish
   */
  function getApprovedStudents() {
    setIsBusy(true);
    axios
      .get(`http://localhost:3001/getApprovedStudents`)
      .then((res) => {
        setStudents(res.data.students);
      })
      .then(() => {
        setIsBusy(false);
      });
  }

  /**
   * Approve student's evidence
   * isBusy = false when promise finish
   */
  async function approveEvidence() {
    setIsBusy(true);
    let params = {
      studentMail: students[index].data.correo,
    };
    await axios
      .post(
        `http://localhost:3001/approveEvidence/${students[index].id}`,
        params
      )
      .then(() => {
        setIsBusy(false);
      });
  }

    /**
   * Reject student's evidence
   * isBusy = false when promise finish
   */
     async function rejectEvidence() {
      setIsBusy(true);
      let params = {
        studentMail: students[index].data.correo,
        reason: reason
      };
      await axios
        .post(
          `http://localhost:3001/rejectEvidence`,
          params
        )
        .then(() => {
          setIsBusy(false);
        });
    }

  /**
   * If the document exist enables file button in the dimmer
   * to get the document url
   * @param {*} folder folder of the file
   * @param {*} file name of the file
   */
  async function verifyDocument(folder, file) {
    const storageRef = firebase.storage().ref().child(`${folder}/${file}`);
    await storageRef.getDownloadURL().then(onResolve, onReject);

    function onResolve(url) {
      setDisabled(false);
    }
    function onReject(error) {
      setDisabled(true);
    }
  }

  /**
   * getDocumentUrl takes two params and returns the document's url.
   * @param {*} folder folder where is the document
   * @param {*} file name of the document
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
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Correo</Table.HeaderCell>
                <Table.HeaderCell>Materia</Table.HeaderCell>
                <Table.HeaderCell>Grupo</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {students === undefined ? (
                <></>
              ) : (
                students.map((student, index) => {
                  return (
                    <Table.Row key={student.data.documento}>
                      <Table.Cell>
                        <Label ribbon style={{backgroundColor:'#3a3768', color: 'white'}}></Label>
                        {student.data.nombres + " " + student.data.apellidos}
                      </Table.Cell>
                      <Table.Cell>{student.data.correo}</Table.Cell>
                      <Table.Cell>{student.data.materia}</Table.Cell>
                      <Table.Cell>{student.data.id_grupo}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="small"
                          style={{backgroundColor:'#3a3768', color: 'white'}}
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
                })
              )}
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
              Información del estudiante
            </Modal.Header>
            <Modal.Content>
              <Grid>
                <Table celled structured>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center">
                        Documento
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Nombres
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Apellidos
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Correo
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Inscripción
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Acciones
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell textAlign="center">
                        {students[index].data.documento}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {students[index].data.nombres}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {students[index].data.apellidos}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {students[index].data.correo}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Icon
                          color={disabled ? "red" : "teal"}
                          size="big"
                          link
                          disabled={disabled}
                          name={disabled ? "x" : "file"}
                          onClick={() => {
                            getDocumentUrl(
                              "inscriptions",
                              students[index].data.correo
                            );
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button.Group>
                          <Button onClick={() => {
                            setOpenReason(true)
                          }}
                          style={{backgroundColor:'#3a3768', color: 'white'}}
                          >Rechazar</Button>
                          <Button.Or />
                          <Button color='teal' onClick={()=>{
                            approveEvidence()
                            getApprovedStudents()
                            setOpen(false)
                          }}>Aceptar</Button>
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
          <Modal
            open={openReason}
            onClose={() => {
              setOpenReason(false);
            }}
          >
            <Modal.Header style={{ backgroundColor: "teal", color: "white" }}>
              Razón de rechazo
            </Modal.Header>
            <Modal.Content>
              <Form>
                <TextArea
                  maxLength="400"
                  placeholder="Añade la justificación del rechazo máximo 400 caracteres"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content="Confirmar rechazo"
                labelPosition="right"
                icon="check"
                onClick={() => {
                  rejectEvidence()
                  setOpenReason(false)
                  setOpen(false)
                }}
                positive
              />
              <Button
                content="Cancelar"
                labelPosition="right"
                icon="x"
                onClick={() => setOpenReason(false)}
                negative
              />
            </Modal.Actions>
          </Modal>
        </Grid>
      )}
    </Container>
  );
};

export default ApprovedStudents;
