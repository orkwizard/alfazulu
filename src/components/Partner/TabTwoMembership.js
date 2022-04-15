import { Col, Label, Row } from "reactstrap"

function TabTwoMembership(){


    return (

        <Row>
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        <span className="fw-bolder text-primary">Beneficios</span>
                    </div>
                    <div>
                    <button className="btn btn-pink-primary">Editar</button>
                    </div>
                </div>
            </Col>
            <Col xs="12" md="12">
                <Label className="fw-bolder">My weeks</Label>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        VIP Weeks
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        Hot weeks
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        Vacancy rewards
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        Travel
                    </label>
                </div>
                <Label className="fw-bolder">Additional Beneffits</Label>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        In & Out Mexico
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                    >
                        Tours and excursions
                    </label>
                </div>
            </Col>
            
        </Row>
    )
}

export default TabTwoMembership