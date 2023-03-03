import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { ERROR_SERVER } from "../../constant/messages";
import { createClub, updateClub } from "../../helpers/backend_helper";
import SubmitingForm from "../Loader/SubmitingForm";

function ClubForm({item}){
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false)
    

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item?.id || null,
            descripcion: item?.descripcion || '',
            imagen: item?.imagen || '',
            nombre: item?.nombre || '',
            tarifaAnualidad: item?.tarifaAnualidad || '',
            direccion: item?.direccion || '',
            email: item?.email || '',
            telefono: item?.telefono || '',
            urlPagina: item?.urlPagina || '',
            activo: item?.activo || false,
            codigo: item?.codigo || ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Campo requerido'),
            tarifaAnualidad: Yup.number().min(0, "La tarifa debe ser mayor a 0"),
        }),
        onSubmit: async (values) => {
            setIsSubmit(true)
            try{
                if(values.id){
                    let response = await updateClub(values.id, values)
                    if(response.state){
                        toast.success("Salvado correctamente");
                        setTimeout(()=>{
                            setIsSubmit(false)
                            history.goBack();
                        }, 2000)
                    }else{
                        toast.error(ERROR_SERVER);
                        setIsSubmit(false)
                    }
                }else{
                    let response = await createClub(values)
                    if(response.state){
                        toast.success("Salvado correctamente");
                        setTimeout(()=>{
                            setIsSubmit(false)
                            history.goBack();
                        }, 2000)
                    }else{
                        toast.error(ERROR_SERVER);
                        setIsSubmit(false)
                    }
                }                
                
            }catch(error) {
                setIsSubmit(false)
                toast.error(ERROR_SERVER); 
            }
        }
    })

    return (
        <>
            {isSubmit && <SubmitingForm />}
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
                    <Col xs="12" md="4">
                        <Label htmlFor="nombre" className="mb-0">Nombre</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            className={`form-control ${validation.errors.nombre ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nombre || ""}  
                        />
                        {
                            (validation.errors?.nombre) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.nombre}</div>
                        }
                    </Col>
                    <Col xs="12" md="3">
                        <Label htmlFor="nombre" className="mb-0">Url Página</Label>
                        <Input
                            id="urlPagina"
                            name="urlPagina"
                            className={`form-control ${validation.errors.urlPagina ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.urlPagina || ""}  
                        />
                        {
                            (validation.errors?.urlPagina) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.urlPagina}</div>
                        }
                    </Col>
                    <Col xs="12" md="3">
                        <Label htmlFor="imagen" className="mb-0">Nombre de la imagen</Label>
                        <Input
                            id="imagen"
                            name="imagen"
                            className={`form-control ${validation.errors.imagen ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.imagen || ""}  
                        />
                        {
                            (validation.errors?.imagen) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.imagen}</div>
                        }
                    </Col>
                    <Col xs="12" md="2">
                        <Label htmlFor="tarifaAnualidad" className="mb-0">Anualidad</Label>
                        <Input
                            id="tarifaAnualidad"
                            name="tarifaAnualidad"
                            type="number"
                            className={`form-control ${validation.errors.tarifaAnualidad ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.tarifaAnualidad || ""}  
                        />
                        {
                            (validation.errors?.tarifaAnualidad) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.tarifaAnualidad}</div>
                        }
                    </Col>
                    <Col xs="12" md="4">
                        <Label htmlFor="direccion" className="mb-0">Dirección</Label>
                        <Input
                            id="direccion"
                            name="direccion"
                            className={`form-control ${validation.errors.direccion ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.direccion || ""}  
                        />
                        {
                            (validation.errors?.direccion) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.direccion}</div>
                        }
                    </Col>
                    <Col xs="12" md="3">
                        <Label htmlFor="codigo" className="mb-0">Código</Label>
                        <Input
                            id="codigo"
                            name="codigo"
                            className={`form-control ${validation.errors.codigo ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.codigo || ""}  
                        />
                        {
                            (validation.errors?.codigo) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.codigo}</div>
                        }
                    </Col>
                    <Col xs="12" md="3">
                        <Label htmlFor="email" className="mb-0">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            className={`form-control ${validation.errors.email ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}  
                        />
                        {
                            (validation.errors?.email) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.email}</div>
                        }
                    </Col>
                    <Col xs="12" md="2">
                        <Label htmlFor="telefono" className="mb-0">Teléfono</Label>
                        <Input
                            id="telefono"
                            name="telefono"
                            className={`form-control ${validation.errors.telefono ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.telefono || ""}  
                        />
                        {
                            (validation.errors?.telefono) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.telefono}</div>
                        }
                    </Col>
                    <Col xs="12" md="4">
                        <Label htmlFor="descripcion" className="mb-0">Descripción</Label>
                        <textarea 
                            className={`form-control ${validation.errors.descripcion ? 'is-invalid' : ''}`} 
                            id="descripcion" 
                            rows="9"
                            name="descripcion"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.descripcion || ""}                            
                        />
                        {
                            (validation.errors?.descripcion) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.descripcion}</div>
                        }
                    </Col>
                    <Col xs="12" md="3">
                        <Label className="mb-0 opacity-0 d-block">placeholder</Label>
                        <Input
                            id="check_activo"
                            name="activo"
                            type="checkbox"
                            className={`form-check-Input form-check-input`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            checked={validation.values.activo || false}  
                        />
                        <Label htmlFor={`check_activo`} className="mb-0 ms-2">Activo</Label>
                    </Col>
                </Row>
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
                        onClick={e=>history.goBack()}
                    >Cancelar
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default ClubForm