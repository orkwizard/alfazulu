import { useEffect, useState } from "react"
import { Button, Col, Row } from "reactstrap"
import FormEditMembershipPartner from "./FormEditMembershipPartner"
import moment from "moment";
import { getDataFromRenovaciones } from "../../utils/Membership/getFechaFromRenovaciones";
import { formatDate } from "../../utils/Date/formatDate";
import { compareDate } from "../../utils/Date/compareDate";

function TabOneMembership({partner, isActive, setReload, setActivarUsuario, membresia, contractNumber}){
    const [showForm, setShowForm] = useState(false)
    const [reloadPartner, setReloadPartner] = useState(false)

    useEffect(()=>{
        if(reloadPartner){
            setReload(true)
            setReloadPartner(false)
        }
    }, [reloadPartner])
    
    return (

        <Row>
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        {
                            membresia?.renovaciones.length > 0 ? 
                            <span className={`fw-bolder ${compareDate(moment(getDataFromRenovaciones(membresia?.renovaciones, 'fechaRenovacion'), 'YYYY-MM-DD'), moment()) === "menor" ? "text-danger" : "text-success"}`}>
                                Fecha de renovación: {getDataFromRenovaciones(membresia?.renovaciones, 'fechaRenovacion').format("DD-MM-YYYY")}
                            </span> :
                            <span className={`fw-bolder`}>
                                Fecha de renovación: No disponible
                            </span>
                        }
                        
                    </div>
                    {(!showForm && isActive) &&
                    <div>
                        <button className="btn btn-pink-primary" onClick={e=>setShowForm(true)}>Editar</button>
                    </div>}
                </div>
            </Col>
            <Col xs="5" md="5">
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Número de contrato:</label>
                    <span>{contractNumber}</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Login ID:</label>
                    <span>{membresia?.loginId}</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Club:</label>
                    <span>{membresia?.club?.nombre}</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Anualidad:</label>
                    {/* <span>{getDataFromRenovaciones(membresia?.renovaciones, 'anualidad')} usd</span> */}
                    <span>{membresia?.club?.tarifaAnualidad} usd</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Fecha registro:</label>
                    <span>{moment(membresia?.fechaCreacion, "YYYY-MM-DD").format("DD-MM-YYYY")}</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Fecha que se procesó:</label>
                    <span>{membresia?.informacionMembresia?.fechaProcesable ? moment(membresia?.informacionMembresia?.fechaProcesable, "YYYY-MM-DD").format("DD-MM-YYYY") : '-'}</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Fecha activación:</label>                    
                    <span>{formatDate(getDataFromRenovaciones(membresia?.renovaciones, 'fechaActivacion'), "YYYY-MM-DD", "DD-MM-YYYY")}</span>
                    {!isActive && 
                    <Button
                      color="success"
                      outline
                      size="sm"
                      className="fw-bold d-block"
                      onClick={e=>setActivarUsuario(true)}
                    >Activar usuario
                    </Button>}
                </div>
            </Col>
            {
                showForm ? 
                <Col xs="7" md="7">
                    <FormEditMembershipPartner partner={partner} setShowForm={setShowForm} setReloadPartner={setReloadPartner}/>
                </Col> :
                <Col xs="7" md="7">
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Titular:</label>
                        {partner?.informacionPersonal && <span>{`${partner.informacionPersonal.nombre} ${partner.informacionPersonal.segundoNombre} ${partner.informacionPersonal.primerApellido} ${partner.informacionPersonal.segundoApellido}`}</span>}
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Direcciones:</label>
                        {
                            partner?.informacionPersonal?.direcciones && 
                            partner?.informacionPersonal.direcciones.map((item) => (
                                <div key={item.id}>
                                    <span>
                                        {`Calle: ${item.calle ?? '-'}, Ciudad: ${item.ciudad ?? '-'}, Estado: ${item.estado?.codigo ?? '-'}, País: ${item.pais?.nombre ?? '-'}, CP: ${item.codigoPostal ?? '-'}`}
                                        {' '}
                                        {
                                            item.activo ? 
                                            <i className="bx bx-check-circle text-success" title="Activo"></i> :
                                            <i className="mdi mdi-close-circle-outline text-danger" title="No está activo"></i>
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Idioma:</label>
                        {partner?.idioma && <span>{partner.idioma.nombre}</span>}
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Correos electrónicos:</label>
                        {
                            partner?.informacionPersonal && 
                            partner.informacionPersonal.correos.map(item=>(
                                <div key={item.id}>
                                    <span className="d-block">
                                        {item.correo}{' '}
                                        {
                                            item.principal ? 
                                            <i className="bx bx-check-circle text-success" title="Principal"></i> :
                                            <i className="mdi mdi-close-circle-outline text-danger" title="No es principal"></i>
                                        }
                                    </span>
                                </div>
                            ))
                        }                    
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Teléfonos:</label>
                        {
                            partner?.informacionPersonal?.telefonos.map((item, index)=>(
                                <div key={item.id}>
                                    <span className="d-block">
                                        {item.tipoTelefono.nombre}: {item.numero}{' '}
                                        {
                                            item.activo ? 
                                            <i className="bx bx-check-circle text-success" title="Activo"></i> :
                                            <i className="mdi mdi-close-circle-outline text-danger" title="No está activo"></i>
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mb-2">
                        <label className="fw-bold d-block fs-08 mb-0">Beneficiarios:</label>
                        {
                            partner?.beneficiarios.map((item, index)=>(
                                <div key={item.id} className={`${index > 0 ? 'line-break' : ''}`}>
                                    <span className="d-block">{item.cotitular && <strong>Cotitular</strong>}</span>
                                    <span className="d-block">{`${item.informacionPersonal.nombre} ${item.informacionPersonal.segundoNombre} ${item.informacionPersonal.primerApellido} ${item.informacionPersonal.segundoApellido}`}</span>
                                    <span className="d-block">Parentesco: {item.parentesco?.nombre}</span>
                                </div>
                            ))
                        }
                    </div>
                </Col>
            }
            
        </Row>
    )
}

export default TabOneMembership