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
                    <Col xs="12" md="6">
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
                    <Col xs="12" md="3">
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
                    <Col xs="12" md="6">
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