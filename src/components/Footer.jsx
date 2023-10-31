import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navLinkedinIcon from '../assets/img/nav-linkedin-icon.svg';
import navGithubIcon from '../assets/img/nav-github-icon.svg';
import navEmailIcon from '../assets/img/nav-email-icon.svg';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <div className="footer-container">
                    <Col sm={6}>
                        <div id="footer-logo">
                            <a href="#home">
                                <img src={logo} alt="Logo"/>
                            </a>
                        </div>
                    </Col>
                    <Col sm={6}> {/* end aligned text on small viewport sizes */}
                        <div className="footer-content">
                            <Row>
                                <div className="footer-social-icon">
                                    <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer"><img src={navLinkedinIcon} alt="replace with github url:xxxx"/></a>
                                    <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer"><img src={navGithubIcon} alt=""/></a>
                                    <a href="mailto:jiangcordelia@gmail.com"><img src={navEmailIcon} alt=""/></a>
                                </div>
                            </Row>
                            <Row>
                                <p>© Cordelia Jiang, 2023</p>
                            </Row>
                        </div>
                    </Col>
                </div>
            </Container>
        </footer>
    )
}