import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ClubForm from "../../../components/Club/ClubForm";
import Breadcrumbs from '../../../components/common/Breadcrumb'

function ClubCreate(){
    
    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Club | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Club" breadcrumbItem="Crear club" />
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardBody>
                                    <ClubForm item={null}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default withRouter(ClubCreate);