import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import React from 'react';
import './experience.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiBootstrap, SiPhp, SiMysql, SiSqlite, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import colorSharp from "../assets/img/color-sharp.png";

export const Experience = () => {
    // const [mousePosition, setMousePosition] = useState({
    //     x: 0,
    //     y: 0
    // });

    // const [cursorVariant, setCursorVariant] = useState("default");

    // useEffect(() => {
    //     const mouseMove = e => {
    //         setMousePosition({
    //             x: e.clientX,
    //             y: e.clientY
    //         })
    //     }

    //     window.addEventListener("mousemove", mouseMove)

    //     return () => {
    //         window.removeEventListener("mousemove", mouseMove);
    //     }
    // }, []);

    // const variants = {
    //     default: {
    //         x: mousePosition.x - 16,
    //         y: mousePosition.y - 16
    //     },
    //     icon: {
    //         height: 100,
    //         width: 100,
    //         x: mousePosition.x - 50,
    //         y: mousePosition.y - 50,
    //         backgroundColor: "rgba(108, 157, 189, 1)",
    //         mixBlendMode: "color-dodge"
    //     }
    // }

    // const iconEnter = () => setCursorVariant("icon")
    // const iconExit = () => setCursorVariant("default")


    return (
        <section>
            <Container>
                <div className="container experience__container">
                    <h2>Programming & Design Skills</h2>
                    <div className='experience__content'>
                        <article className='experience__details'>
                            {/* <motion.div className = 'cursor' variants = {variants} animate = {cursorVariant} /> */}
                            <IoLogoHtml5 className='experience__details-icon'/>
                            <div>
                                <h5>HTML</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <IoLogoCss3 className='experience__details-icon'/>
                            <div>
                                <h5>CSS</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <DiJavascript className='experience__details-icon'/>
                            <div>
                                <h5>JavaScript</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiBootstrap className='experience__details-icon'/>
                            <div>
                                <h5>Bootstrap</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaReact className='experience__details-icon'/>
                            <div>
                                <h5>ReactJS</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaNodeJs className='experience__details-icon'/>
                            <div>
                                <h5>NodeJS</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaPython className='experience__details-icon'/>
                            <div>
                                <h5>Python</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <FaLaravel className='experience__details-icon'/>
                            <div>
                                <h5>Laravel</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiPhp className='experience__details-icon'/>
                            <div>
                                <h5>PHP</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiMysql className='experience__details-icon'/>
                            <div>
                                <h5>MySQL</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiSqlite className='experience__details-icon'/>
                            <div>
                                <h5>SQLite</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsGit className='experience__details-icon'/>
                            <div>
                                <h5>Git</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobexd className='experience__details-icon'/>
                            <div>
                                <h5>Adobe XD</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobephotoshop className='experience__details-icon'/>
                            <div>
                                <h5>Photoshop</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobeillustrator className='experience__details-icon'/>
                            <div>
                                <h5>Illustrator</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiAdobeindesign className='experience__details-icon'/>
                            <div>
                                <h5>InDesign</h5>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <SiArchicad className='experience__details-icon'/>
                            <div>
                                <h5>ArchiCad</h5>
                            </div>
                        </article>
                    </div>
                </div>
            </Container>
            <img className="background-image-left" src={colorSharp} />
        </section>
    )
}