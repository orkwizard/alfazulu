import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Alert, Col, Row } from "reactstrap";
import { ERROR_SERVER } from "../../constant/messages";
import { getFacturasByMembresiaId } from "../../helpers/backend_helper";
import { formatNumber } from "../../utils/Number/numberFormat";
import SimpleLoad from "../Loader/SimpleLoad";
import Datatable from "../Tables/DataTable";

export default function ListFacturas({isActive, membresiaId}){
    const [response, setResponse] = useState({
        data: [],
        loading: true,
        error: false,
        text: ''
    });

    const columns  =[
        {
            text: "id",
            dataField: "id",
            sort: true,
            hidden: true,           
        },
        {
            text: "Número",
            dataField: "numero" 
        },
        {
            text: "Fecha emisión",
            dataField: "fechaEmision" 
        },
        {
            text: "Fecha vencimiento",
            dataField: "fechaVencimiento" 
        },
        {
            text: "Pago",
            dataField: "total",
            formatter: (cell) => ( <span>{formatNumber(cell)}</span>)
        },
        {
            text: "Estatus",
            dataField: "estatus",
            formatter: (cell) => {
                switch(cell){
                    case 'DRAFT':
                        return <span className="badge bg-info">{cell}</span>
                    case 'OVERDUE':
                        return <span className="badge bg-danger">{cell}</span>
                    case 'PAID':
                        return <span className="badge bg-success">{cell}</span>
                    default:
                        return <span className="">{cell}</span>
                }
                
            }
        },
    ]

    useEffect( () => {
        setResponse(prev=>({
            ...prev,
            loading: true
        }))
        //factura
        async function fetchGetFacturasAPI() {
            try{
                let response = await getFacturasByMembresiaId(membresiaId)
                console.log(response)
                if(response.state){
                    setResponse({
                        loading: false,
                        data:  response.data.response.map(item => ({id: item.numero, ...item})),
                        error: false,
                        text: ''
                    })
                }else{
                    setResponse({
                        loading: false,
                        data:  [],
                        error: true,
                        text: ERROR_SERVER
                    })
                }
            }catch(error){
                setResponse({
                    data: [],
                    loading: false,
                    error: true,
                    text: ERROR_SERVER
                })
            }
        }
        if (membresiaId) fetchGetFacturasAPI()
    }, [membresiaId])

    return (
        <Row>
            <Col lg="12">
                {
                    response.error &&
                    <Alert color="danger">{response.text}</Alert>
                }
                {
                    response.loading ?
                    <Row>
                        <Col xs="12" xl="12">
                            <SimpleLoad />
                        </Col>
                    </Row> :
                    !response.error && 
                    <Row>
                        <Col>
                            <Datatable
                                columns={columns}
                                itemsData={response.data} 
                                enableSearch={true}
                            />
                        </Col>
                    </Row>
                }
            </Col>
        </Row>
    );
}