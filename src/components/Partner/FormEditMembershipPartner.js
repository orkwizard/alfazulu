import { Field, FieldArray, FormikProvider, useFormik } from "formik"
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import * as Yup from "yup";

function FormEditMembershipPartner({partner, setShowForm}){
    //console.log(partner)
    //form edit partnet
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
            },
            direcciones: partner.direcciones.map(item=>({
                id:  item.id,
                calle: item.calle,
                codigoPostal: item.codigoPostal,
                activo: item.activo
            }))
        },
        validationSchema: Yup.object({
            informacionPersonal: Yup.object().shape({
                nombre: Yup.string().required('Campo requerido'),
                primerApellido: Yup.string().required('Campo requerido')
            }),
            direcciones: Yup.array().of(
                Yup.object().shape({
                    calle: Yup.string().required("Campo requerido"),
                    codigoPostal: Yup.string().required("Campo requerido"),
                })
            )
        }),
        onSubmit: (values) => {
            console.log(values)
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
                <label className="fw-bold d-block fs-08 mb-0">Información del socio:</label>
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
            </div>
            <div className="mb-2">
                {console.log(validation.errors)}
                <label className="fw-bold d-block fs-08 mb-0">Direcciones:</label>
                <FormikProvider value={validation}>
                    <FieldArray
                        name="direcciones"
                        render={arrayHelper=>(
                            <div>
                                {
                                    (validation.values.direcciones && validation.values.direcciones.length > 0) &&
                                    validation.values.direcciones.map((item, index) => (
                                        <div key={item.id}>
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-end mt-1">
                                                    <Label className="mb-0">Calle:</Label>
                                                    <Button color="danger" size="sm" onClick={() => arrayHelper.remove(index)}>Eliminar</Button>
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
                    onClick={e=>setShowForm(false)}
                >Cancelar
                </Button>
            </div>
        </Form>
    )
}

export default FormEditMembershipPartner