import { Field, FieldArray, FormikProvider, useFormik } from "formik"
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import * as Yup from "yup";
import { getIdiomas, getParentesco, getTiposTelefonos, savePartner } from "../../helpers/backend_helper";
import Select from "react-select";
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../constant/messages";

function FormEditMembershipPartner({partner, setShowForm, setReloadPartner}){
    //console.log(partner)
    //form edit partnet
    const [idioma, setIdioma] = useState()
    const [idiomasOpt, setIdiomasOpt] = useState([])
    const [tipoTelefonosOpt, setTipoTelefonosOpt] = useState([])
    const [parentescoOpt, setParentescoOpt] = useState([])
    

    //default data
    useEffect(()=>{
        if(partner && Object.keys(partner.idioma).length > 0){
            let data = {
                value: partner.idioma.id,
                label: partner.idioma.nombre
            }
            setIdioma(data)
        }
    }, [partner])
    
    //idiomas
    useEffect(()=>{
        async function fetchIdiomas() {
            let response = await getIdiomas()
            if(response.state){
                setIdiomasOpt(response.data.response.map(item=>({value: item.id, label: item.nombre})))
            }
        }
        fetchIdiomas()
    },[])    

    //tipos de telefonos
    useEffect(()=>{
        async function fetchTipoTelefonos() {
            let response = await getTiposTelefonos()
            if(response.state){
                setTipoTelefonosOpt(response.data.response.map(item=>({value: item.id, label: item.nombre})))
            }
        }
        fetchTipoTelefonos()
    },[])

    //parentesco
    useEffect(()=>{
        async function fetchParentesco() {
            let response = await getParentesco()
            if(response.state){
                setParentescoOpt(response.data.response.map(item=>({value: item.id, label: item.nombre})))
            }
        }
        fetchParentesco()
    },[])
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: partner.id,
            informacionPersonal: {
                id: partner.informacionPersonal.id,
                nombre: partner.informacionPersonal.nombre,
                segundoNombre: partner.informacionPersonal.segundoNombre,
                primerApellido: partner.informacionPersonal.primerApellido,
                segundoApellido: partner.informacionPersonal.segundoApellido,
                correos: partner.informacionPersonal.correos.map(item=>({
                    id: item.id,
                    correo: item.correo,
                    principal: item.principal
                })),
                telefonos: partner.informacionPersonal.telefonos.map(item=>({
                    id: item.id,
                    numero: item.numero,
                    activo: item.activo,
                    tipoTelefono: item.tipoTelefono
                }))
            },
            direcciones: partner.direcciones.map(item=>({
                id:  item.id,
                calle: item.calle,
                codigoPostal: item.codigoPostal,
                activo: item.activo
            })),
            beneficiarios: partner.beneficiarios.map(item=>({
                id: item.id,
                idSocio: item.idSocio,
                cotitular: item.cotitular,
                informacionPersonal: {
                    id: item.informacionPersonal.id,
                    nombre: item.informacionPersonal.nombre,
                    segundoNombre: item.informacionPersonal.segundoNombre,
                    primerApellido: item.informacionPersonal.primerApellido,
                    segundoApellido: item.informacionPersonal.segundoApellido
                },
                parentesco: item.parentesco
            })),
            idioma: partner.idioma
        },
        validationSchema: Yup.object({
            informacionPersonal: Yup.object().shape({
                nombre: Yup.string().required('Campo requerido'),
                primerApellido: Yup.string().required('Campo requerido'),
                correos: Yup.array().of(
                    Yup.object().shape({
                        correo: Yup.string().required("Campo requerido")
                    })
                ),
                telefonos: Yup.array().of(
                    Yup.object().shape({
                        numero: Yup.string().required("Campo requerido")
                    })
                )
            }),
            direcciones: Yup.array().of(
                Yup.object().shape({
                    calle: Yup.string().required("Campo requerido"),
                    codigoPostal: Yup.string().required("Campo requerido"),
                })
            ),
            beneficiarios: Yup.array().of(
                Yup.object().shape({
                    informacionPersonal: Yup.object().shape({
                        nombre: Yup.string().required('Campo requerido'),
                        primerApellido: Yup.string().required('Campo requerido'),
                    })
                })
            ),
            idioma: Yup.object().shape({
                nombre: Yup.string().required('Campo requerido'),
            })
        }),
        onSubmit: (values) => {
            //validaciones antes de enviarlo
            //1. Solo tenga un beneficiario como cotitular
            if(values.beneficiarios.filter(item=>item.cotitular).length > 1){
                toast.error("No puede existir más de un beneficiario como cotitular")
                return false;
            }
            //service here
            try {
                async function savePartnerApi() {
                    let response = await savePartner(values)
                    if(response.state){
                        toast.success("Actualizado correctamente");
                        setReloadPartner(true)
                        setShowForm(false)
                    }else{
                        toast.error(ERROR_SERVER);
                    }
                }
                savePartnerApi()
            }catch(error) {
                toast.error(ERROR_SERVER); 
            }
        }
    })

    return (
        <Form
            className="needs-validation"
            id="tooltipForm"
            onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}
        >
            <div className="mb-2">
                <label className="fw-bold d-block fs-08 mb-0 ps-125rem">Información del socio:</label>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12" md="6">
                                <Label htmlFor="nombre" className="mb-0">Nombre:</Label>
                                <Input
                                    id="nombre"
                                    name="informacionPersonal.nombre"
                                    className={`form-control ${validation.errors.informacionPersonal?.nombre ? 'is-invalid' : ''}`}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.informacionPersonal.nombre || ""}  
                                />
                                {
                                    (validation.touched.informacionPersonal?.nombre && validation.errors.informacionPersonal?.nombre) &&
                                    <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.informacionPersonal.nombre}</div>
                                }
                            </Col>
                            <Col xs="12" md="6">
                                <Label htmlFor="segundoNombre" className="mb-0">Segundo nombre:</Label>
                                <Input
                                    id="segundoNombre"
                                    name="informacionPersonal.segundoNombre"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.informacionPersonal.segundoNombre || ""}  
                                />
                            </Col>
                            <Col xs="12" md="6">
                                <Label htmlFor="primerApellido" className="mb-0">Apellido paterno:</Label>
                                <Input
                                    id="primerApellido"
                                    name="informacionPersonal.primerApellido"
                                    className={`form-control ${validation.errors.informacionPersonal?.primerApellido ? 'is-invalid' : ''}`}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.informacionPersonal.primerApellido || ""}  
                                />
                                {
                                    (validation.touched.informacionPersonal?.primerApellido && validation.errors.informacionPersonal?.primerApellido) &&
                                    <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.informacionPersonal.primerApellido}</div>
                                }
                            </Col>
                            <Col xs="12" md="6">
                                <Label htmlFor="segundoApellido" className="mb-0">Apellido materno:</Label>
                                <Input
                                    id="segundoApellido"
                                    name="informacionPersonal.segundoApellido"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.informacionPersonal.segundoApellido || ""}  
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
            <div className="mb-2">
                {/* {console.log(validation.errors)}
                {console.log(validation.values)} */}
                <label className="fw-bold d-block fs-08 mb-0 ps-125rem">Direcciones:</label>
                <FormikProvider value={validation}>
                    <FieldArray
                        name="direcciones"
                        render={arrayHelper=>(
                            <div>
                                {
                                    (validation.values.direcciones && validation.values.direcciones.length > 0) &&
                                    validation.values.direcciones.map((item, index) => (
                                        <div key={index}>
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-end mt-1">
                                                    <Label className="mb-0">Calle:</Label>
                                                    {/* <Button color="danger" size="sm" onClick={() => arrayHelper.remove(index)}>Eliminar</Button> */}
                                                    </div>
                                                    <Field
                                                        className={`form-control ${validation.errors?.direcciones?.length > 0 && validation.errors.direcciones[index]?.calle ? 'is-invalid' : ''}`}
                                                        name={`direcciones.${index}.calle`} 
                                                    />
                                                    <Row>
                                                        <Col xs="12" md="8">
                                                            <Label className="mb-0">Código postal:</Label>
                                                            <Field
                                                                className={`form-control ${validation.errors?.direcciones?.length > 0 && validation.errors.direcciones[index]?.codigoPostal ? 'is-invalid' : ''}`}
                                                                name={`direcciones.${index}.codigoPostal`} 
                                                            />
                                                        </Col>
                                                        <Col xs="12" md="4" className="align-self-end">
                                                            <Field
                                                                className="form-check-Input form-check-input"
                                                                id={`check_${index}`} 
                                                                type="checkbox"
                                                                name={`direcciones.${index}.activo`} 
                                                            />
                                                            <Label htmlFor={`check_${index}`} className="mb-0 ms-2">Activa: </Label>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))
                                }
                                <Button type="button" color="link" className="btn btn-link" onClick={() => arrayHelper.push({
                                    calle: '',
                                    codigoPostal: '',
                                    activo: false,
                                })}>
                                    <i className="mdi mdi-notebook-plus-outline me-1"></i>
                                    Agregar nueva dirección
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider>
            </div>
            <div className="mb-2">
                <Card>
                    <CardBody>
                        <label className="fw-bold d-block fs-08 mb-0">Idioma:</label>
                        <Select
                            value={idioma}
                            onChange={(selected) => {
                                setIdioma(selected)
                                if(selected){
                                    validation.setFieldValue("idioma.id", selected.value)
                                    validation.setFieldValue("idioma.nombre", selected.label)
                                }else{
                                    validation.setFieldValue("idioma.id", null)
                                    validation.setFieldValue("idioma.nombre", "")
                                    validation.validateField("idioma")
                                }
                            }}
                            options={idiomasOpt}
                            classNamePrefix="select2-selection"
                            className={`${validation.errors.idioma?.nombre ? 'is-invalid' : ''}`}
                            placeholder="Seleccionar opción"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: validation.errors.idioma?.nombre ? '#f46a6a!important' : '',
                                    boxShadow: validation.errors.idioma?.nombre ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                })
                                }
                            }
                        />
                    </CardBody>
                </Card>
            </div>
            <div className="mb-2">
                <label className="fw-bold d-block fs-08 mb-0 ps-125rem">Correos electrónicos:</label>
                <FormikProvider value={validation}>
                    <FieldArray
                        name="informacionPersonal.correos"
                        render={arrayHelperCorreo=>(
                            <div>
                                {
                                    (validation.values.informacionPersonal.correos && validation.values.informacionPersonal.correos.length > 0) &&
                                    validation.values.informacionPersonal.correos.map((item, index) => (
                                        <div key={index}>
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-end mt-1">
                                                        <Label className="mb-0">Correo electrónico:</Label>
                                                        {/* <Button color="danger" size="sm" onClick={() => arrayHelperCorreo.remove(index)}>Eliminar</Button> */}
                                                    </div>
                                                    <Field
                                                        className={`form-control ${validation.errors?.informacionPersonal?.correos?.length > 0 && validation.errors.informacionPersonal.correos[index]?.correo ? 'is-invalid' : ''}`}
                                                        name={`informacionPersonal.correos.${index}.correo`} 
                                                    />
                                                    <Row>                                                        
                                                        <Col xs="12" md="12" className="align-self-end">
                                                            <Field
                                                                className="form-check-Input form-check-input"
                                                                id={`check_correo_${index}`} 
                                                                type="checkbox"
                                                                name={`informacionPersonal.correos.${index}.principal`} 
                                                            />
                                                            <Label htmlFor={`check_correo_${index}`} className="mb-0 ms-2">Principal: </Label>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))
                                }
                                <Button type="button" color="link" className="btn btn-link" onClick={() => arrayHelperCorreo.push({
                                    correo: '',
                                    principal: false,
                                })}>
                                    <i className="mdi mdi-notebook-plus-outline me-1"></i>
                                    Agregar nuevo correo
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider>
            </div>
            <div className="mb-2">
                <label className="fw-bold d-block fs-08 mb-0 ps-125rem">Teléfonos:</label>
                <FormikProvider value={validation}>
                    <FieldArray
                        name="informacionPersonal.telefonos"
                        render={arrayHelper=>(
                            <div>
                                {
                                    (validation.values.informacionPersonal.telefonos && validation.values.informacionPersonal.telefonos.length > 0) &&
                                    validation.values.informacionPersonal.telefonos.map((item, index) => (
                                        <div key={index}>
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-end mt-1">
                                                        <Label className="mb-0">Número:</Label>
                                                        {/* <Button color="danger" size="sm" onClick={() => arrayHelper.remove(index)}>Eliminar</Button> */}
                                                    </div>
                                                    <Field
                                                        className={`form-control ${validation.errors?.informacionPersonal?.telefonos?.length > 0 && validation.errors.informacionPersonal.telefonos[index]?.numero ? 'is-invalid' : ''}`}
                                                        name={`informacionPersonal.telefonos.${index}.numero`} 
                                                    />
                                                    <Row>    
                                                        <Col xs="12" md="8">
                                                            <Label className="mb-0">Tipo de número:</Label>
                                                            <Select
                                                                value={{
                                                                        value: validation.values.informacionPersonal.telefonos[index].tipoTelefono?.id, 
                                                                        label: validation.values.informacionPersonal.telefonos[index].tipoTelefono?.nombre
                                                                    }}
                                                                onChange={(selected) => {
                                                                    if(selected){
                                                                        validation.setFieldValue(`informacionPersonal.telefonos.${index}.tipoTelefono.id`, selected.value)
                                                                        validation.setFieldValue(`informacionPersonal.telefonos.${index}.tipoTelefono.nombre`, selected.label)
                                                                    }else{
                                                                        validation.setFieldValue(`informacionPersonal.telefonos.${index}.tipoTelefono.id`, null)
                                                                        validation.setFieldValue(`informacionPersonal.telefonos.${index}.tipoTelefono.nombre`)
                                                                    }
                                                                }}
                                                                options={tipoTelefonosOpt}
                                                                classNamePrefix="select2-selection"
                                                                placeholder="Seleccionar opción"
                                                            />
                                                        </Col>                                                  
                                                        <Col xs="12" md="4" className="align-self-end">
                                                            <Field
                                                                className="form-check-Input form-check-input"
                                                                id={`check_telefono_${index}`} 
                                                                type="checkbox"
                                                                name={`informacionPersonal.telefonos.${index}.activo`} 
                                                            />
                                                            <Label htmlFor={`check_telefono_${index}`} className="mb-0 ms-2">Activo: </Label>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))
                                }
                                <Button type="button" color="link" className="btn btn-link" onClick={() => arrayHelper.push({
                                    numero: '',
                                    activo: false,
                                })}>
                                    <i className="mdi mdi-notebook-plus-outline me-1"></i>
                                    Agregar nuevo teléfono
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider>
            </div>
            <div className="mb-2">
                <label className="fw-bold d-block fs-08 mb-0 ps-125rem">Beneficiarios:</label>
                <FormikProvider value={validation}>
                    <FieldArray
                        name="beneficiarios"
                        render={arrayHelper=>(
                            <div>
                                {
                                    (validation.values.beneficiarios && validation.values.beneficiarios.length > 0) &&
                                    validation.values.beneficiarios.map((item, index) => (
                                        <div key={index}>
                                            <Card>
                                                <CardBody>
                                                    {/* <div className="mt-1 text-end">
                                                        <Button color="danger" size="sm" onClick={() => arrayHelper.remove(index)}>Eliminar</Button>
                                                    </div> */}
                                                    <Row>
                                                        <Col xs="12" md="6">
                                                            <Label className="mb-0">Nombre:</Label>
                                                            <Field
                                                                className={`form-control ${validation.errors?.beneficiarios?.length > 0 && validation.errors.beneficiarios[index]?.informacionPersonal?.nombre ? 'is-invalid' : ''}`}
                                                                name={`beneficiarios.${index}.informacionPersonal.nombre`} 
                                                            />
                                                        </Col>
                                                        <Col xs="12" md="6">
                                                            <Label className="mb-0">Segundo nombre:</Label>
                                                            <Field
                                                                className={`form-control`}
                                                                name={`beneficiarios.${index}.informacionPersonal.segundoNombre`} 
                                                            />
                                                        </Col>
                                                        <Col xs="12" md="6">
                                                            <Label className="mb-0">Apellido paterno:</Label>
                                                            <Field
                                                                className={`form-control ${validation.errors?.beneficiarios?.length > 0 && validation.errors.beneficiarios[index]?.informacionPersonal?.primerApellido ? 'is-invalid' : ''}`}
                                                                name={`beneficiarios.${index}.informacionPersonal.primerApellido`} 
                                                            />
                                                        </Col>
                                                        <Col xs="12" md="6">
                                                            <Label className="mb-0">Apellido materno :</Label>
                                                            <Field
                                                                className={`form-control`}
                                                                name={`beneficiarios.${index}.informacionPersonal.segundoApellido`} 
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="12" md="8">
                                                            <Label className="mb-0">Parentesco:</Label>
                                                            <Select
                                                                value={{
                                                                        value: validation.values.beneficiarios[index].parentesco?.id, 
                                                                        label: validation.values.beneficiarios[index].parentesco?.nombre
                                                                    }}
                                                                onChange={(selected) => {
                                                                    if(selected){
                                                                        validation.setFieldValue(`beneficiarios.${index}.parentesco.id`, selected.value)
                                                                        validation.setFieldValue(`beneficiarios.${index}.parentesco.nombre`, selected.label)
                                                                    }else{
                                                                        validation.setFieldValue(`beneficiarios.${index}.parentesco.id`, null)
                                                                        validation.setFieldValue(`beneficiarios.${index}.parentesco.nombre`)
                                                                    }
                                                                }}
                                                                options={parentescoOpt}
                                                                classNamePrefix="select2-selection"
                                                                placeholder="Seleccionar opción"
                                                            />
                                                        </Col>
                                                        <Col xs="12" md="4" className="align-self-end">
                                                            <Field
                                                                className="form-check-Input form-check-input"
                                                                id={`check_cotitular_${index}`} 
                                                                type="checkbox"
                                                                name={`beneficiarios.${index}.cotitular`} 
                                                            />
                                                            <Label htmlFor={`check_telefono_${index}`} className="mb-0 ms-2">Cotitular: </Label>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))
                                }
                                <Button type="button" color="link" className="btn btn-link" onClick={() => arrayHelper.push({
                                    informacionPersonal: {
                                      nombre: '',
                                      segundoNombre: '',
                                      primerApellido: '',
                                      segundoApellido: ''  
                                    },
                                })}>
                                    <i className="mdi mdi-notebook-plus-outline me-1"></i>
                                    Agregar nuevo beneficiario
                                </Button>
                            </div>
                        )}
                    />
                </FormikProvider>
            </div>
            <div className="mt-5">
                <Button
                    color="primary"
                    className="font-16 btn-block btn btn-primary me-2"
                    type="submit"
                >Guardar
                </Button>
                <Button
                    color="danger"
                    className="font-16 btn-block btn btn-primary"
                    onClick={e=>{
                        setReloadPartner(true)
                        setShowForm(false)
                    }}
                >Cancelar
                </Button>
            </div>
        </Form>
    )
}

export default FormEditMembershipPartner