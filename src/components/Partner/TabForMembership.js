import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import SimpleLoad from "../Loader/SimpleLoad";
import * as Yup from "yup";
import moment from 'moment';
import { getRenovacionByMembresiaId, saveRenovacion } from "../../helpers/backend_helper";
import Datatable from "../Tables/DataTable";
import SimpleDate from "../DatePicker/SimpleDate";
import { ERROR_SERVER } from "../../constant/messages";
import { toast } from "react-toastify";

function TabForMembership({isActive, membresiaId, setReload}){
    const [reloadList, setReloadList] = useState(true)
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
                  <span className="d-block"><strong>Fecha renovación: </strong>{moment(cell, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm")} hrs</span>                  
                  <span className="d-block"><strong>Costo: </strong>{row.costo}</span>
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
    const [fechaRenovacion, setFechaRenovacion] = useState()

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

    //form add comments
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          costo: "",
          fechaRenovacion: "",
          membresiaId: membresiaId,
          comentarios: "",
          //switchcompany: false,
          pagos: [],
          solicitud: 0,
          fechaActivacion: null
        },
        validationSchema: Yup.object({
            costo: Yup.string().required("Campo requerido"),
            fechaRenovacion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
          //service here
          try {
            let response = await saveRenovacion(values)
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
                    message: ''
                }))
            }
          } catch (error) {
            setResponseFromServer(prev=>({
                show: true,
                typeError: 'error',
                message: ERROR_SERVER
            }))
          }
        }
    });

    const cleanForm = () =>{
        setShowForm(false)
        setFechaRenovacion()
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
                <Col xs="12" md="6">
                    <Label  htmlFor="fechaRenovacion" className="mb-0">Fecha renovación</Label>
                    <SimpleDate 
                        date={fechaRenovacion}
                        setDate={date=>{
                            setFechaRenovacion(date)
                            if(date.length > 0){
                                let dateParse = moment(date[0]).format("YYYY-MM-DD")
                                validation.setFieldValue("fechaRenovacion", dateParse)
                            }else{
                                validation.setFieldValue("fechaRenovacion", "")
                                validation.validateField("fechaRenovacion")
                            }
                        }}
                        element="fechaRenovacion"
                    />
                    {
                        validation.errors?.fechaRenovacion &&
                        <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.fechaRenovacion}</div>
                    }
                </Col>
                <Col xs="12" md="6">
                  <Label htmlFor="costo" className="mb-0">Costo:</Label>
                  <Input
                    id="costo"
                    name="costo"
                    className={`form-control ${validation.errors.costo ? 'is-invalid' : ''}`}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.costo || ""} 
                    type="number" 
                  />
                  {
                    (validation.errors?.costo) &&
                    <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.costo}</div>
                  }
                </Col>
                
                {/* <Col xs="12" md="6" className="my-2">
                    <Label htmlFor="club" className="mb-0 d-block">Club:</Label>
                    <Input
                        id="check_switch_company"
                        name="switchcompany"
                        type="checkbox"
                        className={`form-check-Input form-check-input`}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.activo || false}  
                    />
                    <Label htmlFor={`check_switch_company`} className="mb-0 ms-2 text-success text-decoration-underline">Cambiar de su compañía a Vacancy: </Label>
                </Col> */}
                <Col xs="12" md="12">
                    <div className="mb-2">
                        <Label htmlFor="comentario" className="mb-0">Comentario:</Label>
                        <textarea 
                            className={`form-control ${validation.errors.comentarios ? 'is-invalid' : ''}`} 
                            id="comentarios" 
                            rows="9"
                            name="comentarios"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.comentarios || ""}                            
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
        </Form> :
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