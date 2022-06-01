import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Col, Row } from "reactstrap";

function Datatable({columns, itemsData, enableSearch}){

    const pageOptions = {
        sizePerPage: 10,
        totalSize: itemsData.length, // replace later with size(customers),
        custom: true,
    }

    const { SearchBar } = Search;

    return (
        <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField='id'
            columns={columns}
            data={itemsData}
            >
            {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                keyField='id'
                columns={columns}
                data={itemsData}
                search
                >
                {toolkitProps => (
                    <>
                        {enableSearch && <Row className="mb-2">
                            <Col md="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                                <div className="position-relative">
                                <SearchBar
                                    {...toolkitProps.searchProps}
                                    placeholder="Buscar"
                                />
                                <i className="bx bx-search-alt search-icon" />
                                </div>
                            </div>
                            </Col>
                        </Row>}

                        <Row>
                            <Col xl="12">
                            <div className="table-responsive">
                                <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                classes={
                                    "table align-middle table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                />

                            </div>
                            </Col>
                        </Row>

                        <Row className="align-items-md-center mt-30">
                            <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                                <SizePerPageDropdownStandalone
                                {...paginationProps}
                                />
                            </div>
                            <div className="text-md-right ms-auto">
                                <PaginationListStandalone
                                {...paginationProps}
                                />
                            </div>
                            </Col>
                        </Row>
                    </>
                )
                }
                </ToolkitProvider>
            )
            }
        </PaginationProvider>
    )

}

export default Datatable