import { Col, Row } from "reactstrap"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
  //import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
  
import { useRef } from "react";

function GlobalTable({columns, items,}){

    //test hay q pasarlo a global
    const { SearchBar } = Search;
    const pageOptions = {
        sizePerPage: 10,
        totalSize: 16, // replace later with size(users),
        custom: true,
    };

    const keyField= "id"
    //end data test
    return (
        <Row>
            <Col>
            {/* <ToolkitProvider
                keyField="id"
                data={ items }
                columns={ columns }
                search
            >
                {
                    props => (
                        <>
                            <Row className="mb-2">
                                <Col sm="4">
                                    <div className="search-box ms-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                        <SearchBar {...props.searchProps} />
                                        <i className="bx bx-search-alt search-icon" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12">
                                    <div className="table-responsive">
                                        <BootstrapTable
                                            keyField="id"
                                            {...props.baseProps}
                                            classes="table align-middle table-nowrap table-hover table-bg-info-light table-tbody-sm"
                                            bordered={false}
                                            striped={false}
                                            responsive
                                            data={ items } 
                                            columns={ columns }
                                            pagination={ paginationFactory() }
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                      )
                }
            </ToolkitProvider> */}
            {/* <BootstrapTable keyField='id' data={ items } columns={ columns } pagination={ paginationFactory() } /> */}
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
                                        {/* <Row className="mb-2">
                                            <Col sm="4">
                                                <div className="search-box ms-2 mb-2 d-inline-block">
                                                    <div className="position-relative">
                                                    <SearchBar {...toolkitProps.searchProps} />
                                                    <i className="bx bx-search-alt search-icon" />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row> */}
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