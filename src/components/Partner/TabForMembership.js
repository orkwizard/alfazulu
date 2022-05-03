import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import SimpleLoad from "../Loader/SimpleLoad";
import SimpleTable from "../Tables/SimpleTable";
import * as Yup from "yup";
import Select from "react-select";

function TabForMembership({isActive}){
    const [response, setResponse] = useState({
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
            text: "Fecha renovación",
            dataField: "fechaRenovacion" ,
            style: {
                width: "30%"
            }      
        },
        {
            text: "Años",
            dataField: "anios" ,
            style: {
                width: "10%"
            }      
        },
        {
            text: "Club",
            dataField: "club" ,
            style: {
                width: "40%"
            }      
        },
        {
            text: "Pago",
            dataField: "pago" ,
            style: {
                width: "20%"
            }      
        }
    ];

    //form
    const [showForm, setShowForm] = useState(false)
    const [anio, setAnio] = useState(null)

    useEffect(()=>{
        setResponse(prev=>({
            ...prev,
            loading: false
        }))
    },[]);

    //form add comments
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          anios: "",
          reference: "",
          club: "",
          switchcompany: false,
          comentario: "",
        },
        validationSchema: Yup.object({
            anios: Yup.string().required("Campo requerido"),
            comentario: Yup.string().required("Campo requerido"),
        }),
        onSubmit: (values) => {
          console.log(values)

          //service here
        }
    });

    const cleanForm = () =>{
        setShowForm(false)
        setAnio(null)
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
                <Col xs="12" md="6">
                    <Label htmlFor="anios" className="mb-0">Años:</Label>
                    <Select
                        value={anio}
                        onChange={(selected) => {
                            setAnio(selected)
                        }}
                        options={[]}
                        classNamePrefix="select2-selection"
                        isClearable
                        className={`${validation.errors.anios ? 'is-invalid' : ''}`} 
                        placeholder="Seleccionar opción"
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: validation.errors.anios ? '#f46a6a!important' : '',
                                boxShadow: validation.errors.anios ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                })
                            }
                        }
                    />
                    {
                        validation.errors.anios &&
                        <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.anios}</div>
                    }
                </Col>
                <Col xs="12" md="6">
                  <Label htmlFor="anios" className="mb-0">Referencia:</Label>
                  <Input
                    id="referene"
                    name="referene"
                    className={`form-control ${validation.errors.referene ? 'is-invalid' : ''}`}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.referene || ""}  
                  />
                  {
                    (validation.errors?.referene) &&
                    <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.referene}</div>
                  }
                </Col>
                <Col xs="12" md="6" className="my-2">
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
                </Col>
                <Col xs="12" md="12">
                    <div className="mb-2">
                        <Label htmlFor="comentario" className="mb-0">Comentario:</Label>
                        <textarea 
                            className={`form-control ${validation.errors.comentario ? 'is-invalid' : ''}`} 
                            id="comentario" 
                            rows="9"
                            name="comentario"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.comentario || ""}                            
                        />
                        {
                            (validation.errors.comentario) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.comentario}</div>
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
                            <SimpleTable
                                columns={columns}
                                items={response.data} 
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