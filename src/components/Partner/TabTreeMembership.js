import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Button, Col, Label, Row, Input, Form } from "reactstrap"
import { getAgents, getCommentsMembership, getTopicos, postComments } from "../../helpers/backend_helper";
import SimpleDate from "../DatePicker/SimpleDate";
import SimpleLoad from "../Loader/SimpleLoad";
import Paginate from "../Tables/Paginate";
import SimpleTable from "../Tables/SimpleTable";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../constant/messages";


function TabTreeMembership({contractNumber, isActive}){
    const [notasResponse, setNotasResponse] = useState({
        data: [],
        totalPaginas: 0,
        totalRegistros: 0,
        loading: true
    })
    const [responseFromServer, setResponseFromServer] = useState({
        message: '',
        typeError: '',
        show: false
    })
    const columns = [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
        },
        {
          text: "Detalle",
          dataField: "numeroContrato", 
          style: {
            whiteSpace: 'pre-line',
            width: "30%"
          }, 
          formatter: (cell, row) => (
              <div>
                  <span className="d-block"><strong>Agente: </strong>{row.agente}</span>
                  <span className="d-block"><strong>Fecha: </strong>{moment(row.fechaCreacion, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm")} hrs</span>
                  <span className="d-block"><strong>Topic: </strong>{row.tipoNota}</span>
              </div>
          )          
        },
        {
            text: "Comentario",
            dataField: "texto" ,
            style: {
                whiteSpace: 'pre-line',
                width: "70%"
            }      
        }
    ];
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState({
        limite: 10,
        pagina: page,
        numeroContrato: contractNumber
    })


    //filter
    const [creationDate, setCreationdate] = useState()
    const [texto, setTexto] = useState('')
    const [agente, setAgente] = useState(null)
    const [agentsOpt, setAgentsOpt] = useState([])
    const [topico, setTopico] = useState(null)
    const [topicoOpt, setTopicoOpt] = useState([])

    //form
    const [showForm, setShowForm] = useState(false)
    const [topicoForm, setTopicoForm] = useState(null)

    useEffect(()=>{
        setNotasResponse(prev=>({
            ...prev,
            loading: true
        }))
        let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
        async function fetchMyAPI() {
            let response = await getCommentsMembership(`?${q}`)
            if(response.state){
                let data = {
                    data: response.data.notas,
                    totalPaginas: response.data.totalPaginas,
                    totalRegistros: response.data.totalRegistros,
                    loading: false
                }
                setNotasResponse(data)
            }
        }
        if(!showForm) fetchMyAPI()
    }, [query, showForm]) 
    

    const handlePageClick = page => {
        setPage(page)
        setQuery(prev=>({
            ...prev,
            pagina: page
        }))
    }

    const search = (e) =>{
        e.preventDefault();
        setPage(0)
        setQuery(prev=>({
            ...prev,
            pagina: 0
        }))
    }

    const completeFilter = (value, type) =>{
        switch(type){
            case "fechaCreacion":
                setCreationdate(value)
                if(value.length > 1){
                    let fechaCreacionInicial = moment(value[0]).format("YYYY-MM-DD")
                    let fechaCreacionFinal = moment(value[1]).format("YYYY-MM-DD")
                    query["fechaCreacionInicial"] =fechaCreacionInicial
                    query["fechaCreacionFinal"] =fechaCreacionFinal
                }else{
                    delete query["fechaCreacionInicial"]
                    delete query["fechaCreacionFinal"]
                }                
                break;
                case "texto":
                    setTexto(value)
                    if(value.length){
                        query[type] = value
                    }else{
                        delete query[type]
                    }
                    break;
                case "idClub":
                    setAgente(value)
                    if(value!==null){
                        query[type] = value.value
                    }else{
                        delete query[type]
                    }
                    break;
                case "idTipoNota":
                    setTopico(value)
                    if(value!==null){
                        query[type] = value.value
                    }else{
                        delete query[type]
                    }
                    break;
                case "idAgente":
                    setAgente(value)
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

    const cleanForm = () =>{
        setShowForm(false)
        setTopicoForm(null)
    }

    useEffect(()=>{
        //topicos
        async function fetchTopicoAPI() {
            let response = await getTopicos()
            if(response.state){
                setTopicoOpt(response.data.response.map(e=>({label: e.nombre, value: e.id, visible: e.visible})))
            }
        }
        fetchTopicoAPI()

        //agents
        async function fetchAgentsAPI() {
            let response = await getAgents()
            if(response.state){
                setAgentsOpt(response.data.response.map(e=>({label: `${e.nombre} ${e.apellidos} - ${e.username}`, value: e.id})))
            }
        }
        fetchAgentsAPI()
    }, [])

    //form add comments
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          nota: "",
          tipoNota: "",
        },
        validationSchema: Yup.object({
            nota: Yup.string().required("Campo requerido"),
            tipoNota: Yup.string().required("Campo requerido"),
        }),
        onSubmit: (values) => {
          let data = {
            membresiaDTO: {  
                numeroContrato: contractNumber
            },
            nota: values.nota,
            tipoNota: {id: values.tipoNota}
          }
          //console.log(data)

          //service here
          try {
            async function sendCommentsAp() {
                let response = await postComments(data)
                if(response.state){
                    setResponseFromServer(prev=>({
                        show: true,
                        typeError: 'success',
                        message: ''
                    })) 
                    validation.resetForm()
                    cleanForm()
                }else{
                    setResponseFromServer(prev=>({
                        show: true,
                        typeError: 'error',
                        message: ''
                    }))
                }
                console.log(response)
                
            }
            sendCommentsAp()
          } catch (error) {
            setResponseFromServer(prev=>({
                show: true,
                typeError: 'error',
                message: ERROR_SERVER
            }))
          }
        }
    });

    //update toast show message info
    useEffect(()=>{
        if(responseFromServer.show){
            switch(responseFromServer.typeError){
                case 'success':
                    toast.success("Salvado correctamente")
                    break;
                case 'error':
                    toast.error(responseFromServer.message)
                    break;
                default:
                    break;
            }
            setResponseFromServer(prev=>({
                show: false,
            }))
        }
    }, [responseFromServer])

    return (

        showForm ?
        <Form
            className="needs-validation"
            id="tooltipForm"
            onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}
        >
            <Row>
                <Col xs="12" md="12">
                    <div className="mb-2">
                        <Label htmlFor="company" className="mb-0">Tópico:</Label>
                        <Select
                            value={topicoForm}
                            onChange={(selected) => {
                                setTopicoForm(selected)
                                if(selected){
                                    validation.setFieldValue("tipoNota", selected.value)
                                }else{
                                    validation.setFieldValue("tipoNota", "")
                                    validation.validateField("tipoNota")
                                }
                                
                            }}
                            options={topicoOpt.filter(item=>item.visible)}
                            classNamePrefix="select2-selection"
                            isClearable
                            className={`${validation.errors.tipoNota ? 'is-invalid' : ''}`} 
                            placeholder="Seleccionar opción"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: validation.errors.tipoNota ? '#f46a6a!important' : '',
                                    boxShadow: validation.errors.tipoNota ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                  })
                                }
                            }
                        />
                        {
                            (validation.touched.tipoNota && validation.errors.tipoNota) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.tipoNota}</div>
                        }
                    </div>
                </Col>
                <Col xs="12" md="12">
                    <div className="mb-2">
                        <Label htmlFor="nota" className="mb-0">Comentario:</Label>
                        <textarea 
                            className={`form-control ${validation.errors.nota ? 'is-invalid' : ''}`} 
                            id="nota" 
                            rows="9"
                            name="nota"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nota || ""}                            
                        />
                        {
                            (validation.touched.nota && validation.errors.nota) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.nota}</div>
                        }
                    </div>
                </Col>
                <Col xs="12" md="12">
                    <div className="text-sm-end mb-2">
                        <Button
                            color="danger"
                            className="font-16 btn-block btn btn-primary me-2"
                            onClick={cleanForm}
                        >Cancelar
                        </Button>
                        <Button
                            color="primary"
                            className="font-16 btn-block btn btn-primary"
                            type="submit"
                        >Ingresar
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form> :
        
        <Row>
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex">
                        {/* <form className="app-search d-none d-lg-block">
                            <div className="position-relative">
                                <input
                                type="text"
                                className="form-control"
                                placeholder={'Buscar'}
                                />
                                <span className="bx bx-search-alt" />
                            </div>
                        </form>   */}
                    </div>
                    <div>
                        {isActive && <button className="btn btn-pink-primary" onClick={e=>setShowForm(true)}>
                            Agregar comentario
                        </button>}
                    </div>
                </div>
            </Col>
            <Col xs="12" md="12">
                <Form
                    onSubmit={search}
                >
                    <Row className="align-items-end">
                        <Col xs='6' md="4">
                            <div className="mb-2">
                                <Label htmlFor="creationDate" className="mb-0">Fecha creación por rango:</Label>
                                <SimpleDate 
                                    date={creationDate}
                                    setDate={completeFilter}
                                    element="fechaCreacion"
                                    options={{
                                        mode: "range"
                                    }}
                                    placeholder="dd-MM-YYYY a dd-MM-YYYY"
                                />
                            </div>
                        </Col>
                        <Col xs='6' md="4">
                            <div className="mb-2">
                                <Label htmlFor="company" className="mb-0">Agente:</Label>
                                <Select
                                    value={agente}
                                    onChange={(selected) => completeFilter(selected, "idAgente")}
                                    options={agentsOpt}
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    placeholder="Seleccionar opción"
                                />
                            </div>
                        </Col>
                        <Col xs='6' md="4">
                            <div className="mb-2">
                                <Label htmlFor="company" className="mb-0">Tópico:</Label>
                                <Select
                                    value={topico}
                                    onChange={(selected) => completeFilter(selected, "idTipoNota")}
                                    options={topicoOpt}
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    placeholder="Seleccionar opción"

                                />
                            </div>
                        </Col>
                        <Col xs='6' md="8">
                            <div className="mb-2">
                                <Label htmlFor="texto" className="mb-0">Comentario:</Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="texto"
                                    value={texto}
                                    onChange={e=>completeFilter(e.target.value, "texto")}
                                />
                            </div>
                        </Col>
                        <Col xs="12" md={{offset: 2, size: 2}}>
                            <div className="text-sm-end mb-2">
                                <Button
                                    color="primary"
                                    className="font-16 btn-block btn btn-primary"
                                    type="submit"
                                >
                                    <i className="mdi mdi-magnify me-1" />
                                    Buscar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                
            </Col>
            <Col xs="12" md="12">
                {
                    notasResponse.loading ?
                    <Row>
                        <Col xs="12" xl="12">
                            <SimpleLoad />
                        </Col>
                    </Row> :
                    <Row>
                        <Col xl="12">                                    
                            <SimpleTable
                                columns={columns}
                                items={notasResponse.data} 
                            />
                        </Col>
                        {
                            notasResponse.totalPaginas > 0 && 
                            <Paginate
                                page={page}
                                totalPaginas={notasResponse.totalPaginas}
                                totalRegistros={notasResponse.totalRegistros}
                                handlePageClick={handlePageClick}
                            />
                        }
                    </Row>
                }
            </Col>            
        </Row>
    )
}

export default TabTreeMembership