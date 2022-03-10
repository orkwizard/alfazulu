import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Col, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Input, Button } from "reactstrap";

function WelcomeCallMailCanvas({open, setOpen}){

    const toggleRightCanvas = () =>{
        setOpen(false)
    }

    const handleEnviarMail = () =>{
        console.log('envio')
        toast.success("Correo electrónico enviado")
        setOpen(false)
    }

    return (
        <Offcanvas
            isOpen={open}
            direction="end"
            toggle={toggleRightCanvas}>
            <OffcanvasHeader toggle={toggleRightCanvas} tag="h5" className="top-canvas">
                Welcome email
            </OffcanvasHeader>
            <OffcanvasBody>
                <Row>
                    <Col xs="12" md="12">
                        <Label htmlFor="email" className="d-block text-center">Correo electrónico:</Label>
                        <Input
                            type="email"
                            className="form-control"
                            id="email"
                        />
                    </Col>
                    <Col xs="12" md="12" className="text-center mt-3">
                        <Button
                            color="primary"
                            className="font-16 btn-block btn btn-primary"
                            onClick={handleEnviarMail}
                        >
                            Enviar
                            <i className="mdi mdi-send ms-1" />
                        </Button>
                    </Col>
                </Row>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default withTranslation()(WelcomeCallMailCanvas)