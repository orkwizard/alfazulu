import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Badge, Button, Col, Form, Input, Label, Row } from "reactstrap"
import * as Yup from "yup";
import EmailEditor from 'react-email-editor';
import { toast } from "react-toastify";
import { ERROR_SERVER } from "../../constant/messages";
import { getClub, getEmailTemplatesEtiquestas, getEmailTemplatesTypes, saveEmailTemplate } from "../../helpers/backend_helper";
import { useHistory } from "react-router-dom";
import SubmitingForm from "../Loader/SubmitingForm";
import Select from 'react-select'

function EmailTemplateForm({emailTemplate}){
    const emailEditorRef = useRef(null);
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false)
    const [clubOpt, setClubOpt] = useState([])
    const [club, setClub] = useState(emailTemplate ? {value: emailTemplate.club.id, label: emailTemplate.club.nombre} : "")
    const [emailTemplateTypesOpt, setEmailTemplateTypesOpt] = useState([])
    const [emailTemplateTypes, setEmailTemplateTypes] = useState(emailTemplate ? {value: emailTemplate.typeLetter, label: emailTemplate.typeLetter} : "")
    const [etiquetas, setEtiquetas] = useState([])

    useEffect( () => {
        //club
        async function fetchMyAPI() {
            let response = await getClub()
            setClubOpt(response.data.response.map(e=>({label: e.nombre, value: e.id})))
        }
        fetchMyAPI()

        //tipos de emails
        async function fetccEmailTypeAPI() {
            let response = await getEmailTemplatesTypes();
            setEmailTemplateTypesOpt(response.data.response.map(e=>({label: e, value: e})))
        }
        fetccEmailTypeAPI()

        //etiquetas
        async function fetchEtiquetasAPI(){
            let response = await getEmailTemplatesEtiquestas();
            setEtiquetas(response.data.response)
        }
        fetchEtiquetasAPI()
    }, [])

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: emailTemplate?.id || null,
            activo: emailTemplate?.activo || false,
            asunto: emailTemplate?.asunto,
            designJson: emailTemplate?.designJson,
            nombre: emailTemplate?.nombre,
            paramCuerpo: emailTemplate?.paramCuerpo,
            parametroDesde: emailTemplate?.parametroDesde,
            typeLetter: emailTemplate?.typeLetter || "",
            club: emailTemplate?.club || ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Campo requerido'),
            asunto: Yup.string().required('Campo requerido'),
            parametroDesde: Yup.string().required('Campo requerido'),
            typeLetter: Yup.string().nullable().required('Campo requerido'),
            club: Yup.object().shape({
                id: Yup.string().required('Campo requerido').nullable(),
                nombre: Yup.string().required('Campo requerido').nullable()
            })
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
            try{
                setTimeout(()=>{
                    emailEditorRef.current.editor.loadDesign(templateJson);
                }, 3000)
            }catch(error){
                toast.error("En este momento no podemos cargar la plantilla. Por favor refresque la página")
            }
            
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
                            (validation.errors?.nombre) &&
                            <div className="invalid-tooltip" name="validate" id="validate3">{validation.errors.nombre}</div>
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
                    <Col xs="12" md="4">
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
                            (validation.errors?.parametroDesde) &&
                            <div className="invalid-tooltip" name="validate" id="validate2">{validation.errors.parametroDesde}</div>
                        }
                    </Col>
                    <Col xs="12" md="4">
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
                            (validation.errors?.asunto) &&
                            <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.asunto}</div>
                        }
                    </Col>
                    <Col md={3} xs='4'>
                        <Label className="mb-0">Club/Company:</Label>
                        <Select
                            value={club}
                            onChange={(selected) => {
                                setClub(selected)
                                if(selected){
                                    validation.setFieldValue("club.id", selected.value)
                                    validation.setFieldValue("club.nombre", selected.label)
                                    validation.validateField("club")
                                }else{
                                    validation.setFieldValue("club.id", null)
                                    validation.setFieldValue("club.nombre", "")
                                    validation.validateField("club")
                                }
                            }}
                            options={clubOpt}
                            classNamePrefix="select2-selection"
                            className={`${validation.errors.club?.nombre ? 'is-invalid' : ''}`}
                            isClearable
                            placeholder="Seleccionar opción"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: validation.errors.club?.nombre ? '#f46a6a!important' : '',
                                    boxShadow: validation.errors.club?.nombre ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                  })
                                }
                            }
                        />
                        {
                            (validation.errors?.club?.nombre) &&
                            <div className="invalid-tooltip" name="validate" id="validateClub">{validation.errors.club?.nombre}</div>
                        }
                    </Col>
                    <Col md={3} xs='4'>
                        <Label className="mb-0">Tipo de plantilla:</Label>
                        <Select
                            value={emailTemplateTypes}
                            onChange={(selected) => {
                                setEmailTemplateTypes(selected)
                                if(selected){
                                    validation.setFieldValue("typeLetter", selected.value)
                                }else{
                                    validation.setFieldValue("typeLetter", null)
                                    validation.validateField("typeLetter")
                                }
                            }}
                            options={emailTemplateTypesOpt}
                            classNamePrefix="select2-selection"
                            className={`${validation.errors.typeLetter ? 'is-invalid' : ''}`}
                            isClearable
                            placeholder="Seleccionar opción"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: validation.errors.typeLetter ? '#f46a6a!important' : '',
                                    boxShadow: validation.errors.typeLetter ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                  })
                                }
                            }
                        />
                        {
                            (validation.errors?.typeLetter) &&
                            <div className="invalid-tooltip" name="validate" id="validateTypeEmail">{validation.errors.typeLetter}</div>
                        }
                    </Col>
                    <Col xs="12" md="4">
                        <Label className="mb-0 d-block">Etiquetas:</Label>
                        {
                            etiquetas.map((item, index) => (
                                <Badge pill className="badge-soft-dark me-1" key={index}>
                                    {`#${item}`}
                                </Badge>
                            ))
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