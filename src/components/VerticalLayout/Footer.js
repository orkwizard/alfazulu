import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © AlphaZulu.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by Sphere
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
