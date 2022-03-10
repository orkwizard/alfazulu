import { Button, Col, Row } from "reactstrap"

function TabOneMembership(){


    return (

        <Row>
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        <span className="fw-bolder text-danger">Renewal date: Dic/20/2022</span>
                    </div>
                    <div>
                    <Button color="primary">
                        Editar
                    </Button>
                    </div>
                </div>
            </Col>
            <Col xs="6" md="6">
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Contract Number:</label>
                    <span>CC-013565</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Login ID:</label>
                    <span>HLG02385</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Company:</label>
                    <span>Explorers Travelers</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Anualidad:</label>
                    <span>$199</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Password:</label>
                    <span>5678</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Activation Date:</label>
                    <span>Ene/20/2021</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Years purchase:</label>
                    <span>99</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Numbers of week per years:</label>
                    <span>10</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Sales person:</label>
                    <span>Monica</span>
                </div>
            </Col>
            <Col xs="6" md="6">
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Holder information:</label>
                    <span>Demo Demo Demo demo</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Address:</label>
                    <span className="d-block">Street: Demo demo</span>
                    <span className="d-block">Country: Demo demo</span>
                    <span className="d-block">State: Demo demo</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Language:</label>
                    <span>Español</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Currency:</label>
                    <span>USD</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Primary Email:</label>
                    <span>demo@demo.com</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Secondary Email:</label>
                    <span>demo@demo.com</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Phone:</label>
                    <span>Home: +52 555 5555</span>
                </div>
            </Col>
        </Row>
    )
}

export default TabOneMembership