import { useEffect, useState } from "react"
import { MetaTags } from "react-meta-tags";
import { toast } from "react-toastify";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SimpleLoad from "../../../components/Loader/SimpleLoad";
import Datatable from "../../../components/Tables/DataTable";
import { ERROR_SERVER } from "../../../constant/messages";
import { getClub } from "../../../helpers/backend_helper";
import Breadcrumbs from '../../../components/common/Breadcrumb';

function ClubList(){
    const [response, setResponse] = useState({
        data: [],
        loading: true
    });

    const columns  =[
        {
            text: "id",
            dataField: "id",
            sort: true,
            hidden: true,
        },
        {
            text: "Nombre",
            dataField: "nombre" 
        },
        {
            text: "Descripción",
            dataField: "descripcion" 
        },
    ]

    useEffect( () => {
        setResponse(prev=>({
            ...prev,
            loading: true
        }))
        //club
        async function fetchGetClubAPI() {
            try{
                let response = await getClub()
                if(response.state){
                    setResponse({
                        loading: false,
                        data:  response.data.response
                    })
                }else{
                    setResponse({
                        loading: false,
                        data:  []
                    })
                    toast.error(ERROR_SERVER)
                }
            }catch(error){
                setResponse({
                    data: [],
                    loading: false
                })
                toast.error(ERROR_SERVER)
            }
        }
        fetchGetClubAPI()
    }, [])

    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Listado de club | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Club" breadcrumbItem="Listado de club" />
                    <Row className="mb-2">
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    {
                                        response.loading ?
                                        <Row>
                                            <Col xs="12" xl="12">
                                                <SimpleLoad />
                                            </Col>
                                        </Row> :
                                        <Row>
                                            <Col>
                                                <Datatable
                                                    columns={columns}
                                                    itemsData={response.data} 
                                                    enableSearch={true}
                                                />
                                            </Col>
                                        </Row>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ClubList