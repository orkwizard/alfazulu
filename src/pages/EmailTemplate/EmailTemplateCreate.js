import { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import EmailTemplateForm from "../../components/EmailTemplate/EmailTemplateForm";

function EmailTemplateCreate(){
    const [emailTemplate, setEmailTemplate] = useState()
    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Plantilla de correo | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Plantilla de correo" breadcrumbItem="Crear plantilla de correo" />
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardBody>
                                    <EmailTemplateForm emailTemplate={emailTemplate} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default withRouter(EmailTemplateCreate);