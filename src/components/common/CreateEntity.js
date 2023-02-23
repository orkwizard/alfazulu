import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

export default function CreateEntity({text, link}){

    return (
        <Row className="mb-2">
            <Col className="text-end">
                <Link to={link} className="btn btn-sm btn-primary">{text}</Link>
            </Col>
        </Row>
    )
}