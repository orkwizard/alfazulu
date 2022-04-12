import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import EmailTemplateForm from "../../components/EmailTemplate/EmailTemplateForm";
import { ERROR_SERVER } from "../../constant/messages";
import { getEmailTemplateById } from "../../helpers/backend_helper";

function EmailTemplateCreate(){
    const [emailTemplate, setEmailTemplate] = useState()
    const { id } = useParams();
    const [loading,setLoading] = useState(id ? true : false)

    useEffect(()=>{
        if(id && id!==undefined){
            async function fetchEmailTemplateAPI() {
                let response = await getEmailTemplateById(id)
                if(response.state){
                    setEmailTemplate(response.data)
                    setLoading(false)
                }else{
                    toast.error(ERROR_SERVER)
                }
            }
            fetchEmailTemplateAPI()
        }
    },[id])



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
                                    {
                                        loading ? 'loading' :
                                        <EmailTemplateForm emailTemplate={emailTemplate} />
                                    }
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