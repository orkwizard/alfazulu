import { width } from "dom-helpers";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { Button, Col, Label, Row, Input } from "reactstrap"
import { getCommentsMembership } from "../../helpers/backend_helper";
import SimpleDate from "../DatePicker/SimpleDate";
import SimpleLoad from "../Loader/SimpleLoad";
import Paginate from "../Tables/Paginate";
import SimpleTable from "../Tables/SimpleTable";


function TabTreeMembership({contractNumber}){
    const [notasResponse, setNotasResponse] = useState({
        data: [],
        totalPaginas: 0,
        totalRegistros: 0,
        loading: true
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
                  <span className="d-block"><strong>Agente: </strong>Demo demo</span>
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
    const [agenteOpt, setAgenteOpt] = useState([])
    const [topico, setTopico] = useState(null)
    const [topicoOpt, setTopicoOpt] = useState([])

    //form
    const [showForm, setShowForm] = useState(false)
    const [topicoForm, setTopicoForm] = useState(null)
    const [comentario, setComentario] = useState('')

    useEffect(()=>{
        let q = Object.keys(query).map(key=>`${key}=${query[key]}`).join("&")
            async function fetchMyAPI() {
                let response = await getCommentsMembership(`?${q}`)
                let data = {
                    data: response.data.notas,
                    totalPaginas: response.data.totalPaginas,
                    totalRegistros: response.data.totalRegistros,
                    loading: false
                }
                setNotasResponse(data)
            }
            fetchMyAPI()
    }, [query]) 

    const handlePageClick = page => {
        setPage(page)
        setQuery(prev=>({
            ...prev,
            pagina: page
        }))
    }

    const search = () =>{
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
                if(value.length){
                    query[type] = moment(value[0]).format("YYYY-MM-DD")
                }else{
                    delete query[type]
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
            default: 
                return;
        }
    }

    const cleanForm = () =>{
        setShowForm(false)
        setComentario('')
        setTopicoForm(null)
    }

    return (

        showForm ?
        <Row>
            <Col xs="12" md="12">
                <div className="mb-2">
                    <Label htmlFor="company" className="mb-0">Tópico:</Label>
                    <Select
                        value={topicoForm}
                        onChange={(selected) => setTopicoForm(selected)}
                        options={topicoOpt}
                        classNamePrefix="select2-selection"
                        isClearable
                    />
                </div>
            </Col>
            <Col xs="12" md="12">
                <div className="mb-2">
                    <Label htmlFor="comentario" className="mb-0">Comentario:</Label>
                    <textarea 
                        className="form-control" 
                        id="comentario" 
                        rows="9"
                        onChange={e=>setComentario(e.target.value)}
                        value={comentario} 
                    />
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
                    >Ingresar
                    </Button>
                </div>
            </Col>
        </Row> :
        
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
                    <Button color="light" onClick={e=>setShowForm(true)}>
                        Agregar comentario
                    </Button>
                    </div>
                </div>
            </Col>
            <Col xs="12" md="12">
                <Row className="align-items-end">
                    <Col xs='6' md="4">
                        <div className="mb-2">
                            <Label htmlFor="creationDate" className="mb-0">Fecha creación:</Label>
                            <SimpleDate 
                                date={creationDate}
                                setDate={completeFilter}
                                element="fechaCreacion"
                            />
                        </div>
                    </Col>
                    <Col xs='6' md="4">
                        <div className="mb-2">
                            <Label htmlFor="company" className="mb-0">Agente:</Label>
                            <Select
                                value={agente}
                                onChange={(selected) => completeFilter(selected, "idAgente")}
                                options={agenteOpt}
                                classNamePrefix="select2-selection"
                                isClearable

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
                                onClick={search}
                            >
                                <i className="mdi mdi-magnify me-1" />
                                Buscar
                            </Button>
                        </div>
                    </Col>
                </Row>
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