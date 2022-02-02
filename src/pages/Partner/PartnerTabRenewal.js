import { withTranslation } from "react-i18next";
import { Col, Label, Row, Input, Button } from "reactstrap";

function PartnerTabRenewal({t}){

    return (
        <>
            <Row>
                <Col lg="6" xs="12">
                    <Row>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Purchase price</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="10000"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Contact Number:</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="CC-013565"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Registration</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="Dic/08/2019"
                                disabled
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>License Agreement</Label>
                            <div><button className="btn btn-link">View</button></div>
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Date of acceptance of terms and conditions</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="Dic/08/2019"
                                disabled
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Years purchased</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="15"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Login ID</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="HLG02385"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Vacancy rewards DR</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="500.00"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Condo Rewards</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="0.00"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Yates Rewards</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="0.00"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                                <Label>Date of acceptance of terms and conditions</Label>
                                <div>N/A</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg="6" xs="12">
                    <Row>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Sales Person</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="JTORRES"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Date purchase</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="08/12/2019"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>MBS Activation Date:</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="Ene/02/2022"
                                disabled
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                                <Label>Last visit:</Label>
                                <div>Ene/02/2022</div>
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Number of weeks per year</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="1"
                            />                        
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Password</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="5324"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>RSI Code</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="43361"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                            <Label>Tours & Traslados Rewards</Label>
                            <Input
                                type="text"
                                className="form-control"
                                defaultValue="0"
                            />
                            </div>
                        </Col>
                        <Col md="12" xs='12'>
                            <div className="mb-3">
                                <Label>Date of acceptance of terms and conditions</Label>
                                <div>N/A</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>            
        </>
        
    )
}

export default withTranslation()(PartnerTabRenewal)