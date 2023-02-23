import { useEffect } from "react";
import { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ClubForm from "../../../components/Club/ClubForm";
import Breadcrumbs from '../../../components/common/Breadcrumb'
import SimpleLoad from "../../../components/Loader/SimpleLoad";
import { ERROR_SERVER } from "../../../constant/messages";
import { getClubById } from "../../../helpers/backend_helper";

function ClubEdit(){
    const [item, setItem] = useState(null)
    const [loading,setLoading] = useState(true)
    const {id} = useParams();

    useEffect(()=>{
        if(id && id!==undefined){
            async function fetchClubAPI() {
                let response = await getClubById(id)
                if(response.state){
                    setItem(response.data)
                    setLoading(false)
                }else{
                    toast.error(ERROR_SERVER)
                }
            }
            fetchClubAPI()
        }
    },[id])


    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Club | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Club" breadcrumbItem="Editar club" />
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardBody>
                                    {
                                        loading ? <SimpleLoad /> :
                                        <ClubForm item={item}/>
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

export default withRouter(ClubEdit);