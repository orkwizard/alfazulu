import classNames from "classnames";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router";
import { Card, CardBody, Col, Container, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Breadcrumbs from '../../components/common/Breadcrumb'
import classnames from "classnames";
import PartnerTabRenewal from "./PartnerTabRenewal";

const PartnerDetail = props =>{
    const [activeTab1, setactiveTab1] = useState("5");
    const {
        match: { params },
    } = props;

    useEffect(() => {
        console.log(params.id)
    }, [params]);

    const toggle1 = tab => {
        if (activeTab1 !== tab) {
          setactiveTab1(tab);
        }
    };

    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Detalle del socio | AlphaZulu CRM</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Socio" breadcrumbItem="Detalle del socio" />
                    <Row>
                        <Col ls="12">
                            <Card>
                                <CardBody>
                                    <Nav pills className="navtab-bg nav-justified nav-bg-info">
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classNames({
                                                active: activeTab1 === "5",
                                                
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("5");
                                                }}
                                            >
                                                View Renewals
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: activeTab1 === "6",
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("6");
                                                }}
                                            >
                                                View Coments
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: activeTab1 === "7",
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("7");
                                                }}
                                            >
                                                View Reservations
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: activeTab1 === "8",
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("8");
                                                }}
                                            >
                                                View Form Contact
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: activeTab1 === "9",
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("9");
                                                }}
                                            >
                                                Mail History
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                active: activeTab1 === "10",
                                                }, "nav-partner")}
                                                onClick={() => {
                                                toggle1("10");
                                                }}
                                            >
                                                New Contact Support
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={activeTab1} className="p-3 text-muted">
                                        <TabPane tabId="5">
                                            <Row>
                                                <Col sm="12">
                                                    <Label className="text-success font-weight-semibold">Renewal date: Dic/20/2022</Label>
                                                    <PartnerTabRenewal />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="6">
                                            <Row>
                                                <Col sm="12">
                                                    View Coments en desarrollo...
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="7">
                                            <Row>
                                                <Col sm="12">
                                                    View Reservations en desarrollo...
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="8">
                                            <Row>
                                                <Col sm="12">
                                                    View Form Contact en desarrollo...
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="9">
                                            <Row>
                                                <Col sm="12">
                                                    Mail History en desarrollo...
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="10">
                                            <Row>
                                                <Col sm="12">
                                                    New Contact Support en desarrollo...
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default withRouter(PartnerDetail);