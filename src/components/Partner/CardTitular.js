import { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import avatar1 from "../../assets/images/users/avatar-1.jpg"

function CardTitular({partner, isActive, contractNumber, membresia}){
    const [cotitular, setCotitular] = useState('-')
    const [correo, setCorreo] = useState(null)
    const [telefono, setTelefono] = useState(null)
    console.log(partner)

    useEffect(()=>{
        if(partner){
            let cot = partner.beneficiarios.filter(benef=>benef.cotitular);
            if(cot.length > 0){
                let nameCot = `${cot[0].informacionPersonal?.nombre} ${cot[0].informacionPersonal?.segundoNombre} ${cot[0].informacionPersonal?.primerApellido} ${cot[0].informacionPersonal?.segundoApellido}`
                setCotitular(nameCot)
            }
        }
    }, [partner])

    useEffect(()=>{
        if(partner?.informacionPersonal?.correos.filter(e=>e.principal === true).length > 0){
            setCorreo(partner?.informacionPersonal?.correos.filter(e=>e.principal === true)[0].correo)
        }

        if(partner?.informacionPersonal?.telefonos.filter(e=>e.activo === true).length > 0){
            setTelefono(partner?.informacionPersonal?.telefonos.filter(e=>e.activo === true)[0].numero)
        }
    }, [partner])

    
    return (
        <>
            <Card className="overflow-hidden rounded-0">
                <div className={`${isActive ? 'bg-primary' : 'bg-secondary'} bg-soft`}>
                    <Row>
                        <Col sm="4">
                            <div className={`${isActive ? 'text-primary' : 'text-secondary'} p-3`}>
                                <img
                                    src={avatar1}
                                    alt=""
                                    className="img-thumbnail rounded-circle"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <CardBody className="pt-2">
                <Row className="mb-2">
                    <Col xs="12" md="6">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Información del socio:</label>
                        {
                            partner?.informacionPersonal && 
                            <span className="fs-06">
                                {`${partner.informacionPersonal.nombre} ${partner.informacionPersonal.segundoNombre} ${partner.informacionPersonal.primerApellido} ${partner.informacionPersonal.segundoApellido}`}
                            </span> 
                        }
                    </Col>
                    <Col xs="12" md="6">
                        <label className="fw-bolder mb-0 fs-06 d-block text-dark">Co-titular:</label>
                        <span className="fs-06">{cotitular}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Correo electrónico:</label>
                            {correo ? <span className="fs-06 text-primary">{correo}</span> : <span className="fs-06">No tiene</span>}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Teléfono:</label>
                            {telefono ? <span className="fs-06 text-primary">{telefono}</span> : <span className="fs-06">No tiene</span>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 me-3 text-dark">Fecha de renovación:</label>
                            <span className="fs-06">-</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <div className="mb-2">
                        <label className="fw-bolder mb-0 fs-06 me-3 text-dark">Status:</label>
                        <span className="fs-06">{membresia?.statusMembresia?.nombre}</span>
                    </div>
                </Col>
                </Row>
                <Row>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Última visita:</label>
                            <span className="fs-06">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Primera visita:</label>
                            <span className="fs-06">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Térm. & Cond.</label>
                            <span className="fs-06 text-success fw-bold">Si</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span className="badge bg-attention text-attention-dark fs-08 cursor-pointer" style={{backgroundColor: '#F0BFD7'}}>
                            Ver como <i className="bx bx-face"></i>
                        </span>
                    </Col>
                </Row>
                </CardBody>                
            </Card>
        </>
    )
}

export default CardTitular