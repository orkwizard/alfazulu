import classNames from "classnames";
import { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import { Button, Card, CardBody, Col, Collapse, Container, Label, Row, Input } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import GlobalTable from "../../components/Tables/GlobalTable";
import SimpleTable from "../../components/Tables/SimpleTable";
import dataPartner from '../../data/partner.json'
import PartnerModal from "./PartnerModal";


const PartnerList = props => {
    const [items, setItems] = useState(dataPartner)
    const [accordionSearch, setAccordionSearch] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const columns = [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
        },
        {
          text: "Login ID",
          dataField: "loginID",
          formatter: (cell, row) => <Link to={`partner-detail/${row.id}`} className="text-dark"><u><strong>{cell}</strong></u></Link>          
        },
        {
            text: "Contract Number",
            dataField: "contractNumber",          
        },
        {
            text: "Name",
            dataField: "name",          
        },
        {
            text: "Last Name",
            dataField: "lastName",          
        },
        {
            text: "Creation Date",
            dataField: "creationDate",          
        },
        {
            text: "Activation Date",
            dataField: "activationDate",          
        },
        {
            text: "Renewal Date",
            dataField: "renewalDate",
            formatter: (cell, row) => (
                row.id === 2 ? <strong className="text-success">{cell}</strong> :
                               <strong className="text-danger">{cell}</strong> 
            )          
        },
        {
            text: "Company",
            dataField: "company",          
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            // eslint-disable-next-line react/display-name
            formatter: () => <button className="btn-rounded btn btn-primary btn-sm" onClick={e=>setShowModal(true)}>View details</button>,
          },
      ];

    return (
        <>
          
          <div className="page-content">
            <MetaTags>
              <title>Partner List | AlfaZulu CRM</title>
            </MetaTags>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="Partner" breadcrumbItem="Partner List" />
              <Row className="mb-2">
                  <Col lg="12">
                      <Card>
                        <CardBody className="p-0">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFlushOne">
                                    <button
                                    className={classNames(
                                        "accordion-button",
                                        "fw-medium",
                                        { collapsed: !accordionSearch }
                                    )}
                                    type="button"
                                    onClick={()=>setAccordionSearch(!accordionSearch)}
                                    style={{ cursor: "pointer" }}
                                    >
                                    Search
                                    </button>
                                </h2>

                                <Collapse isOpen={accordionSearch} className="accordion-collapse">
                                    <div className="accordion-body">
                                        <Row>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="loginID">Login ID:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="loginID"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="contractNumber">Contract Number:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="contractNumber"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="name">Name:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="lastName">Last Name:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="email">Email:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="phoneNumber">Phone Number:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                />
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="creationDate">Creation Date:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="creationDate"
                                                />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="card-title">Auto sizing</div>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <Label htmlFor="company">Company:</Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="company"
                                                />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>                                            
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <div className="card-title">Estatus:</div>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="estatusOption"
                                                            id="activeMembership"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="activeMembership"
                                                        >
                                                        Active membership
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="estatusOption"
                                                            id="expireMember"
                                                            value="option2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="expireMember"
                                                        >
                                                        Expire member
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={3} xs='6'>
                                                <div className="mb-3">
                                                <div className="card-title">Etapas:</div>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="etapasOption"
                                                            id="tutorials"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="tutorials"
                                                        >
                                                        Tutorials
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="etapasOption"
                                                            id="welcomeCall"
                                                            value="option2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="welcomeCall"
                                                        >
                                                        Welcome Call
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12">
                                                <div className="text-sm-end">
                                                    <Button
                                                        color="primary"
                                                        className="font-16 btn-block btn btn-primary"
                                                        onClick={()=>console.log('buscar')}
                                                    >
                                                        <i className="mdi mdi-magnify me-1" />
                                                        Search
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Collapse>
                                </div>
                            </div>
                        </CardBody>
                      </Card>
                  </Col>
              </Row>
              <Row>
                  <Col lg="12">
                      <Card>
                          <CardBody>
                            {/* <Row className="mb-2">
                                <Col sm="12">
                                    <div className="text-sm-end">
                                        <Button
                                            color="primary"
                                            className="font-16 btn-block btn btn-primary"
                                            onClick={()=>console.log('ok create')}
                                        >
                                            <i className="mdi mdi-plus-circle-outline me-1" />
                                            Create New Partner
                                        </Button>
                                    </div>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col xl="12">                                    
                                    <GlobalTable
                                        columns={columns}
                                        items={items} 
                                    />
                                </Col>
                            </Row>
                          </CardBody>
                      </Card>
                  </Col>
              </Row>
            </Container>
          </div>
          <PartnerModal 
            showModal={showModal}
            setShowModal={setShowModal}
          />  
        </>
      );
}

export default withRouter(PartnerList);