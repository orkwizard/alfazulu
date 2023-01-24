import moment from "moment"
import { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import avatar1 from "../../assets/images/users/avatar-default.jpg"
import { compareDate } from "../../utils/Date/compareDate"
import { getDataFromRenovaciones } from "../../utils/Membership/getFechaFromRenovaciones"

function CardTitular({partner, isActive, contractNumber, membresia}){
    const [cotitular, setCotitular] = useState('-')
    const [correo, setCorreo] = useState(null)
    const [telefonos, setTelefonos] = useState([])
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
        console.log(partner)
        if(partner?.informacionPersonal?.correos.filter(e=>e.principal === true).length > 0){
            setCorreo(partner?.informacionPersonal?.correos.filter(e=>e.principal === true)[0].correo)
        }
        if(partner?.informacionPersonal?.telefonos.filter(e=>e.activo === true).length > 0){
            setTelefonos(partner?.informacionPersonal?.telefonos?.filter(e=>e.activo === true)?.map(it=>it.numero))
        }
        
    }, [partner])

    
    return (
        <>
            <Card className="overflow-hidden rounded-0">
                <div className={`${isActive ? 'bg-primary' : 'bg-secondary'} bg-soft`}>
                    <Row>
                        <Col sm="4">
                            <div className={`${isActive ? 'text-primary' : 'text-secondary'} p-3`}>
                                {
                                    membresia?.club?.imagen ?
                                    <img
                                        src={`https://generico.vacancyrewards.com/imgUPLOAD/${membresia?.club?.imagen}`}
                                        alt=""
                                        className="img-thumbnail rounded-circle img-adjust-socio"
                                    /> :
                                    <img
                                        src={avatar1}
                                        alt=""
                                        className="img-thumbnail rounded-circle"
                                    />

                                }
                                
                            </div>
                        </Col>
                    </Row>
                </div>
                <CardBody className="pt-2">
                <Row className="mb-2">
                    <Col xs="12" md="6">
                        <label className="fw-bolder mb-0  d-block text-dark">Titular:</label>
                        {
                            partner?.informacionPersonal && 
                            <span className="">
                                {`${partner.informacionPersonal.nombre} ${partner.informacionPersonal.segundoNombre} ${partner.informacionPersonal.primerApellido} ${partner.informacionPersonal.segundoApellido}`}
                            </span> 
                        }
                    </Col>
                    <Col xs="12" md="6">
                        <label className="fw-bolder mb-0  d-block text-dark">Co-titular:</label>
                        <span className="">{cotitular}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0  d-block text-dark">Correo electrónico:</label>
                            {correo ? <span className=" text-primary">{correo}</span> : <span className="">No tiene</span>}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0  d-block text-dark">Teléfono:</label>
                            {
                                telefonos?.length === 0 ? <span className="">No tiene</span> :
                                telefonos.map((it, idx)=>(
                                    <span className="badge bg-light">{it}</span>
                                ))
                            }                            
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-2">
                            <label className="fw-bolder mb-0 me-1 text-dark">Fecha de renovación:</label>
                            {membresia?.renovaciones.length > 0 && <span className={`fw-bolder ${compareDate(moment(getDataFromRenovaciones(membresia?.renovaciones, 'fechaRenovacion'), 'YYYY-MM-DD'), moment()) === "menor" ? "text-danger" : "text-success"}`}>{getDataFromRenovaciones(membresia?.renovaciones, 'fechaRenovacion').format("DD-MM-YYYY")}</span>}
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <div className="mb-2">
                        <label className="fw-bolder mb-0  me-3 text-dark">Status:</label>
                        <span className="">{membresia?.statusMembresia?.nombre}</span>
                    </div>
                </Col>
                </Row>
                <Row>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0  d-block text-dark">Última visita:</label>
                            <span className="">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0  d-block text-dark">Primera visita:</label>
                            <span className="">-</span>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="mb-2">
                            <label className="fw-bolder mb-0  d-block text-dark">Térm. & Cond.</label>
                            <span className=" text-success fw-bold">Si</span>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <span className="badge bg-attention text-attention-dark fs-08 cursor-pointer" style={{backgroundColor: '#F0BFD7'}}>
                            Ver como <i className="bx bx-face"></i>
                        </span>
                    </Col>
                </Row> */}
                </CardBody>                
            </Card>
        </>
    )
}

export default CardTitular