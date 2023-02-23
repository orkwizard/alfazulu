import { useEffect, useState } from "react"
import { MetaTags } from "react-meta-tags";
import { toast } from "react-toastify";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SimpleLoad from "../../../components/Loader/SimpleLoad";
import Datatable from "../../../components/Tables/DataTable";
import { ERROR_SERVER } from "../../../constant/messages";
import { getClub } from "../../../helpers/backend_helper";
import Breadcrumbs from '../../../components/common/Breadcrumb';
import CreateEntity from "../../../components/common/CreateEntity";
import { Link } from "react-router-dom";

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
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Accines",
            // eslint-disable-next-line react/display-name
            formatter: (cellContent, row) => (
                <Link className="text-info" to={`/catalogue/club/edit/${row.id}`}>
                    <i className="mdi mdi-square-edit-outline font-size-18"></i>
                </Link>
            ),
            style: {
                width: "15%"
            }
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
                    <CreateEntity
                        text="Crear Nuevo"
                        link="/catalogue/club/create" 
                    />
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