import { Col, Modal, ModalBody, Row } from "reactstrap"

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
    return (
      <Modal isOpen={show} toggle={onCloseClick} centered={true}>
        <ModalBody className="py-3 px-5">
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <i
                  className="mdi mdi-alert-circle-outline"
                  style={{ fontSize: "9em", color: "orange" }}
                />
                <h2>¿Seguro que deseas eliminar?</h2>
                <h4>No podrás revertir esta acción</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-lg ms-2"
                  onClick={onDeleteClick}
                >
                  Sí, deseo elimarlo!
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={onCloseClick}
                >
                  Cancelar
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
}

export default DeleteModal