import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Label, Row } from "reactstrap"
import { ERROR_SERVER } from "../../constant/messages";
import { postSendEmail } from "../../helpers/backend_helper"

function CardMembershipRequest({contractNumber}){


    const sendEmail = () =>{
        async function sendEmailAPI(){
            try{
                let response = postSendEmail(contractNumber);
                if(response.state){
                    toast.success("Correo electrónico enviado");
                }else{
                    toast.error(response.error.message)
                }
            }catch(error){
                console.log('error')
                toast.error(ERROR_SERVER)
            }            
        }
        sendEmailAPI();
    }

    return (
        <Card className="rounded-0">
            <CardBody>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <Label>Request</Label>
                            <select defaultValue="0" className="form-select">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="8" md="8">
                        <select defaultValue="0" className="form-select">
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </Col>
                    <Col xs="4" md="4">
                        <Button
                            color="secondary"
                            block
                            onClick={sendEmail}
                        >
                            Send
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}


export default CardMembershipRequest