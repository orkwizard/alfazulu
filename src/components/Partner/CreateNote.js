import { Col, Label, Row } from "reactstrap";
import Select from "react-select";

function CreateNote({validation, topicoOpt, topicoForm, setTopicoForm}){

    return (
        <Row>
            <Col xs="12" md="12">
                <div className="mb-2">
                    <Label htmlFor="company" className="mb-0">Tópico:</Label>
                    <Select
                        value={topicoForm}
                        onChange={(selected) => {
                            setTopicoForm(selected)
                            if(selected){
                                validation.setFieldValue("tipoNota", selected.value)
                            }else{
                                validation.setFieldValue("tipoNota", "")
                                validation.validateField("tipoNota")
                            }
                            
                        }}
                        options={topicoOpt.filter(item=>item.visible)}
                        classNamePrefix="select2-selection"
                        isClearable
                        className={`${validation.errors.tipoNota ? 'is-invalid' : ''}`} 
                        placeholder="Seleccionar opción"
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: validation.errors.tipoNota ? '#f46a6a!important' : '',
                                boxShadow: validation.errors.tipoNota ? '0 0 0 0.15rem rgb(244 106 106 / 25%)!important' : ''
                                })
                            }
                        }
                    />
                    {
                        (validation.touched.tipoNota && validation.errors.tipoNota) &&
                        <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.tipoNota}</div>
                    }
                </div>
            </Col>
            <Col xs="12" md="12">
                <div className="mb-2">
                    <Label htmlFor="nota" className="mb-0">Comentario:</Label>
                    <textarea 
                        className={`form-control ${validation.errors.nota ? 'is-invalid' : ''}`} 
                        id="nota" 
                        rows="9"
                        name="nota"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.nota || ""}                            
                    />
                    {
                        (validation.touched.nota && validation.errors.nota) &&
                        <div className="invalid-tooltip" name="validate" id="validate1">{validation.errors.nota}</div>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default CreateNote