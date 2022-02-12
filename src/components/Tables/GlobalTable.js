import { Col, Row } from "reactstrap"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
  //import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function GlobalTable({columns, items, selectRow}){

    //test hay q pasarlo a global
    const pageOptions = {
        sizePerPage: 10,
        totalSize: 16, // replace later with size(users),
        custom: true,
    };
    //end data test
    return (
        <Row>
            <Col>
                <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={columns}
                        data={items}
                >
                    {({ paginationProps, paginationTableProps }) => {
                        return (
                            <ToolkitProvider
                                keyField="id"
                                data={items}
                                columns={columns}
                                bootstrap4
                                search
                            >
                                 {toolkitProps => (
                                     <>
                                        <Row>
                                            <Col xl="12">
                                                <div className="table-responsive">
                                                <BootstrapTable
                                                    keyField="id"
                                                    {...toolkitProps.baseProps}
                                                    {...paginationTableProps}
                                                    classes="table align-middle table-nowrap table-hover table-bg-info-light table-tbody-sm"
                                                    bordered={false}
                                                    striped={false}
                                                    responsive
                                                    selectRow={selectRow}
                                                />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-md-center mt-30">
                                            <Col className="pagination pagination-rounded justify-content-end mb-2">
                                            <PaginationListStandalone
                                                {...paginationProps}
                                            />
                                            </Col>
                                        </Row>
                                     </>
                                 )}
                            </ToolkitProvider>
                        )
                    }}
                </PaginationProvider>
            </Col>
        </Row>
    )
}

export default GlobalTable