import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from '../assets/img/header-img.png';
import resume from '../assets/pdf/cordelia-jiang-frontend-developer-resume.pdf';
import 'animate.css';
import TrackVisibility from "react-on-screen";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0); // show words to display on screen based on index, index 0 is "Front-end Developer"
    const [isDeleting, setIsDeleting] = useState(false); // initial state is typing letter, not deleting
    const toRotate = [ "Front-end Developer", "Web Developer", "UX Developer" ];
    const [text, setText] = useState(''); // letter that is displaying
    const [delta, setDelta] = useState(300 - Math.random() * 100); // speed of next letter comes after previous letter is typed, deleting is faster than typing
    const period = 2000; // amount of time transitioning between each word
    
    /* this useEffect will run everytime the text gets updated */
    /* ticker function takes care of typing or deleting lettr and of the interval between text being updated */
    /* delta is the interval when tick function runs */
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    /* tick function */
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting){
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <span className="tagline">Portfolio</span>
                                <h1>{"Cordelia Jiang "}</h1>
                                <h1><span className="wrap">{text}</span></h1>
                                <a href = {resume} target = "_blank"><button>Resume<ArrowRightCircle size={25}/></button></a>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"></img>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}