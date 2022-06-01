import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from "reactstrap"
import { ERROR_SERVER } from "../../constant/messages";
import { getEmailTemplatesTypes, postSendEmail, postSendListEmail } from "../../helpers/backend_helper"

function CardMembershipRequest({partner}){
    const [tipoCarta, setTipoCarta] = useState('')
    const [tipoCartaOpt, setTipoCartaOpt] = useState([])
    const [isSumiting, setIsSubmiting] = useState(false)
    const [email, setEmail] = useState('')
    const [sendTo, setSendTo] = useState([])

    useEffect(() => {
      async function getTipoCarta(){
          try{
            let response = await getEmailTemplatesTypes()
            if(response.state){
                const entries = Object.entries(response.data.response);
                setTipoCartaOpt(entries.map(e=>({label: e[1], value: e[0]})))
            }
          }catch(error){
              //
          }
      }
      getTipoCarta()
    }, [])
    
    const sendEmail = () =>{
        async function sendEmailAPI(){
            setIsSubmiting(true)
            try{               
                let query = `typeLetter=${tipoCarta}`
                const to = sendTo.join(",");
                let response = await postSendListEmail(partner.idMembresia, to, query);
                if(response.state){
                    toast.success(`Correo electrónico ${tipoCarta} enviado`);
                    setTipoCarta("")
                }else{
                    toast.error(response.error.message)
                }
                setIsSubmiting(false)
            }catch(error){
                toast.error(ERROR_SERVER)
                setIsSubmiting(false)
            }            
        }
        if(tipoCarta === ''){
            toast.error("Debes seleccionar una opción")
        }else if(sendTo.length === 0){
            toast.error("Debe agregar al menos un destinatario")
        }
        else{
            sendEmailAPI();
        }
    }

    const addDestinatario = () =>{
        if(email!=='') setSendTo(prev=>([...prev, email.replace(/ /g, "")]))
        setEmail('')
    }
    const deleteDestinatario = (index) => {
        let sendToTemp = [...sendTo];
        sendToTemp.splice(index, 1)
        setSendTo(sendToTemp);
    }

    return (
        <Card className="rounded-0">
            <CardBody>
                <Row>
                    <Col xs="12" md="12">
                        <div className="mb-3">
                            <Label>Enviar correo</Label>
                            <select 
                                value={tipoCarta}
                                className="form-select"
                                onChange={e=>setTipoCarta(e.target.value)}
                            >
                                <option value="">Seleccionar una opción</option>
                                {
                                    tipoCartaOpt.map(item=>(
                                        <option value={item.value} key={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs="12" md="12">
                        <div className="input-group mb-3">
                            <Input type="text" className="form-control" id="inputEmail" aria-describedby="inputEmail04" 
                                placeholder='Agregar destinatario'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                            <button className="btn btn-primary" type="button" id="inputEmail04" onClick={addDestinatario}><i className='bx bx-plus-medical'></i></button>
                          </div>
                    </Col>
                    {
                        sendTo.length > 0 &&
                        <ul className='list-unstyled mb-3'>
                            {
                                sendTo.map((item, index)=>(
                                    <li key={index} className="mb-1">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className='badge badge-soft-dark'>{item}</span>
                                            <i className='bx bx-trash text-danger text-right' onClick={e=>deleteDestinatario(index)}></i>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </Row>
                <Row>
                    <Col xs="12" md="12">
                        <Button
                            color="secondary"
                            block
                            onClick={sendEmail}
                        >
                           {
                               isSumiting ? <Spinner color="dark" size="sm" /> :
                               'Enviar'
                            }
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}


export default CardMembershipRequest