import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from '../assets/img/header-img.svg';

export const Banner = () => {
    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Portfolio</span>
                        <h1>{"Cordelia Jiang"}<span className="wrap">Front-end Developer</span></h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur a mi a interdum. Donec eget libero ac libero fermentum viverra ac ut urna. Sed id purus dignissim, convallis neque eget, gravida augue. Phasellus ac vestibulum tellus. Mauris egestas scelerisque imperdiet. Donec suscipit dolor vel auctor posuere. Aliquam eget augue magna. Ut vel mollis sapien. Suspendisse pulvinar neque vel enim ultricies malesuada.</p>
                        <button onClick={() => console.log('Contact')}>Contact <ArrowRightCircle size={25}/></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"></img>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}