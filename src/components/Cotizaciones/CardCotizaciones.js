import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import OffCanvasCotizador from "./OffCanvasCotizador";

export default function CardCotizaciones(){
    const [open, setOpen] = useState(false)


    return (
        <>
            <Card className="rounded-0">            
                <CardBody>              
                    <h6>Cotizar</h6>  
                    <Row>
                        <Col xs="12" md="12">
                            <Button
                                color="primary"
                                block
                                onClick={() =>setOpen(true)}
                            >
                            Cotizar
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <OffCanvasCotizador open={open} setOpen={setOpen}/>
        </>
        
    )
}