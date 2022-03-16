import { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import TabScrollable from "../../components/common/TabScrollable";
import TabScrollableSection from "../../components/common/TabScrollableSection";
import CardMembershipRequest from "../../components/Partner/CardMembershipRequest";
import CardTitular from "../../components/Partner/CardTitular";
import TabOneMembership from "../../components/Partner/TabOneMembership";
import TabTwoMembership from "../../components/Partner/TabTwoMembership";
import TabTreeMembership from "../../components/Partner/TabTreeMembership";
import { useState } from "react";
import { getPartnersById } from "../../helpers/backend_helper";

const PartnerMembership = props =>{
    const {
        match: { params },
    } = props;

    const [partner, setPartner] = useState(null)

    useEffect(() => {
        //console.log(params)
    }, [params]);

    useEffect(()=>{
        async function fetchParnetAPI() {
            let response = await getPartnersById(params.idPartner)
            if(response.state){
                setPartner(response.data)
            }else{

            }
            console.log(response)
        }
        fetchParnetAPI()
    },[params.idPartner])

    const [activeIndex, setActiveIndex] = useState(0)
    const childrenTabs = [
        {
            id: 1,
            title: 'Detalles',
            component: <TabOneMembership partner={partner}/>
        },
        {
            id: 2,
            title: 'Beneficios',
            component: <TabTwoMembership />
        },
        {
            id: 3,
            title: 'Comentarios',
            component: <TabTreeMembership contractNumber={params.contractNumber}/>
        }
    ]

    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Membresía del socio | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Socio" breadcrumbItem="Membresía del socio" />
                    <Row>
                        <Col xs="12" md="4">
                            <CardTitular partner={partner}/>
                            <CardMembershipRequest />
                        </Col>
                        <Col xs="12" md="8">
                            <Card className="rounded-0">
                                <CardHeader className="bg-primary bg-soft">
                                    <TabScrollable 
                                        items={childrenTabs.map(e=>({id: e.id, title: e.title}))}
                                        activeIndex={activeIndex}
                                        setActiveIndex={setActiveIndex}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <TabScrollableSection 
                                        components={childrenTabs.map(e=>({component: e.component}))} 
                                        activeIndex={activeIndex}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default withRouter(PartnerMembership);