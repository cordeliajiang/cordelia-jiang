import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from '../assets/img/header-img.png';
import resume from '../assets/pdf/cordelia-jiang-frontend-developer-resume.pdf';
import 'animate.css';
import './banner.css';
import TrackVisibility from "react-on-screen";

export const Banner = () => {
    // const [flip, setFlip] = useState(false);
    // const fadeAnim = useSpring({
    //     to: { opacity: 1 },
    //     from: { opacity: 0 },
    //     reset: true,
    //     reverse: flip,
    //     delay: 200,
    //     onRest: () => setFlip(!flip),
    // });

    return(
        <section className="banner" id="home">
            <Container>
                <Row>
                    <Col>
                        <div className="banner-content">
                            <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h1>{"Cordelia Jiang "}</h1>
                                    <h3><span className="wrap"> Front-end Developer </span></h3>
                                    <a href = {resume} target = "_blank"><button>Resume<ArrowRightCircle size={25}/></button></a>
                                </div>}
                            </TrackVisibility>
                        </div>
                    </Col>
                    <Col>
                        <img src={headerImg} alt="Header Img"></img>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}