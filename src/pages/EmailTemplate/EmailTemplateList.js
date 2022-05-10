import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Collapse, Label, Input } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import SimpleTable from "../../components/Tables/SimpleTable";
import SimpleLoad from "../../components/Loader/SimpleLoad";
import { deleteEmailTemplate, getClub, getEmailTemplates, getEmailTemplatesTypes } from "../../helpers/backend_helper";
import Paginate from "../../components/Tables/Paginate";
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../constant/messages";
import classNames from "classnames";
import Select from 'react-select'
import DeleteModal from "../../components/common/DeleteModal";

const EmailTemplateList = props => {
    const [response, setResponse] = useState({
        data: [],
        totalPaginas: 0,
        totalRegistros: 0,
        loading: true
    })
    const [idTemplate, setIdTemplate] = useState()
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [accordionSearch, setAccordionSearch] = useState(true);
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState({
        limite: 10,
        pagina: page,
    })

    //filters
    const [club, setClub] = useState(null)
    const [clubOpt, setClubOpt] = useState([])
    const [nombre, setNombre] = useState("")
    const [asunto, setAsunto] = useState("")
    const [emailTemplateTypesOpt, setEmailTemplateTypesOpt] = useState([])
    const [emailTemplateTypes, setEmailTemplateTypes] = useState(null)

    useEffect(() => {  
        setResponse(prev=>({
            ...prev,
            loading: true
        })) 
        let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
        async function fetchETAPI() {
            try{
                let response = await getEmailTemplates(`?${q}`)
                if(response.state){
                    let data = {
                        data: response.data.plantillas,
                        totalPaginas: response.data.totalPaginas,
                        totalRegistros: response.data.totalRegistros,
                        loading: false
                    }
                    setResponse(data)
                }else{
                    toast.error(response.error.message)
                    setResponse({
                        data: [],
                        totalPaginas: 0,
                        totalRegistros: 0,
                        loading: false
                    })
                }
            }catch(error){
                setResponse({
                    data: [],
                    totalPaginas: 0,
                    totalRegistros: 0,
                    loading: false
                })
                toast.error(ERROR_SERVER)
            }
        }
        fetchETAPI()
    }, [query]);

    useEffect( () => {
        //tipos de emails
        async function fetccEmailTypeAPI() {
            let response = await getEmailTemplatesTypes();
            if(response.state){
                const entries = Object.entries(response.data.response);
                setEmailTemplateTypesOpt(entries.map(e=>({label: e[1], value: e[0]})))
            }
        }
        fetccEmailTypeAPI()

        //club
        async function fetchGetClubAPI() {
            let response = await getClub()
            setClubOpt(response.data.response.map(e=>({label: e.nombre, value: e.id})))
        }
        fetchGetClubAPI()
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
            dataField: "nombre", 
            style: {
                width: "30%"
            },       
            formatter: (cell, row) => <Link to={`/email-templates/edit/${row.id}`} className="text-dark"><u><strong>{cell}</strong></u></Link>            
        },
        {
            text: "Asunto del correo",
            dataField: "asunto", 
            style: {
                width: "30%"
            },         
        },
        {
            text: "Tipo plantilla",
            dataField: "tipoCarta", 
            style: {
                width: "15%"
            }         
        },
        {
            text: "Club",
            dataField: "club", 
            style: {
                width: "15%"
            }         
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Acción",
            // eslint-disable-next-line react/display-name
            formatter: (cellContent, row) => (
                <Link className="text-danger" to="#">
                    <i
                    className="mdi mdi-delete font-size-18"
                    id="deletetooltip"
                    onClick={() => {
                        setIdTemplate(row.id)
                        setShowModalDelete(true)
                    }}
                    ></i>
                </Link>
            ),
            style: {
                width: "15%"
            }
        },
    ]

    const search = () =>{
        setPage(0)
        setQuery(prev=>({
            ...prev,
            pagina: 0
        }))
    }

    const handlePageClick = page => {
        setPage(page)
        setQuery(prev=>({
            ...prev,
            pagina: page
        }))
    }

    const completeFilter = (value, type) =>{
        switch(type){
            case "nombre":
                setNombre(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "asunto":
                setAsunto(value)
                if(value.length){
                    query[type] = value
                }else{
                    delete query[type]
                }
                break;
            case "tipoCarta":
                setEmailTemplateTypes(value)
                if(value!==null){
                    query[type] = value.value
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
            default: 
                return;
        }
    }

    const handleDelete = () => {
        //delete plantilla
        async function deleteTemplateApi() {
            try{
                let response = await deleteEmailTemplate(idTemplate)
                if(response.state){
                    setPage(0)
                    setQuery(prev=>({
                        ...prev,
                        pagina: 0
                    }))
                    setShowModalDelete(false);
                }else{
                    toast.error(ERROR_SERVER)
                }
            }catch(error){
                toast.error(ERROR_SERVER)
            }
        }
        deleteTemplateApi()
    };
    const handleChangeLimit = (limit) =>{
        setQuery(prev => ({
            ...prev,
            limite: limit
        }))
    }

    return (
        <>
          <DeleteModal
            show={showModalDelete}
            onDeleteClick={handleDelete}
            onCloseClick={() => setShowModalDelete(false)}
          />
          <div className="page-content">
            <MetaTags>
              <title>Listado de plantillas de correo | AlphaZulu CRM</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title="Plantilla de correo" breadcrumbItem="Listado de plantillas de correo" />
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
                                                    <Label htmlFor="nombre">Nombre:</Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="nombre"
                                                        value={nombre}
                                                        onChange={e=>completeFilter(e.target.value, "nombre")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                    <Label htmlFor="asunto">Asunto del correo:</Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="asunto"
                                                        value={asunto}
                                                        onChange={e=>completeFilter(e.target.value, "asunto")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="company">Tipo de plantilla:</Label>
                                                <Select
                                                    value={emailTemplateTypes}
                                                    onChange={(selected) => completeFilter(selected, "tipoCarta")}
                                                    options={emailTemplateTypesOpt}
                                                    classNamePrefix="select2-selection"
                                                    isClearable
                                                    placeholder="Seleccionar opción"
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
                                    <Col xl="12">                                    
                                        <SimpleTable
                                            columns={columns}
                                            items={response.data} 
                                        />
                                    </Col>
                                    {
                                        response.totalPaginas > 0 && 
                                        <Paginate
                                            page={page}
                                            totalPaginas={response.totalPaginas}
                                            totalRegistros={response.totalRegistros}
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
        </>
    );
}

export default withRouter(EmailTemplateList);