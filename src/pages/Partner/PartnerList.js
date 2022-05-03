import classNames from "classnames";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Card, CardBody, Col, Collapse, Container, Label, Row, Input } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import SimpleDate from "../../components/DatePicker/SimpleDate";
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
import Paginate from "../../components/Tables/Paginate";

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
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState({
        limite: 10,
        pagina: page,
    })

    //filters
    const [creationDate, setCreationdate] = useState()
    const [procesamientoDate, setProcesamientodate] = useState()
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [fechaRenovacion, setFechaRenovacion] = useState()
    const [loginId, setLoginId] = useState('')
    const [nombre, setNombre] = useState("")
    const [numeroContrato, setNumeroContrato] = useState("")
    const [club, setClub] = useState(null)
    const [membresiaEstado, setMembresiaEstado] = useState("")

    useEffect(() => {   
        let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
        dispatch(onGetPartners(`?${q}`));
    }, [query]);

    //complementos
    useEffect( () => {
        async function fetchMyAPI() {
            let response = await getClub()
            setClubOpt(response.data.response.map(e=>({label: e.nombre, value: e.id})))
        }
        fetchMyAPI()
    }, [])
    const search = () =>{
        setPage(0)
        setQuery(prev=>({
            ...prev,
            pagina: 0
        }))
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
        {
          text: "Login ID",
          dataField: "loginId",
          formatter: (cell, row) => <Link to={`partner-membership/${row.numeroContrato}/${row.id}`} className="text-dark"><u><strong>{cell}</strong></u></Link>          
        },
        {
            text: "Número contrato",
            dataField: "numeroContrato",          
        },
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
        {
            text: "Club",
            dataField: "club",          
        },
        {
            text: "Fecha registro",
            dataField: "fechaCreacion",
            formatter: (cell) => moment(cell, "YYYY-MM-DD").format("DD-MM-YYYY")          
        },
        {
            text: "Fecha renovación",
            dataField: "fechaRenovacion",
            formatter: (cell, row) => 
                row.vencimientoSemaforo === 'ROJO' ?
                <span className="fw-bold text-danger">{moment(cell, "YYYY-MM-DD").format("DD-MM-YYYY")}</span> :
                row.vencimientoSemaforo === 'VERDE' ?
                <span className="fw-bold text-success">{moment(cell, "YYYY-MM-DD").format("DD-MM-YYYY")}</span> :
                row.vencimientoSemaforo === 'AMARILLO' ?
                <span className="fw-bold text-warning">{moment(cell, "YYYY-MM-DD").format("DD-MM-YYYY")}</span> :
                <span className="fw-bold">{moment(cell, "YYYY-MM-DD").format("DD-MM-YYYY")}</span>
        }
    ];

    const completeFilter = (value, type) =>{
        switch(type){
            case "fechaCreacion":
                setCreationdate(value)
                if(value.length){
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                }else{
                    delete query[type]
                }                
                break;
            case "apellido":
                setApellido(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }                
                break;
            case "correo":
                setCorreo(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "fechaRenovacion":
                setFechaRenovacion(value)
                if(value.length){
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                }else{
                    delete query[type]
                }
                break;
            case "loginId":
                setLoginId(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "nombre":
                setNombre(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "numeroContrato":
                setNumeroContrato(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "idClub":
                setClub(value)
                if(value!==null){
                    query[type] = value.value
                }else{
                    delete query[type]
                }
                break;
            case "estaVigente":
                setMembresiaEstado(value)
                if(value!==null){
                    query[type] = value.value
                }else{
                    delete query[type]
                }
                break;
            case "fechaCompra":
                setProcesamientodate(value)
                if(value.length){
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                }else{
                    delete query[type]
                }
                break;
            default: 
                return;
        }
    }

    const handlePageClick = page => {
        setPage(page)
        setQuery(prev=>({
            ...prev,
            pagina: page
        }))
    }

    const handleChangeLimit = (limit) =>{
        setQuery(prev => ({
            ...prev,
            limite: limit
        }))
    }

    return (
        <>
          <div className="page-content">
            <MetaTags>
              <title>Listado de socios | AlphaZulu CRM</title>
            </MetaTags>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="Socio" breadcrumbItem="Listado de socios" />
              <Row className="mb-2">
                  <Col lg="12">
                      <Card>
                        <CardBody className="p-0">
                            <div className="accordion">
                                <div className="accordion-item">
                                <h2 className="accordion-header">
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
                                                    <Label>No. Contrato:</Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
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
                                                    autoComplete="off"
                                                    value={nombre}
                                                    onChange={e=>completeFilter(e.target.value, "nombre")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label>Apellido:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    value={apellido}
                                                    onChange={e=>completeFilter(e.target.value, "apellido")}
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="email">Correo electrónico:</Label>
                                                <Input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={correo}
                                                    onChange={e=>completeFilter(e.target.value, "correo")}
                                                />
                                                </div>
                                            </Col>                                            
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="creationDate">Fecha de registro:</Label>
                                                    <SimpleDate 
                                                        date={creationDate}
                                                        setDate={completeFilter}
                                                        element="fechaCreacion"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="creationDate">Fecha de procesamiento:</Label>
                                                    <SimpleDate 
                                                        date={procesamientoDate}
                                                        setDate={completeFilter}
                                                        element="fechaCompra"
                                                    />
                                                </div>
                                            </Col>
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
                                                    onChange={(selected) => completeFilter(selected, "idClub")}
                                                    options={clubOpt}
                                                    classNamePrefix="select2-selection"
                                                    isClearable
                                                    placeholder="Seleccionar opción"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="company">Estado de la membresía:</Label>
                                                <Select
                                                    value={membresiaEstado}
                                                    onChange={(selected) => completeFilter(selected, "estaVigente")}
                                                    options={[
                                                        {
                                                            value: 'true',
                                                            label: 'Membresía vigente'
                                                        },
                                                        {
                                                            value: 'false',
                                                            label: 'Membresía expirada'
                                                        }
                                                    ]}
                                                    classNamePrefix="select2-selection"
                                                    isClearable
                                                    placeholder="Seleccionar opción"
                                                />
                                                </div>
                                            </Col>
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
                                            items={partners.data!==undefined ? partners.data.socios : []} 
                                        />
                                    </Col>
                                    {
                                        partners.data !==undefined && partners.data.totalPaginas > 0 && 
                                        <Paginate
                                            page={page}
                                            totalPaginas={partners.data.totalPaginas}
                                            totalRegistros={partners.data.totalRegistros}
                                            handlePageClick={handlePageClick}
                                            limit={query.limite}
                                            handleChangeLimit={handleChangeLimit}
                                        />
                                    }
                                </Row>
                            }                            
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