import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, Col, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import SimpleDate from "../DatePicker/SimpleDate";
import SimpleTime from "../DatePicker/SimpleTime";

function LLamadasAsignadasCanvas({open, setOpen}){
    const toggleRightCanvas = () =>{
        setOpen(false)
    }

    const handleEnviarMail = () =>{
        console.log('envio')
        toast.success("Tutorial agendado")
        setOpen(false)
    }

    return (
        <Offcanvas
            isOpen={open}
            direction="end"
            toggle={toggleRightCanvas}>
            <OffcanvasHeader toggle={toggleRightCanvas} tag="h5" className="top-canvas">
                Agendar tutorial
            </OffcanvasHeader>
            <OffcanvasBody>
                <h6>Información cliente</h6>
                <div className="d-flex fs-08 justify-content-between">
                    <div>
                        <label className="d-block fw-bold">Login Id</label>
                        <span>VR00187</span>
                    </div>
                    <div>
                        <label className="d-block fw-bold">Contra#</label>
                        <span>MZT0503204</span>
                    </div>
                    <div>
                        <label className="d-block fw-bold">Nombre completo</label>
                        <span>Maria Isabel Demo Demo</span>
                    </div>
                </div>
                <Row className="mt-3">
                    <Col xs="12" md="6">
                        <Label htmlFor="email" className="d-block text-center">Día</Label>
                        <SimpleDate />
                    </Col>
                    <Col xs="12" md="6">
                        <Label htmlFor="email" className="d-block text-center">Hora</Label>
                        <SimpleTime />
                    </Col>
                    <Col xs="12" md="12" className="text-center mt-3">
                        <Button
                            color="primary"
                            className="font-16 btn-block btn btn-primary"
                            onClick={handleEnviarMail}
                        >
                            Agendar
                            <i className="mdi mdi-calendar-outline ms-1" />
                        </Button>
                    </Col>
                </Row>
            </OffcanvasBody>
        </Offcanvas>
    )

}

export default withTranslation()(LLamadasAsignadasCanvas)