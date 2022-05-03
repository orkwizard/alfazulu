import { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import avatar1 from "../../assets/images/users/avatar-1.jpg"

function CardTitular({partner, isActive, contractNumber, membresia}){
    const [cotitular, setCotitular] = useState('-')
    

    useEffect(()=>{
        if(partner){
            let cot = partner.beneficiarios.filter(benef=>benef.cotitular);
            if(cot.length > 0){
                let nameCot = `${cot[0].informacionPersonal?.nombre} ${cot[0].informacionPersonal?.segundoNombre} ${cot[0].informacionPersonal?.primerApellido} ${cot[0].informacionPersonal?.segundoApellido}`
                setCotitular(nameCot)
            }
        }
    }, [partner])

    
    return (
        <>
            <Card className="overflow-hidden rounded-0">
                <div className={`${isActive ? 'bg-primary' : 'bg-secondary'} bg-soft`}>
                    <Row className="mb-4">
                        <Col>
                            <div className={`${isActive ? 'text-primary' : 'text-secondary'} p-3`}>
                                <p className="mb-1">Información del socio:</p>
                                {
                                    partner?.informacionPersonal && 
                                    <h6 className={`${isActive ? 'text-primary' : 'text-secondary'}`}>
                                        {`${partner.informacionPersonal.nombre} ${partner.informacionPersonal.segundoNombre} ${partner.informacionPersonal.primerApellido} ${partner.informacionPersonal.segundoApellido}`}
                                    </h6> 
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                <CardBody className="pt-0">
                <Row>
                    <Col sm="4">
                        <div className="avatar-md profile-user-wid mb-4">
                            <img
                            src={avatar1}
                            alt=""
                            className="img-thumbnail rounded-circle"
                            />
                        </div>                
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Núm. de contrato:</label>
                            <span className="fs-08">{contractNumber}</span>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Fecha de renovación:</label>
                            <span className="fs-08">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Última visita:</label>
                            <span className="fs-08">-</span>
                            <span className="badge bg-attention text-attention-dark fs-08 cursor-pointer">Ver como</span>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Co-titular:</label>
                            <span className="fs-08">{cotitular}</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Status:</label>
                            <span className="fs-08">{membresia?.statusMembresia?.nombre}</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Primera visita:</label>
                            <span className="fs-08">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 fs-06 d-block text-dark">Térm. & Cond.</label>
                            <span className="fs-08 text-success">-</span>
                        </div>
                    </Col>
                </Row>
                </CardBody>                
            </Card>
        </>
    )
}

export default CardTitular