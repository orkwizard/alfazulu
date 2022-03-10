import classnames from "classnames";
import { useState } from "react"
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router"
import Select from "react-select";
import { Card, CardBody, Col, Container, Label, Nav, NavItem, NavLink, Row, Input, Button } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import SimpleDate from "../../components/DatePicker/SimpleDate";
import LLamadasAsignadasCanvas from "../../components/Partner/LLamadasAsignadasCanvas";
import GlobalTable from "../../components/Tables/GlobalTable";
import dataPartnerWCall from '../../data/partnerWC.json'

//test
const optionGroup = [
    {
      label: "Vacancy rewards",
      value: "Vacancy rewards"
    },
    {
        label: "Sunset",
        value: "Sunset"
    }
    
];

function LLamadasAsignadas(){
    const [items, setItems] = useState(dataPartnerWCall)
    const [openCanvas, setOpenCanvas] = useState(false)
    const [customActiveTab, setcustomActiveTab] = useState("1");
    const toggleCustom = tab => {
        if (customActiveTab !== tab) {
          setcustomActiveTab(tab);
        }
    };
    const [selectedGroup, setselectedGroup] = useState(null);

    const agendarTutorialCanvas = (row) =>{
        console.log(row)
        setOpenCanvas(true)
    }

    const actionTable = (cell, row) =>{
        return (
            <div className="d-flex">
                <div className="py-1 flex-fill">
                    <span className="fs-5 text-pink"  onClick={e=>agendarTutorialCanvas(row)}><i className="bx bx-calendar" /></span>
                </div>
                <div className="py-1 flex-fill">
                    <span className="fs-5 text-info"><i className="bx bxs-show" /></span>
                </div>
            </div>
        )
    }

    const columns = [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
        },
        {
          text: "Login ID",
          dataField: "loginID"        
        },
        {
            text: "Pass",
            dataField: "pass"        
          },
        {
            text: "Contract#",
            dataField: "contractNumber",          
        },
        {
            text: "Name",
            dataField: "name",          
        },
        {
            text: "Last Name",
            dataField: "lastName",          
        },
        {
            text: "Fecha compra",
            dataField: "fechaCompra",          
        },
        {
            text: "Fecha de registro",
            dataField: "fechaRegistro",          
        },
        {
            text: "Company",
            dataField: "company",          
        },
        {
            text: "Lenguage",
            dataField: "lenguage",          
        },
        {
            text: "Membresía",
            dataField: "membresia",   
            formatter: (cell) => cell === 'ORO' ?    <span className="fw-bold bg-warning p-1 rounded text-white">{cell}</span> :  
                                 cell === 'PLATINO' ?<span className="fw-bold bg-platino p-1 rounded text-white">{cell}</span>:
                                                     <span className="fw-bold bg-bronce p-1 rounded text-white">{cell}</span>
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Acciones",
            // eslint-disable-next-line react/display-name
            formatter: actionTable,
        },
    ];
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: false
    };

    return (
        <>
            <div className="page-content">
                <MetaTags>
                <title>Partner LLamadas Asignadas | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Partner" breadcrumbItem="Partner LLamadas Asignadas" />
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Nav tabs className="nav-tabs-custom">
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: customActiveTab === "1",
                                                })}
                                                onClick={() => {toggleCustom("1");}}
                                            >
                                                <span className="d-block d-sm-none">
                                                <i className="fas fa-home"></i>
                                                </span>
                                                <span className="d-none d-sm-block">Todo</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: customActiveTab === "2",
                                                })}
                                                onClick={() => {toggleCustom("2");}}
                                            >
                                                En proceso
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: customActiveTab === "3",
                                                })}
                                                onClick={() => {toggleCustom("3");}}
                                            >
                                                Pendientes
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col xs="12" md="8">
                                    <Row className="align-items-end">
                                        <Col xs="12" md="3">
                                            <Label htmlFor="loginID">Fecha de compra:</Label>
                                            <SimpleDate />
                                        </Col>
                                        <Col xs="12" md="3">
                                            <Label htmlFor="loginID">Compañía:</Label>
                                            <Select
                                                value={selectedGroup}
                                                onChange={(selected) => setselectedGroup(selected)}
                                                options={optionGroup}
                                                classNamePrefix="select2-selection"
                                            />
                                        </Col>
                                        <Col xs="12" md="3">
                                            <Label htmlFor="nombre">Nombre:</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                            />
                                        </Col>
                                        <Col xs="12" md="3">
                                            <Button
                                                color="primary"
                                                className="font-16 btn-block btn btn-primary"
                                                onClick={()=>console.log('buscar')}
                                            >
                                                <i className="mdi mdi-magnify me-1" />
                                                Buscar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col>
                                    <GlobalTable
                                        columns={columns}
                                        items={items} 
                                        selectRow={ selectRow }
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>                    
                </Container>
            </div>
            <LLamadasAsignadasCanvas
                open={openCanvas}
                setOpen={setOpenCanvas}
            />
        </>
    )
}

export default withRouter(LLamadasAsignadas)