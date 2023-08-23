import { Container } from 'react-bootstrap';
import React from 'react';
import './experience.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { RiJavascriptFill } from 'react-icons/ri';
import { BsFillBootstrapFill, BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiPhp, SiMysql, SiSqlite, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import colorSharp from "../assets/img/color-sharp.png";

export const Experience = () => {
    return (
        <section id="experience">
            <Container>
                <div className="container experience__container">
                    <h3>Programming & Design Skills</h3>
                    <div className='experience__content'>
                        <article className='experience__details'>
                            <IoLogoHtml5 className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <IoLogoCss3 className='experience__details-icon'/>
                            <div>
                                <h4>CSS</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <RiJavascriptFill className='experience__details-icon'/>
                            <div>
                                <h4>JavaScript</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsFillBootstrapFill className='experience__details-icon'/>
                            <div>
                                <h4>Bootstrap</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaReact className='experience__details-icon'/>
                            <div>
                                <h4>ReactJS</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaNodeJs className='experience__details-icon'/>
                            <div>
                                <h4>NodeJS</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaPython className='experience__details-icon'/>
                            <div>
                                <h4>Python</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaLaravel className='experience__details-icon'/>
                            <div>
                                <h4>Laravel</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiPhp className='experience__details-icon'/>
                            <div>
                                <h4>PHP</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiMysql className='experience__details-icon'/>
                            <div>
                                <h4>MySQL</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiSqlite className='experience__details-icon'/>
                            <div>
                                <h4>SQLite</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsGit className='experience__details-icon'/>
                            <div>
                                <h4>Git</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobexd className='experience__details-icon'/>
                            <div>
                                <h4>Adobe XD</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobephotoshop className='experience__details-icon'/>
                            <div>
                                <h4>Photoshop</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobeillustrator className='experience__details-icon'/>
                            <div>
                                <h4>Illustrator</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobeindesign className='experience__details-icon'/>
                            <div>
                                <h4>InDesign</h4>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiArchicad className='experience__details-icon'/>
                            <div>
                                <h4>ArchiCad</h4>
                            </div>
                        </article>
                    </div>
                </div>
            </Container>
            <img className = "background-image-left" src={colorSharp}/>
        </section>
    )
}