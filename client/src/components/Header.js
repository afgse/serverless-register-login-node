import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ( isLogin ) => {
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <LinkContainer to="/"><Button variant="outline-secondary">Application</Button></LinkContainer>
                </Col>
                <Col md={6} className="btn-group">
                    <LinkContainer to="/login"><Button variant="primary">Login</Button></LinkContainer>
                    <LinkContainer to="/register"><Button variant="primary">Register</Button></LinkContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;