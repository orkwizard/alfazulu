import { useEffect, useState } from "react"
import { Alert, Col, Row } from "reactstrap";
import { ERROR_SERVER } from "../../constant/messages";
import { getLicencia } from "../../helpers/backend_helper";
import SimpleLoad from "../Loader/SimpleLoad";

function TabFiveMembership({isActive, contractNumber}){
    const [loadData, setLoadData] = useState(false)
    const [contrato, setContrato] = useState({
        agreementUrl: null,
        authUrl: null,
        beneficiarioUrl: null,
        contractUrl: null,
        licenseUrl: null,
        promisoryUrl: null,
        villaUrl: null,
        error: null
    })

    useEffect(()=>{
        setLoadData(true)
        async function fetchContratosAPi(){
            try{
                let response = await getLicencia(contractNumber)
                setLoadData(false)
                if(response.state){
                    setContrato((prev) => ({
                        ...prev,
                        agreementUrl: response.data.agreementUrl,
                        authUrl: response.data.authUrl,
                        beneficiarioUrl: response.data.beneficiarioUrl,
                        contractUrl: response.data.contractUrl,
                        licenseUrl: response.data.licenseUrl,
                        promisoryUrl: response.data.promisoryUrl,
                        villaUrl: response.data.villaUrl
                    }))
                }
            }catch(error){
                setLoadData(false)
                setContrato((prev) => ({
                    ...prev,
                    error: ERROR_SERVER
                }))
            }
            
        }
        fetchContratosAPi()
    },[contractNumber]);

    return (
        <Row>
            <Col xs="12" md="12">
                {
                    loadData ?
                    <Row>
                        <Col xs="12" xl="12">
                            <SimpleLoad />
                        </Col>
                    </Row> :
                    <Row>
                        <Col xl="12"> 
                            {
                                contrato.error && 
                                <Alert color="danger">{contrato.error}</Alert>
                            }
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
                }
            </Col>
        </Row>
    );
}

export default TabFiveMembership