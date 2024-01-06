import { Container } from 'react-bootstrap';
import React from 'react';
import './experience.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiBootstrap, SiPhp, SiMysql, SiSqlite, SiPostman, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import colorSharp from "../assets/img/color-sharp.png";

export const Experience = () => {
    var pos = document.documentElement;
    pos.addEventListener('mousemove', e =>{
        pos.style.setProperty('--x', e.clientX + 'px')
        pos.style.setProperty('--y', e.clientY + 'px')
    })

    return (
        <section className="skills" id="skills">
            <Container>
                <div className="spotlight"></div>
                <div className="container experience-container">
                    <div class="square"></div>
                    <h2>Programming & Design Skills</h2>
                    <div className='experience-content'>
                        <article className='experience-details'>
                            <FaReact className='experience-details-icon'/>
                            <div>
                                <h5>ReactJS</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <TbBrandThreejs className='experience-details-icon'/>
                            <div>
                                <h5>ThreeJS</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <DiJavascript className='experience-details-icon'/>
                            <div>
                                <h5>JavaScript</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiBootstrap className='experience-details-icon'/>
                            <div>
                                <h5>Bootstrap</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <IoLogoCss3 className='experience-details-icon'/>
                            <div>
                                <h5>CSS</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <IoLogoHtml5 className='experience-details-icon'/>
                            <div>
                                <h5>HTML</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <FaNodeJs className='experience-details-icon'/>
                            <div>
                                <h5>NodeJS</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <FaPython className='experience-details-icon'/>
                            <div>
                                <h5>Python</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <FaLaravel className='experience-details-icon'/>
                            <div>
                                <h5>Laravel</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiPhp className='experience-details-icon'/>
                            <div>
                                <h5>PHP</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiMysql className='experience-details-icon'/>
                            <div>
                                <h5>MySQL</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiSqlite className='experience-details-icon'/>
                            <div>
                                <h5>SQLite</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <BsGit className='experience-details-icon'/>
                            <div>
                                <h5>Git</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiPostman className='experience-details-icon'/>
                            <div>
                                <h5>Postman</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiAdobexd className='experience-details-icon'/>
                            <div>
                                <h5>Adobe XD</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiAdobephotoshop className='experience-details-icon'/>
                            <div>
                                <h5>Photoshop</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiAdobeillustrator className='experience-details-icon'/>
                            <div>
                                <h5>Illustrator</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiAdobeindesign className='experience-details-icon'/>
                            <div>
                                <h5>InDesign</h5>
                            </div>
                        </article>
                        <article className='experience-details'>
                            <SiArchicad className='experience-details-icon'/>
                            <div>
                                <h5>ArchiCad</h5>
                            </div>
                        </article>
                    </div>
                </div>
            </Container>
            <img className="background-image-left" src={colorSharp} alt='colorSharp'/>
        </section>
    )
}