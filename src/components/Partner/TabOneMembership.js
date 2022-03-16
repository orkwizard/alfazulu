import { Col, Row } from "reactstrap"

function TabOneMembership({partner}){


    return (

        <Row>
            <Col md="12" xs="12">
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        <span className="fw-bolder text-danger">Fecha de renovación: -</span>
                    </div>
                    <div>
                        <button className="btn btn-pink-primary">Editar</button>
                    </div>
                </div>
            </Col>
            <Col xs="6" md="6">
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Número de contrato:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Login ID:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Precio:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Fecha compra:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Años comprada:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Número de semanas compradas:</label>
                    <span>-</span>
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Vendida por el asesor:</label>
                    <span>-</span>
                </div>
            </Col>
            <Col xs="6" md="6">
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Información del socio:</label>
                    {partner.informacionPersonal && <span>{`${partner.informacionPersonal.nombre} ${partner.informacionPersonal.segundoNombre} ${partner.informacionPersonal.primerApellido} ${partner.informacionPersonal.segundoApellido}`}</span>}
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Dirección:</label>
                    {
                        partner.direcciones && 
                        partner.direcciones.map((item) => (
                            <div key={item.id}>
                                <span className="d-block">Calle: {item.calle}</span>
                                <span className="d-block">CP: {item.codigoPostal}</span>
                                <span className="d-block">Activa: {item.activo ? 'Si' : 'No'}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Idioma:</label>
                    {partner.idioma && <span>{partner.idioma.nombre}</span>}
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Correos electrónicos:</label>
                    {
                        partner.informacionPersonal && 
                        partner.informacionPersonal.correos.map(item=>(
                            <div key={item.id}>
                                <span className="d-block">{item.correo}</span>
                                <span className="d-block">Principal: {item.principal ? 'Si' : 'No'}</span>
                            </div>
                        ))
                    }                    
                </div>
                <div className="mb-2">
                    <label className="fw-bold d-block fs-08 mb-0">Teléfonos:</label>
                    {
                        partner.informacionPersonal.telefonos.map((item, index)=>(
                            <div key={item.id} className={`${index > 0 ? 'line-break' : ''}`}>
                                <span className="d-block">{item.tipoTelefono.nombre}: {item.numero}</span>
                                <span className="d-block">Acivo: {item.activo ? 'Si' : 'No'}</span>
                            </div>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}

export default TabOneMembership