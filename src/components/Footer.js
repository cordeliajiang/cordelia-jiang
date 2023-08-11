import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo2.png";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container className="align-item-center">
                <Row>
                    <Col sm={6}>
                        <img src={logo} alt="Logo" />
                    </Col>
                    <Col sm={6} className="text-center text-sm-end"> {/* end aligned text on small viewport sizes */}
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="replace with github url:xxxx"/></a>
                            <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt=""/></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt=""/></a>
                        </div>
                        <p>© Cordelia Jiang, 2023</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}