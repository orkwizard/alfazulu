import MetaTags from "react-meta-tags";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, Label, Row, Input, FormFeedback, Alert } from "reactstrap";
import profile from "../../assets/images/profile-img2.png"
import logo from "../../assets/images/logo.png";

const Login = props => {
    const dispatch = useDispatch();
  
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        email: "demo@demo.com" || '',
        password: "123456" || '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (values) => {
        dispatch(loginUser(values, props.history));
      }
    });
  
    const { error } = useSelector(state => ({
      error: state.Login.error,
    }));
  
    return (
      <>
        <MetaTags>
          <title>Login | AlfaZulu - CRM</title>
        </MetaTags>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col lg="12">
                        <div className="position-relative">
                          <div className="position-absolute mt-2 ms-2">
                            <h4 className="text-white">Sistema de Administración</h4>
                            <h6 className="text-white">Identificate para acceder</h6>
                          </div>
                        </div>
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>                    
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4 position-absolute">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="72"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2 py-5">
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        {error ? <Alert color="danger">{error}</Alert> : null}
  
                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </div>
  
                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </div>
  
                        {/* <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div> */}
  
                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
  
                        {/* <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" />
                            Forgot your password?
                          </Link>
                        </div> */}
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  {/* <p>
                    Don&#39;t have an account ?{" "}
                    <Link to="/register" className="fw-medium text-primary">
                      {" "}
                      Signup now{" "}
                    </Link>{" "}
                  </p> */}
                  <p>
                    © {new Date().getFullYear()} AlfaZulu. Creado con{" "}
                    <i className="mdi mdi-heart text-danger" /> por Spheres
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };
  
  export default withRouter(Login);