import { useState } from "react";
import { Col, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import CardPartner from "../Partner/CardPartner";
import CondominioCotizador from "./condos/CondominioCotizador";

export default function OffCanvasCotizador({open, setOpen, partner}){
    const togglePreviewPDF = () => setOpen(!open)
    const [customActiveTab, setcustomActiveTab] = useState("1");

    const toggleCustom = tab => {
        if (customActiveTab !== tab) {
          setcustomActiveTab(tab);
        }
    };

    return (
        <Offcanvas 
            isOpen={open} 
            toggle={togglePreviewPDF} 
            direction="end"
            scrollable
            className="w-100"
            backdrop={false}
        >
            <OffcanvasHeader toggle={togglePreviewPDF} className="bg-light">
                Cotizador
            </OffcanvasHeader>
            <OffcanvasBody>
                <Row className="mt-2 mb-4">
                    <Col>
                        <CardPartner partner={partner}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Nav tabs className="nav-tabs-custom nav-justified">
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                    active: customActiveTab === "1",
                                    })}
                                    onClick={() => {
                                    toggleCustom("1");
                                    }}
                                >
                                    <span className="d-block d-sm-none">
                                    <i className="fas fa-laptop-house"></i>
                                    </span>
                                    <span className="d-none d-sm-block">Condominios</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent
                            activeTab={customActiveTab}
                            className="p-3 text-muted"
                        >
                            <TabPane tabId="1">
                                <CondominioCotizador />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>                    
            </OffcanvasBody>
        </Offcanvas>
    )

}