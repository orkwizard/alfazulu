import { Field, Formik } from "formik";
import { useEffect, useState } from "react"
import { Button, Col, Form, Label, Row } from "reactstrap";
import SimpleLoad from "../Loader/SimpleLoad";
import * as Yup from "yup";
import moment from 'moment';
import { getRenovacionByMembresiaId, saveRenovacion } from "../../helpers/backend_helper";
import Datatable from "../Tables/DataTable";
import { toast } from "react-toastify";

function TabForMembership({isActive, membresiaId, setReload, club}){
    const [reloadList, setReloadList] = useState(true)
    const [anualidad, setAnualidad] = useState(0)
    const [response, setResponse] = useState({
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
          dataField: "fechaRenovacion", 
          style: {
            whiteSpace: 'pre-line',
            width: "40%"
          }, 
          formatter: (cell, row) => (
              <div>
                  <span className="d-block"><strong>Fecha inicio: </strong>{moment(row.fechaActivacion, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm")} hrs</span> 
                  <span className="d-block"><strong>Fecha fin: </strong>{moment(cell, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm")} hrs</span> 
                  <span className="d-block"><strong>Años comprados: </strong>{row.annosComprado}</span>                 
                  <span className="d-block"><strong>Costo: </strong>{row.costo} usd</span>
                  <span className="d-block"><strong>Confirmación pago: </strong>{row.pagos.map(e=> e.referencia).join(' ')}</span>
                  <span className="d-block"><strong>Agente: </strong>{`${row.agente?.nombre ?? ''} ${row.agente?.apellidos ?? ''}`}</span>
              </div>
          )          
        },
        {
            text: "Comentario",
            dataField: "comentarios" ,
            style: {
                whiteSpace: 'pre-line',
                width: "60%"
            }      
        }
    ];

    //form
    const [showForm, setShowForm] = useState(false)

    useEffect(()=>{
        setResponse(prev=>({
            ...prev,
            loading: false
        }))
        if(membresiaId && reloadList){
            async function fetchMyAPI() {
                let response = await getRenovacionByMembresiaId(membresiaId)
                //console.log(response)
                if(response.state){
                    let data = {
                        data: response.data.response,
                        totalPaginas: 0,
                        totalRegistros: 0,
                        loading: false
                    }
                    setResponse(data)
                    setReloadList(false)
                }
            }
            fetchMyAPI()
        }
    },[membresiaId, reloadList]);

    //get anualidad de club
    useEffect(()=>{
        if(club?.tarifaAnualidad){
            setAnualidad(club.tarifaAnualidad)
        }
    }, [club])

    const cleanForm = () =>{
        setShowForm(false)
    }

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
        <Formik
            initialValues={{
                annosComprado: '',
                costo: 0,
                fechaRenovacion: moment().format("YYYY-MM-DD"),
                fechaActivacion: moment().format("YYYY-MM-DD"),
                membresiaId: membresiaId,
                comentarios: "",
                agente: {id: 380},
                pagos: 
                  {
                      referencia: "",
                      tarjetaHabiente: '',
                      formaPago: 'CREDITO',
                      importe: 0,
                      moneda: {
                          id: 2
                      }      
                  },
            }}
            validationSchema={Yup.object({
                annosComprado: Yup.string().required("Campo requerido"),
                pagos: Yup.object().shape(
                    {
                        referencia: Yup.string().required("Campo requerido"),
                    }
                ),
            })}
            onSubmit={async (values, { setSubmitting,setFieldValue }) => { 
                const data = {...values}
                data.pagos = [values.pagos]
                  try {
                    let response = await saveRenovacion(data)
                    //console.log(response)
                    if(response.state){
                        setResponseFromServer(prev=>({
                            show: true,
                            typeError: 'success',
                            message: ''
                        })) 
                        setReload(true);
                        setReloadList(true)
                        cleanForm();
                    }else{
                        setResponseFromServer(prev=>({
                            show: true,
                            typeError: 'error',
                            message: response.error?.message
                        }))
                    }
                  } catch (error) {
                    console.log(error.response)
                    setResponseFromServer(prev=>({
                        show: true,
                        typeError: 'error',
                        message: error.response?.data?.error?.message
                    }))
                  }
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
        }) => (
            <Form
                className="needs-validation"
                id="tooltipForm" 
                onSubmit={handleSubmit}
            >
                <Row>
                    <Col xs="12" md="6">
                        <Label  htmlFor="annosComprado" className="mb-0">Años</Label>
                        <Row>
                            <Col xs="8" md="9">
                                <Field 
                                    as="select"
                                    className={`form-select ${errors.annosComprado && 'is-invalid'}`}
                                    name="annosComprado"
                                    onChange={e=>{
                                        setFieldValue('annosComprado', e.target.value)
                                        if(e.target.value){
                                            let anios = parseInt(e.target.value)
                                            setFieldValue('costo', anios*anualidad)
                                            setFieldValue('pagos.importe', anios*anualidad)
                                        }else{
                                            setFieldValue('costo', 0)
                                            setFieldValue('pagos.importe', 0)
                                        }
                                    }}
                                >
                                    <option value="">Seleccionar opción</option>
                                    <option value="1">1 año</option>
                                    <option value="2">2 años</option>
                                    <option value="3">3 años</option>
                                    <option value="4">4 años</option>
                                    <option value="5">5 años</option>
                                    <option value="6">6 años</option>
                                    <option value="7">7 años</option>
                                    <option value="8">8 años</option>
                                    <option value="9">9 años</option>
                                    <option value="10">10 años</option>
                                </Field>
                                { errors.annosComprado && <div className="invalid-tooltip" name="validate" id="validate3">{errors.annosComprado}</div> }
                            </Col>
                            <Col xs="4" md="3">
                                <div className="form-control">{values.costo}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md="6">
                    <Label htmlFor="referencia" className="mb-0">Referencia:</Label>
                    <Field 
                        type="text"
                        className={`form-control ${errors.pagos?.referencia && 'is-invalid'}`}
                        name="pagos.referencia"
                    />
                    { errors.pagos?.referencia && <div className="invalid-tooltip" name="validate" id="validate3">{errors.pagos?.referencia}</div> }
                    
                    </Col>
                    {/* <Col xs="12" md="12">
                        <div className="my-2">
                            <Label htmlFor="tarjetaHabiente" className="mb-0">Nombre titular de la tarjeta:</Label>
                            <Field 
                                type="text"
                                className={`form-control input-form ${errors.pagos?.tarjetaHabiente && 'error'}`}
                                name="pagos.tarjetaHabiente"
                            />
                            { errors.pagos?.tarjetaHabiente && <div className="invalid-tooltip" name="validate" id="validate3">{errors.pagos?.tarjetaHabiente}</div> }
                            
                        </div>
                    </Col> */}
                    
                    <Col xs="12" md="12">
                        <div className="my-2">
                            <Label htmlFor="comentario" className="mb-0">Comentario:</Label>
                            <Field 
                                as="textarea"
                                rows="9"
                                className={`form-control`} 
                                name="comentarios"
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
                                type="submit"
                            >Aceptar
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        )}            
        </Formik> :
        <Row>
            <Col xs="12" md="12">
                {
                    response.loading ?
                    <Row>
                        <Col xs="12" xl="12">
                            <SimpleLoad />
                        </Col>
                    </Row> :
                    <Row>
                        <Col xl="12">   
                            <Datatable
                                columns={columns}
                                itemsData={response.data} 
                                enableSearch={false}
                            />
                        </Col>
                    </Row>
                }
            </Col> 
            
            {
                isActive && 
                <div className="text-end">
                    <button
                        type="button"
                        className="btn btn-pink-primary  btn-label"
                        onClick={e=>setShowForm(true)}
                        >
                        <i className="bx bx-plus label-icon"></i>{" "}
                        Agregar anualidad
                    </button>
                </div>
            }
            
        </Row>
    );
}

export default TabForMembership