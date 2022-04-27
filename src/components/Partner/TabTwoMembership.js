import { useFormik } from "formik";
import { useState } from "react"
import { Button, Col, Form, Input, Label, Row } from "reactstrap"

function TabTwoMembership(){
    const [showForm, setShowForm] = useState(false)

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          beneficios: "",
        },
        onSubmit: (values) => {
          console.log(values)

          //service here
        }
    });

    const cleanForm = () =>{
        setShowForm(false)
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
                    <Label className="fw-bolder">My weeks</Label>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                        >
                            VIP Weeks
                        </label>
                    </div>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck2"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="defaultCheck2"
                        >
                            Hot weeks
                        </label>
                    </div>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck3"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="defaultCheck3"
                        >
                            Vacancy rewards
                        </label>
                    </div>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck4"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="defaultCheck4"
                        >
                            Travel
                        </label>
                    </div>
                    <Label className="fw-bolder">Additional Beneffits</Label>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck5"
                        />
                        <label
                        className="form-check-label"
                        htmlFor="defaultCheck5"
                        >
                            In & Out Mexico
                        </label>
                    </div>
                    <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck6"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="defaultCheck6"
                        >
                            Tours and excursions
                        </label>
                    </div>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                    <div className="mb-2">
                        <Label htmlFor="anioscomprados" className="mb-0">Años comprados:</Label>
                        <Input
                            id="anioscomprados"
                            name="anioscomprados"
                            className={`form-control ${validation.errors.referene ? 'is-invalid' : ''}`} 
                            defaultValue="99"
                        />    
                    </div>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                    <div className="mb-2">
                        <Label htmlFor="semanasporanio" className="mb-0">Número de semanas por año:</Label>
                        <Input
                            id="semanasporanio"
                            name="semanasporanio"
                            className={`form-control ${validation.errors.referene ? 'is-invalid' : ''}`} 
                            defaultValue="10"
                        />    
                    </div>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                    <div className="mb-2">
                        <Label htmlFor="vendedor" className="mb-0">Vendedor:</Label>
                        <Input
                            id="vendedor"
                            name="vendedor"
                            className={`form-control ${validation.errors.referene ? 'is-invalid' : ''}`} 
                            defaultValue="Monica Gutierrez"
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
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        <span className="fw-bolder text-primary">Beneficios</span>
                    </div>
                    {!showForm && <div>
                        <button className="btn btn-pink-primary" onClick={() => setShowForm(true)}>Editar</button>
                    </div>}
                </div>
            </Col>
            <Col xs="12" md="12">
                <Label className="fw-bolder">My weeks</Label>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    id="defaultCheck1"
                    disabled
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck1"
                    >
                        VIP Weeks
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                    disabled
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck2"
                    >
                        Hot weeks
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    disabled
                    id="defaultCheck3"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck3"
                    >
                        Vacancy rewards
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    id="defaultCheck4"
                    disabled
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck4"
                    >
                        Travel
                    </label>
                </div>
                <Label className="fw-bolder">Additional Beneffits</Label>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    disabled
                    id="defaultCheck5"
                    />
                    <label
                    className="form-check-label"
                    htmlFor="defaultCheck5"
                    >
                        In & Out Mexico
                    </label>
                </div>
                <div className="form-check mb-2">
                 <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    disabled
                    id="defaultCheck6"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="defaultCheck6"
                    >
                        Tours and excursions
                    </label>
                </div>
            </Col>
            <Col xs="12" md="12" className="mt-3">
                <div className="form-check mb-2">
                    <Label htmlFor="comentario" className="mb-0">Años comprados:</Label>
                    <div>99</div>    
                </div>
            </Col>
            <Col xs="12" md="12" className="mt-3">
                <div className="form-check mb-2">
                    <Label htmlFor="comentario" className="mb-0">Número de semanas por año:</Label>
                    <div>10</div>    
                </div>
            </Col>
            <Col xs="12" md="12" className="mt-3">
                <div className="form-check mb-2">
                    <Label htmlFor="comentario" className="mb-0">Vendedor:</Label>
                    <div>Monica Gutierrez</div>    
                </div>
            </Col>
            
        </Row>
    )
}

export default TabTwoMembership