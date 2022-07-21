
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Button, Col, Container, Modal, ModalHeader, Row, Input, ModalBody, Table, ModalFooter } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import TopActionDashboard from "../../components/Dashboard/TopActionDashboard";
import TopLLamadas from "../../components/Dashboard/TopLLamadas";
import ProductivityChart from "../../components/Dashboard/ProductivityChart";

//Import Breadcrumb
import Breadcrumbs from "../../components/common/Breadcrumb";


const Dashboard = props => {
    const [modal, setmodal] = useState(false);
    const [subscribemodal, setSubscribemodal] = useState(false);
  
  
    useEffect(() => {
      setTimeout(() => {
        //setSubscribemodal(true);
      }, 2000);
    }, []);
  
    return (
      <>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | AlphaZulu - CRM</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={'Dashboards'}
              breadcrumbItem={"Dashboard"}
            />

            <Row>
              <Col>
                <TopActionDashboard />
              </Col>
            </Row>

            {/* <Row>
              <TopLLamadas />

              <ProductivityChart />
            </Row> */}
  
            {/* <Row>
              <Col xl="4">
                <WelcomeComp />
              </Col>
            </Row> */}
  
            <Row>
              <Col xl="4">
                {/* <SocialSource /> */}
              </Col>
              <Col xl="4">
                {/* <ActivityComp /> */}
              </Col>
  
              <Col xl="4">
                {/* <TopCities /> */}
              </Col>
            </Row>
  
            <Row>
              <Col lg="12">
                {/* <LatestTranaction /> */}
              </Col>
            </Row>
          </Container>
        </div>
  
        {/* subscribe ModalHeader */}
        <Modal
          isOpen={subscribemodal}
          role="dialog"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={() => {
            setSubscribemodal(!subscribemodal);
          }}
        >
          <div>
            <ModalHeader
              className="border-bottom-0"
              toggle={() => {
                setSubscribemodal(!subscribemodal);
              }}
            ></ModalHeader>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-light  rounded-circle text-primary h1">
                  <i className="mdi mdi-email-open"></i>
                </div>
              </div>
  
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <h4 className="text-primary">Subscribe !</h4>
                  <p className="text-muted font-size-14 mb-4">
                    Subscribe our newletter and get notification to stay update.
                  </p>
  
                  <div
                    className="input-group rounded bg-light"
                  >
                    <Input
                      type="email"
                      className="form-control bg-transparent border-0"
                      placeholder="Enter Email address"
                    />
                    <Button color="primary" type="button" id="button-addon2">
                      <i className="bx bxs-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
  
        <Modal
          isOpen={modal}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabIndex="-1"
          toggle={() => {
            setmodal(!modal);
          }}
        >
          <div>
            <ModalHeader
              toggle={() => {
                setmodal(!modal);
              }}
            >
              Order Details
            </ModalHeader>
            <ModalBody>
              <p className="mb-2">
                Product id: <span className="text-primary">#SK2540</span>
              </p>
              <p className="mb-4">
                Billing Name: <span className="text-primary">Neal Matthews</span>
              </p>
  
              <div className="table-responsive">
                <Table className="table table-centered table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage1} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Wireless Headphone (Black)
                          </h5>
                          <p className="text-muted mb-0">$ 225 x 1</p>
                        </div>
                      </td>
                      <td>$ 255</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage2} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Hoodie (Blue)
                          </h5>
                          <p className="text-muted mb-0">$ 145 x 1</p>
                        </div>
                      </td>
                      <td>$ 145</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-end">Sub Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-end">Shipping:</h6>
                      </td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-end">Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={() => {
                  setmodal(!modal);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </>
    );
};

export default withTranslation()(Dashboard);