import { React } from "react";
import linkedinIcon from '../assets/img/nav-linkedin-icon.svg';
import githubIcon from '../assets/img/nav-github-icon.svg';
import emailIcon from '../assets/img/nav-email-icon.svg';

import headerImg from '../assets/img/header-img.webp';
import 'animate.css';
import './banner.css';
import TrackVisibility from "react-on-screen";

const Banner = () => {
    return (
        <section className="banner" id="home">
            <div className="banner-container">
                <div className="banner-content">
                    <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn custom-fade-in" : ""}>
                                <h1 className="old-standard-tt-bold">{"Cordelia Jiang "}</h1>
                                <h3 className="cormorant-garamond-light">Fullstack / DevSecOps Engineer</h3>
                                <div className="social-icons">
                                    {/* Render social icons */}
                                    <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer">
                                        <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                                    </a>
                                    <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer">
                                        <img src={githubIcon} alt="GitHub" className="social-icon" />
                                    </a>
                                    <a href="mailto:jiangcordelia@gmail.com">
                                        <img src={emailIcon} alt="Email" className="social-icon" />
                                    </a>
                                </div>
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

export default Banner;