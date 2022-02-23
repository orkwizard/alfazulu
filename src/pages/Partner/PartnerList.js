import classNames from "classnames";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Card, CardBody, Col, Collapse, Container, Label, Row, Input } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import SimpleDate from "../../components/DatePicker/SimpleDate";
import dataPartner from '../../data/partner.json'
import PartnerModal from "./PartnerModal";
import Select from 'react-select'

import {
    gePartner as onGetPartners,
  } from "../../store/partner/actions";
import moment from "moment";
import { toast } from "react-toastify";
import SimpleTable from "../../components/Tables/SimpleTable";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import { getClub } from "../../helpers/backend_helper";

const PartnerList = props => {
    const dispatch = useDispatch();
    const { partners, partnersErrors, loading } = useSelector(state => ({
        partners: state.Partner.partners,
        partnersErrors: state.Partner.error,
        loading: state.Partner.loadPartner
      }));
    const [clubOpt, setClubOpt] = useState([])
    const [accordionSearch, setAccordionSearch] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [query, setQuery] = useState({
        limite: 10,
        pagina: 0,
        fechaCreacion: moment(new Date()).format("YYYY-MM-DD")
    })

    //filters
    const [creationDate, setCreationdate] = useState(new Date())
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [fechaRenovacion, setFechaRenovacion] = useState()
    const [loginId, setLoginId] = useState('')
    const [nombre, setNombre] = useState("")
    const [numeroContrato, setNumeroContrato] = useState("")
    const [club, setClub] = useState(null)

    useEffect(() => {
        if (partners && !partners.length) {
            let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
          dispatch(onGetPartners(`?${q}`));
        }
    }, []);

    //complementos
    useEffect( () => {
        async function fetchMyAPI() {
            let response = await getClub()
            console.log(response)
        }
        fetchMyAPI()
    }, [])

    const search = () =>{
        console.log(query)
        let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
        dispatch(onGetPartners(`?${q}`));
    }

    useEffect(()=>{
        if(Object.keys(partnersErrors).length > 0){
            toast.error(partnersErrors.message)
        }
    }, [partnersErrors])

    const columns = [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
        },
        // {
        //   text: "Login ID",
        //   dataField: "loginID",
        //   formatter: (cell, row) => <Link to={`partner-detail/${row.id}`} className="text-dark"><u><strong>{cell}</strong></u></Link>          
        // },
        // {
        //     text: "Contract Number",
        //     dataField: "contractNumber",          
        // },
        {
            text: "Nombre",
            dataField: "nombre",          
        },
        {
            text: "Apellido",
            dataField: "apellido",          
        },
        {
            text: "Correo electrónico",
            dataField: "correo",          
        },
        // {
        //     text: "Calls",
        //     dataField: "calls",
        //     formatter: (cell) => cell === 'Tutorial' ?    <span className="fw-bold bg-warning p-1 rounded text-white">{cell}</span> :  
        //     cell === 'PLATINO' ?<span className="fw-bold bg-platino p-1 rounded text-white">{cell}</span>:
        //                         <span>{cell}</span>          
        // },
        // {
        //     text: "Renewal Date",
        //     dataField: "renewalDate",
        //     formatter: (cell, row) => (
        //         row.id === 2 ? <strong className="text-success">{cell}</strong> :
        //                        <strong className="text-danger">{cell}</strong> 
        //     )          
        // },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Acción",
            // eslint-disable-next-line react/display-name
            formatter: () => <button className="btn-rounded btn btn-primary btn-sm" onClick={e=>setShowModal(true)}>View details</button>,
          },
    ];

    const completeFilter = (value, type) =>{
        console.log(value.length)
        if(value.length){
            switch(type){
                case "fechaCreacion":
                    setCreationdate(value)
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                    break;
                case "apellido":
                    setApellido(value)
                    query[type] = value
                    break;
                case "correo":
                    setCorreo(value)
                    query[type] = value
                    break;
                case "fechaRenovacion":
                    setFechaRenovacion(value)
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                    break;
                case "loginId":
                    setLoginId(value)
                    query[type] = value
                    break;
                case "nombre":
                    setNombre(value)
                    query[type] = value
                    break;
                case "numeroContrato":
                    setNumeroContrato(value)
                    query[type] = value
                    break;
                default: 
                    return;
            }
        }else{
            delete query[type]
        }
    }

    return (
        <>
          
          <div className="page-content">
            <MetaTags>
              <title>Partner List | AlphaZulu CRM</title>
            </MetaTags>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="Partner" breadcrumbItem="Partner List" />
              <Row className="mb-2">
                  <Col lg="12">
                      <Card>
                        <CardBody className="p-0">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFlushOne">
                                    <button
                                    className={classNames(
                                        "accordion-button",
                                        "fw-medium",
                                        { collapsed: !accordionSearch }
                                    )}
                                    type="button"
                                    onClick={()=>setAccordionSearch(!accordionSearch)}
                                    style={{ cursor: "pointer" }}
                                    >
                                    Filtros
                                    </button>
                                </h2>

                                <Collapse isOpen={accordionSearch} className="accordion-collapse">
                                    <div className="accordion-body">
                                        <Row>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="loginID">Login ID:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="loginID"
                                                    value={loginId}
                                                    onChange={e=>completeFilter(e.target.value, "loginId")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="contractNumber">Número Contrato:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="contractNumber"
                                                    value={numeroContrato}
                                                    onChange={e=>completeFilter(e.target.value, "numeroContrato")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="name">Nombre:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    value={nombre}
                                                    onChange={e=>completeFilter(e.target.value, "nombre")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="lastName">Apellido:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    value={apellido}
                                                    onChange={e=>completeFilter(e.target.value, "apellido")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="email">Correo electrónico:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    value={correo}
                                                    onChange={e=>completeFilter(e.target.value, "correo")}
                                                />
                                                </div>
                                            </Col>                                            
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="creationDate">Fecha creación:</Label>
                                                    <SimpleDate 
                                                        date={creationDate}
                                                        setDate={completeFilter}
                                                        element="fechaCreacion"
                                                    />
                                                </div>
                                            </Col>
                                            {/* <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="creationDate">Activation Date:</Label>
                                                    <SimpleDate />
                                                </div>
                                            </Col> */}
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="creationDate">Fecha Renovación:</Label>
                                                    <SimpleDate 
                                                        date={fechaRenovacion}
                                                        setDate={completeFilter}
                                                        element="fechaRenovacion"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="company">Club/Company:</Label>
                                                <Select
                                                    value={club}
                                                    onChange={(selected) => setClub(selected)}
                                                    options={clubOpt}
                                                    classNamePrefix="select2-selection"
                                                />
                                                </div>
                                            </Col>
                                            {/* <Col md={4} xs='6'>
                                                <div className="mb-3">
                                                <Label>Membership Status with Vacancy Rewards:</Label>
                                                    <div className="form-check form-check-inline me-5">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="estatusOption"
                                                            id="activeMembership"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="activeMembership"
                                                        >
                                                        Active
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="estatusOption"
                                                            id="expireMember"
                                                            value="option2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="expireMember"
                                                        >
                                                        Expire
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col> */}
                                            {/* <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label className="d-block">Calls:</Label>
                                                    <div className="form-check form-check-inline me-5">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="etapasOption"
                                                            id="tutorials"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="tutorials"
                                                        >
                                                        Welcome Call
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="etapasOption"
                                                            id="welcomeCall"
                                                            value="option2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="welcomeCall"
                                                        >
                                                        Tutorial
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>
                                        <Row>
                                            <Col sm="12">
                                                <div className="text-sm-end">
                                                    <Button
                                                        color="primary"
                                                        className="font-16 btn-block btn btn-primary"
                                                        onClick={search}
                                                    >
                                                        <i className="mdi mdi-magnify me-1" />
                                                        Buscar
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Collapse>
                                </div>
                            </div>
                        </CardBody>
                      </Card>
                  </Col>
              </Row>
              <Row>
                  <Col lg="12">
                      <Card>
                          <CardBody>
                            {/* <Row className="mb-2">
                                <Col sm="12">
                                    <div className="text-sm-end">
                                        <Button
                                            color="primary"
                                            className="font-16 btn-block btn btn-primary"
                                            onClick={()=>console.log('ok create')}
                                        >
                                            <i className="mdi mdi-plus-circle-outline me-1" />
                                            Create New Partner
                                        </Button>
                                    </div>
                                </Col>
                            </Row> */}
                            <Row>
                                {
                                    loading ? 
                                    <Col xs="12" xl="12">
                                        <SimpleLoad />
                                    </Col>:
                                    <Col xl="12">                                    
                                        <SimpleTable
                                            columns={columns}
                                            items={partners.data.socios} 
                                        />
                                    </Col>
                                }
                                
                            </Row>
                          </CardBody>
                      </Card>
                  </Col>
              </Row>
            </Container>
          </div>
          <PartnerModal 
            showModal={showModal}
            setShowModal={setShowModal}
          />  
        </>
      );
}

export default withRouter(PartnerList);