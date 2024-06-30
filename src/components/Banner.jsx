import { React } from "react";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from '../assets/img/header-img.png';
import 'animate.css';
import './banner.css';
import TrackVisibility from "react-on-screen";

export const Banner = () => {
    return (
        <section className="banner" id="home">
            <div className="banner-container">
                <div className="banner-content">
                    <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn custom-fade-in" : "" }>
                                <h1 className="old-standard-tt-bold">{"Cordelia Jiang "}</h1>
                                <h3 className="great-vibes-regular">Front-end Developer</h3>
                                <a href="mailto:jiangcordelia@gmail.com"><button className="open-sans-semibold">Let's Connect<ArrowRightCircle size={25} /></button></a>
                            </div>}
                    </TrackVisibility>
                </div>
                <div className="banner-header-img">
                    <img src={headerImg} alt="Header Img"></img>
                </div>
            </div>
        </section>
    )
}