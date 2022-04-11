import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import SimpleTable from "../../components/Tables/SimpleTable";
import SimpleLoad from "../../components/Loader/SimpleLoad";

const EmailTemplateList = props => {
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    }, [])

    const columns  =[
        {
            text: "id",
            dataField: "id",
            sort: true,
            hidden: true,
        },
        {
            text: "Nombre",
            dataField: "numeroContrato",          
        },
    ]
    return (
        <>
          <div className="page-content">
            <MetaTags>
              <title>Listado de plantillas de correo | AlphaZulu CRM</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title="Plantilla de correo" breadcrumbItem="Listado de plantillas de correo" />
                <Row className="mb-2">
                    <Col lg="12">
                        <Card>
                          <CardBody>
                          {
                                loading ?
                                <Row>
                                    <Col xs="12" xl="12">
                                        <SimpleLoad />
                                    </Col>
                                </Row> :
                                <Row>
                                    <Col xl="12">                                    
                                        <SimpleTable
                                            columns={columns}
                                            items={[]} 
                                        />
                                    </Col>
                                    {/* {
                                        partners.data !==undefined && partners.data.totalPaginas > 0 && 
                                        <Paginate
                                            page={page}
                                            totalPaginas={partners.data.totalPaginas}
                                            totalRegistros={partners.data.totalRegistros}
                                            handlePageClick={handlePageClick}
                                        />
                                    } */}
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

export default withRouter(EmailTemplateList);