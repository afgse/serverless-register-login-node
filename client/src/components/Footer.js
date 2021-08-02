import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
    const time = new Date().toLocaleTimeString().toUpperCase()
    const date = new Date().toLocaleDateString()
    return (
        <Container>
            <Row className="center-block">
                Accessed : {date} {time}
            </Row>
        </Container>
    )
}

export default Footer;