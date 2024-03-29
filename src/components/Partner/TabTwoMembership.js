import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { Alert, Button, Col, Form, Label, Row } from "reactstrap"
import { ERROR_SERVER } from "../../constant/messages";
import { getSerivicios, updateMembresia } from "../../helpers/backend_helper";

function TabTwoMembership({membresia, setReload, isActive}){
    const [showForm, setShowForm] = useState(false)
    const [serviciosAsignados, setServiciosAsignados] = useState([])
    const [allServicios, setAllServicios] = useState([])
    const [responseFromServer, setResponseFromServer] = useState({
        message: '',
        typeError: '',
        show: false
    })
    //console.log(membresia)

    useEffect(()=>{
        async function fetchMyAPI() {
            let response = await getSerivicios()
            if(response.state){
                setAllServicios(response.data.response)
            }
        }
        fetchMyAPI()
    },[])

    useEffect(()=>{
        if(membresia?.servicios !== undefined){
            setServiciosAsignados(membresia.servicios.map(item=>({
                id: item.id,
                nombre: item.nombre
            })))
        }
    }, [membresia?.servicios])

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
            servicios: membresia?.servicios.length > 0 ? membresia.servicios.map(item=>({
              id: item.id,
              nombre: item.nombre
          })) : [],
        },
        onSubmit: async (values) => {
          //console.log(values)
          //console.log(serviciosAsignados)  
        //   const data = {
        //       id: membresia.id,
        //       servicios: serviciosAsignados
        //   }
          const data = Object.assign({}, membresia)
          data.servicios = serviciosAsignados
          try {
            let response = await updateMembresia(membresia.id, data)
            if(response.state){
                setResponseFromServer(prev=>({
                    show: true,
                    typeError: 'success',
                    message: ''
                })) 
                setReload(true)
                setShowForm(false)
            }else{
                setResponseFromServer(prev=>({
                    show: true,
                    typeError: 'error',
                    message: response.error.message
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

    const handleChecked = (checked, id, index) =>{
        let indexF = serviciosAsignados.map(item=>item.id).indexOf(id);
        //console.log(indexF)
        if(checked){
            if(indexF === -1){
                let newService = allServicios[index];
                setServiciosAsignados(prev=>([...prev, newService]))
            }
        }else{
            if(indexF >= 0){
                let copyServiciosA = [...serviciosAsignados]
                copyServiciosA.splice(indexF, 1)
                setServiciosAsignados(copyServiciosA)
            }
        }
    }

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
                <Col md="12" xs="12">
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <div>
                            <span className="fw-bolder text-primary">Beneficios</span>
                        </div>
                    </div>
                </Col>
                <Col xs="12" md="12">
                    {
                        allServicios.map((item, index)=>(
                            <div className="form-check mb-2" key={index}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={serviciosAsignados.map(e=>(e.id)).includes(item.id) ? true : false}
                                onChange={e=>handleChecked(e.target.checked, item.id, index)}
                                />
                                <label className="form-check-label">
                                    {item.nombre}
                                </label>
                            </div>
                        ))
                    }
                </Col>
                <Col xs="12" md="12">
                    <div className="text-sm-end mb-2">
                        <Button
                            color="danger"
                            className="font-16 btn-block btn btn-primary me-2"
                            onClick={() => setShowForm(false)}
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
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        <span className="fw-bolder text-primary">Beneficios</span>
                    </div>
                    {/* {(!showForm && isActive) && <div>
                        <button className="btn btn-pink-primary" onClick={() => setShowForm(true)}>Editar</button>
                    </div>} */}
                </div>
            </Col>
            <Col xs="12" md="12">
                {(membresia?.servicios.length === 0 && allServicios.length === 0) && <Alert color="info">Este socio no tiene beneficios asignados</Alert>}
                {
                    allServicios.map((item, index)=>(
                        <div className="form-check mb-2" key={index}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={serviciosAsignados.map(e=>(e.id)).includes(item.id)}
                                onChange={()=>{}}
                                disabled
                            />
                            <label className="form-check-label">
                                {item.nombre}
                            </label>
                        </div>
                    ))
                }
            </Col>
            <Col xs="12" md="12" className="mt-3">
                <div className="mb-2">
                    <Label htmlFor="comentario" className="mb-0">Número de semanas por año:</Label>
                    <div>{membresia?.informacionMembresia?.semanasCompradas ?? '-'}</div>    
                </div>
            </Col>
            <Col xs="12" md="12">
                <div className="mb-2">
                    <Label htmlFor="comentario" className="mb-0">Vendedor:</Label>
                    <div>{membresia?.informacionMembresia?.agente ?? '-'}</div>    
                </div>
            </Col>            
        </Row>
    )
}

export default TabTwoMembership