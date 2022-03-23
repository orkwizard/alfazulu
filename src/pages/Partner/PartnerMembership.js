import { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalHeader, Row } from "reactstrap";
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
    const [isActive, setIsActive] = useState(false)
    const [activarUsuario, setActivarUsuario] = useState(false);

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
            component: <TabOneMembership partner={partner} isActive={isActive}/>
        },
        {
            id: 2,
            title: 'Beneficios',
            component: <TabTwoMembership />
        },
        {
            id: 3,
            title: 'Comentarios',
            component: <TabTreeMembership contractNumber={params.contractNumber} isActive={isActive}/>
        }
    ]

    useEffect(() => {
        if(!isActive){
            setTimeout(() => {
                setActivarUsuario(true);
            }, 2000);
        }
      }, [isActive]);

      const onHandleActivarUsuario = () =>{
          setActivarUsuario(false)
          setIsActive(true)
      }

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
                            <CardTitular partner={partner} isActive={isActive}/>
                            <CardMembershipRequest />
                        </Col>
                        <Col xs="12" md="8">
                            <Card className="rounded-0">
                                <CardHeader className={`${isActive ? 'bg-primary' : 'bg-secondary'} bg-soft`}>
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
                    {
                        !isActive && 
                        <span className="btn-active-usuario cursor-pointer" onClick={e=>setActivarUsuario(true)}>
                            <i className="bx bx-power-off" />
                            Activar usuario
                        </span>
                    }
                    <Modal
                        isOpen={activarUsuario}
                        role="dialog"
                        autoFocus={true}
                        centered
                        data-toggle="modal"
                        toggle={() => {
                            setActivarUsuario(!activarUsuario);
                        }}
                        >
                        <div>
                            <ModalHeader
                            className="border-bottom-0"
                            toggle={() => {
                                setActivarUsuario(!activarUsuario);
                            }}
                            ></ModalHeader>
                        </div>
                        <div className="modal-body">
                            <div className="text-center mb-4">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10">
                                        <h4 className="text-dark">Usuario inactivo</h4>
                                        <p className="text-muted font-size-14 mb-4">
                                            Este usuario se encuentra inactivo para dar acceso al usuario,
                                        </p>
                    
                                        <div>                                        
                                            <Button color="success" type="button" onClick={onHandleActivarUsuario}>
                                                Click aquí para activar usuario
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Container>
            </div>
        </>
    )
}

export default withRouter(PartnerMembership);