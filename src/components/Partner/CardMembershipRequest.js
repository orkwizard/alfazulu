import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Label, Row, Spinner } from "reactstrap"
import { ERROR_SERVER } from "../../constant/messages";
import { getEmailTemplatesTypes, postSendEmail } from "../../helpers/backend_helper"

function CardMembershipRequest({partner}){
    const [tipoCarta, setTipoCarta] = useState('')
    const [tipoCartaOpt, setTipoCartaOpt] = useState([])
    const [isSumiting, setIsSubmiting] = useState(false)

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
                let response = await postSendEmail(partner.idMembresia, query);
                if(response.state){
                    toast.success(`Correo electrónico ${tipoCarta} enviado`);
                    setTipoCarta("")
                }else{
                    toast.error(response.error.message)
                }
                setIsSubmiting(false)
            }catch(error){
                console.log('error')
                toast.error(ERROR_SERVER)
                setIsSubmiting(false)
            }            
        }
        if(tipoCarta === ''){
            toast.error("Debes seleccionar una opción")
        }else{
            sendEmailAPI();
        }
        
    }

    return (
        <Card className="rounded-0">
            <CardBody>
                <Row>
                    <Col>
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
                               'Send'
                            }
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}


export default CardMembershipRequest