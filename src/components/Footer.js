import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navLinkedinIcon from '../assets/img/nav-linkedin-icon.svg';
import navGithubIcon from '../assets/img/nav-github-icon.svg';
import navEmailIcon from '../assets/img/nav-email-icon.svg';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container className="align-item-center">
                <Row>
                    <Col sm={6}>
                        <a href="#home"><img src={logo} alt="Logo"/></a>
                    </Col>
                    <Col sm={6} className="text-center text-sm-end"> {/* end aligned text on small viewport sizes */}
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer"><img src={navLinkedinIcon} alt="replace with github url:xxxx"/></a>
                            <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer"><img src={navGithubIcon} alt=""/></a>
                            <a href="mailto:jiangcordelia@gmail.com"><img src={navEmailIcon} alt=""/></a>
                        </div>
                        <p>© Cordelia Jiang, 2023</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}