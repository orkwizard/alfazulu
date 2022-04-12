import { useRef, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, Input, Label, Row } from "reactstrap"
import * as Yup from "yup";
import EmailEditor from 'react-email-editor';
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../constant/messages";
import { saveEmailTemplate } from "../../helpers/backend_helper";
import { useHistory } from "react-router-dom";
import SubmitingForm from "../Loader/SubmitingForm";

function EmailTemplateForm({emailTemplate}){
    const emailEditorRef = useRef(null);
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: emailTemplate?.id || null,
            activo: emailTemplate?.activo || false,
            asunto: emailTemplate?.asunto,
            designJson: emailTemplate?.designJson,
            nombre: emailTemplate?.nombre,
            paramCuerpo: emailTemplate?.paramCuerpo,
            parametroDesde: emailTemplate?.parametroDesde
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Campo requerido'),
            asunto: Yup.string().required('Campo requerido'),
            parametroDesde: Yup.string().required('Campo requerido')
        }),
        onSubmit: async (values) => {
            setIsSubmit(true)
            try{
                emailEditorRef.current.editor.exportHtml((data) => {
                    const { design, html } = data;

                    //build a better values
                    values.designJson = JSON.stringify(design)
                    values.paramCuerpo = html

                    async function saveEmailTemplateApi() {
                        let response = await saveEmailTemplate(values)
                        if(response.state){
                            toast.success("Salvado correctamente");
                            setTimeout(()=>{
                                setIsSubmit(false)
                                history.push("/email-templates/list")
                            }, 2000)
                        }else{
                            toast.error(ERROR_SERVER);
                            setIsSubmit(false)
                        }
                    }
                    saveEmailTemplateApi()
                });
            }catch(error) {
                setIsSubmit(false)
                toast.error(ERROR_SERVER); 
            }
        }
    })

    const onLoad = () => {
        if(emailTemplate?.designJson){
            // editor instance is created
            // you can load your template here;
            const templateJson = JSON.parse(emailTemplate.designJson);
            emailEditorRef.current.editor.loadDesign(templateJson);
        }
    }

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
                    <Col xs="12" md="8">
                        <Label htmlFor="nombre" className="mb-0">Nombre:</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            className={`form-control ${validation.errors.nombre ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nombre || ""}  
                        />
                        {
                            (validation.touched?.nombre && validation.errors?.nombre) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.nombre}</div>
                        }
                    </Col>
                    <Col xs="12" md="4" className="align-self-end">
                        <Input
                            id="check_activo"
                            name="activo"
                            type="checkbox"
                            className={`form-check-Input form-check-input`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.activo || false}  
                        />
                        <Label htmlFor={`check_activo`} className="mb-0 ms-2">Activo: </Label>
                    </Col>
                </Row>
                <label className="fw-bold d-block fs-08 mb-0 mt-4">Información de Correo</label>
                <Row>
                    <Col xs="12" md="12">
                        <Label htmlFor="parametroDesde" className="mb-0">Desde:</Label>
                        <Input
                            id="parametroDesde"
                            name="parametroDesde"
                            className={`form-control ${validation.errors.parametroDesde ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.parametroDesde || ""}  
                        />
                        {
                            (validation.touched?.parametroDesde && validation.errors?.parametroDesde) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.parametroDesde}</div>
                        }
                    </Col>
                    <Col xs="12" md="8">
                        <Label htmlFor="nombre" className="mb-0">Asunto:</Label>
                        <Input
                            id="asunto"
                            name="asunto"
                            className={`form-control ${validation.errors.asunto ? 'is-invalid' : ''}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.asunto || ""}  
                        />
                        {
                            (validation.touched?.asunto && validation.errors?.asunto) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.asunto}</div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Label className="mb-0">Plantilla:</Label>
                    <Col xs="12" lg="12" className="mt-2">
                        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
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

export default EmailTemplateForm