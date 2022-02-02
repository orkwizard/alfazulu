import { Col, Row } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next";


function SimpleTable({columns, items}){
    return (
        <Row>
            <Col>
                <div className="table-responsive">
                    <BootstrapTable 
                        keyField='id' 
                        data={ items } 
                        columns={ columns } 
                        bordered={false}
                        striped={false}
                        responsive
                        classes="table align-middle table-nowrap table-hover table-bg-info-light table-tbody-sm"
                        wrapperClasses="table-responsive"
                        noDataIndication="No hay información disponible"
                    />
                </div>
            </Col>
        </Row>
    )
}

export default SimpleTable