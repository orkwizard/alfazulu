import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardFooter, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import avatar1 from "../../assets/images/users/avatar-1.jpg"
import { ERROR_SERVER } from "../../constant/messages"
import { getLicencia } from "../../helpers/backend_helper"
import SubmitingForm from "../Loader/SubmitingForm"

function CardTitular({partner, isActive, contractNumber}){
    const [cotitular, setCotitular] = useState('-')
    const [openModalContract, setOpenModalContract] = useState(false)
    const [loadData, setLoadData] = useState(false)
    const [contrato, setContrato] = useState({
        agreementUrl: null,
        authUrl: null,
        beneficiarioUrl: null,
        contractUrl: null,
        licenseUrl: null,
        promisoryUrl: null,
        villaUrl: null
    }) 

    useEffect(()=>{
        if(partner){
            let cot = partner.beneficiarios.filter(benef=>benef.cotitular);
            if(cot.length > 0){
                let nameCot = `${cot[0].informacionPersonal?.nombre} ${cot[0].informacionPersonal?.segundoNombre} ${cot[0].informacionPersonal?.primerApellido} ${cot[0].informacionPersonal?.segundoApellido}`
                setCotitular(nameCot)
            }
        }
    }, [partner])

    const downloadContrato = async () =>{
        setLoadData(true)
        try {
            let response = await getLicencia(contractNumber)
            setLoadData(false)
            if(response.state){
                setContrato({
                    agreementUrl: response.data.agreementUrl,
                    authUrl: response.data.authUrl,
                    beneficiarioUrl: response.data.beneficiarioUrl,
                    contractUrl: response.data.contractUrl,
                    licenseUrl: response.data.licenseUrl,
                    promisoryUrl: response.data.promisoryUrl,
                    villaUrl: response.data.villaUrl
                })
                setOpenModalContract(true)
            }else{
                toast.error(ERROR_SERVER)
            }
        } catch (error) {
            toast.error(ERROR_SERVER)
            setLoadData(false)
        }
    }

    return (
        <>
            {loadData && <SubmitingForm />}
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
                            <span className="fs-08">-</span>
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
                            <span className="fs-08">-</span>
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
                <CardFooter className="p-0">
                    {
                        isActive ? 
                        <Button block className="rounded-0" color="primary" onClick={downloadContrato}>
                            <i className="fas fa-download" />
                            <span className="d-block">Descargar contrato</span>
                        </Button> :
                        <div className="p-3 text-center">
                            <i className="fas fa-download" />
                            <span className="d-block">Descargar contrato</span>
                        </div>
                    }
                    
                </CardFooter>
            </Card>
            <Modal isOpen={openModalContract} toggle={() => setOpenModalContract(!openModalContract)} centered={true}>
                <ModalHeader toggle={() => setOpenModalContract(!openModalContract)} tag="h4">
                    Contratos
                </ModalHeader>
                <ModalBody className="py-3">
                    <Row>
                        <Col lg={12}>
                        <ul className="list-group list-group-flush">
                            {contrato.agreementUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.agreementUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">
                                        Contrato de acuerdo{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.authUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.authUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Autorización de pago{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.beneficiarioUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.beneficiarioUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Beneficiarios{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.contractUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.contractUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Contrato de adquisición{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.licenseUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.licenseUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Información de membresía{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.promisoryUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.promisoryUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Pagaré{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                            {contrato.villaUrl && 
                            <li className="list-group-item px-0">
                                <a 
                                    href={contrato.villaUrl} 
                                    className="text-secondary" 
                                    target="_blank" 
                                    rel="noreferrer">Opción de compra de villa{' '}
                                    <i className="bx bx-link-external"></i>
                                </a>
                            </li>}
                        </ul>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CardTitular