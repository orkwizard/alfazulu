import { Card, CardBody, Col, Row } from "reactstrap"
import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"

function CardTitular(){
    

    return (
        <Card className="overflow-hidden rounded-0">
            <div className="bg-primary bg-soft">
                <Row className="mb-4">
                    <Col>
                        <div className="text-primary p-3">
                            <p className="mb-1">Holder information:</p>
                            <h6 className="text-primary">Demo Demo Demo demo</h6>                    
                        </div>
                    </Col>
                </Row>
            </div>
            <CardBody className="pt-0">
            <Row>
                <Col sm="4">
                    <div className="avatar-md profile-user-wid mb-4">
                        <img
                        src={avatar1}
                        alt=""
                        className="img-thumbnail rounded-circle"
                        />
                    </div>                
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Contract Number:</label>
                        <span className="fs-08">CC-013565</span>
                    </div>
                </Col>
                <Col xs="12" md="8">
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Co-titular:</label>
                        <span className="fs-08">Demo Demo Demo demo</span>
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Last visit:</label>
                        <span className="fs-08">Feb/02/2022</span>
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">First Visit to System:</label>
                        <span className="fs-08">Ene/02/2022</span>
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Terms & Conditions:</label>
                        <span className="fs-08 text-success">Yes</span>
                    </div>
                </Col>
            </Row>
            </CardBody>
        </Card>
    )
}

export default CardTitular