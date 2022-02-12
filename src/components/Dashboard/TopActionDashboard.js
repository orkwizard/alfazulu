import { withTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Card, CardBody, Col, Row } from "reactstrap";
import CalendarUser from '../../assets/images/calendar_user.svg'
import LLamadasAsignadas from '../../assets/images/llamadas_asignadas.svg'
import WelcomeCall from '../../assets/images/welcome_call.svg'

function TopActionDashboard({t}){
    const navigate = useHistory()


    return (
        <Row>
            <Col xs="4" md="4">
                <Card className="bg-blue-1 card-shadow--animation" onClick={e=>navigate.push("/partner-list")}>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="pe-2">
                                <img src={CalendarUser} alt="Calendar User" className="wh-3rem"/>
                            </div>
                            <div>
                                <span className="text-white fs-5">Búsqueda de clientes</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="4" md="4">
                <Card className="bg-red-1 card-shadow--animation">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="pe-2">
                                <img src={LLamadasAsignadas} alt="LLamadas Asignadas" className="wh-3rem"/>
                            </div>
                            <div>
                                <span className="text-white fs-5">LLamadas asignadas</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="4" md="4">
                <Card className="bg-blue-2 card-shadow--animation" onClick={e=>navigate.push("/partner-welcome-call")}>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="pe-2">
                                <img src={WelcomeCall} alt="LLamadas Asignadas" className="wh-3rem"/>
                            </div>
                            <div>
                                <span className="text-white fs-5">Welcome call</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default withTranslation()(TopActionDashboard)