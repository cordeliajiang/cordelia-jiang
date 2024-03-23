import { Container } from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react';
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
    pos.addEventListener('mousemove', e => {
        pos.style.setProperty('--x', e.clientX + 'px')
        pos.style.setProperty('--y', e.clientY + 'px')
    })


    const [containerHeight, setContainerHeight] = useState('auto');
    const [skillsMinHeight, setSkillsMinHeight] = useState('auto');
    const [sectionBackgroundHeight, setSectionBackgroundHeight] = useState('auto');

    const experienceContentRef = useRef(null);

    useEffect(() => {
        const containerDiv = document.querySelector('.experience-container');
        const contentDiv = document.querySelector('.experience-content');

        const updateHeights = () => {
            const contentHeight = contentDiv.clientHeight;
            const containerHeight = containerDiv.clientHeight;

            // when experience-content height exceeds experience-container div's height, add the amount exceeded to the height of experience-container
            // match the height of experience-container with the skills div
            if (contentHeight > containerHeight) {
                const heightDiff = contentHeight - containerHeight;
                setContainerHeight(containerHeight + heightDiff);
                setSkillsMinHeight(containerHeight + heightDiff);
            } else {
                setContainerHeight('auto');
                setSkillsMinHeight(containerHeight);
            }

            // update section-background div's height to match with the updated height of container div
            setSectionBackgroundHeight(containerHeight);
        };

        window.addEventListener('resize', updateHeights);
        updateHeights();

        return () => window.removeEventListener('resize', updateHeights);
    }, []); // run only once on component mount

    // const [containerHeight, setContainerHeight] = useState('auto');
    // const [skillsMinHeight, setSkillsMinHeight] = useState('auto');
    // const experienceContentRef = useRef(null);

    // useEffect(() => {
    //     const containerDiv = document.querySelector('.experience-container');
    //     const contentDiv = document.querySelector('.experience-content');

    //     const updateHeights = () => {
    //         const contentHeight = contentDiv.clientHeight;
    //         const containerHeight = containerDiv.clientHeight;

    //         if (contentHeight > containerHeight) {
    //             const heightDiff = contentHeight - containerHeight;
    //             setContainerHeight(containerHeight + heightDiff);
    //             setSkillsMinHeight(containerHeight + heightDiff);
    //         } else {
    //             setContainerHeight('auto');
    //             setSkillsMinHeight(containerHeight);
    //         }
    //     };

    //     window.addEventListener('resize', updateHeights);
    //     updateHeights();

    //     return () => window.removeEventListener('resize', updateHeights);
    // }, []);


    return (
        <div className='skills-wrapper'>
            <div className="section-background" style={{ minHeight: sectionBackgroundHeight }}></div>
            <section className="skills" id="skills" style={{ minHeight: skillsMinHeight }}>
                <Container>
                    <div className="spotlight"></div>
                    {/* <div className="square"></div> */}
                    <div className="experience-container" style={{ minHeight: containerHeight }}>
                        <h2>Skills</h2>
                        <div className='experience-content' ref={experienceContentRef}>
                            <article className='experience-details'>
                                <FaReact className='experience-details-icon' />
                                <h5>ReactJS</h5>
                            </article>
                            <article className='experience-details'>
                                <TbBrandThreejs className='experience-details-icon' />
                                <h5>ThreeJS</h5>
                            </article>
                            <article className='experience-details'>
                                <DiJavascript className='experience-details-icon' />
                                <h5>JavaScript</h5>
                            </article>
                            <article className='experience-details'>
                                <SiBootstrap className='experience-details-icon' />
                                <h5>Bootstrap</h5>
                            </article>
                            <article className='experience-details'>
                                <IoLogoCss3 className='experience-details-icon' />
                                <h5>CSS</h5>
                            </article>
                            <article className='experience-details'>
                                <IoLogoHtml5 className='experience-details-icon' />
                                <h5>HTML</h5>
                            </article>
                            <article className='experience-details'>
                                <FaNodeJs className='experience-details-icon' />
                                <h5>NodeJS</h5>
                            </article>
                            <article className='experience-details'>
                                <FaPython className='experience-details-icon' />
                                <h5>Python</h5>
                            </article>
                            <article className='experience-details'>
                                <FaLaravel className='experience-details-icon' />
                                <h5>Laravel</h5>
                            </article>
                            <article className='experience-details'>
                                <SiPhp className='experience-details-icon' />
                                <h5>PHP</h5>
                            </article>
                            <article className='experience-details'>
                                <SiMysql className='experience-details-icon' />
                                <h5>MySQL</h5>
                            </article>
                            <article className='experience-details'>
                                <SiSqlite className='experience-details-icon' />
                                <h5>SQLite</h5>
                            </article>
                            <article className='experience-details'>
                                <BsGit className='experience-details-icon' />
                                <h5>Git</h5>
                            </article>
                            <article className='experience-details'>
                                <SiPostman className='experience-details-icon' />
                                <h5>Postman</h5>
                            </article>
                            <article className='experience-details'>
                                <SiAdobexd className='experience-details-icon' />
                                <h5>Adobe XD</h5>
                            </article>
                            <article className='experience-details'>
                                <SiAdobephotoshop className='experience-details-icon' />
                                <h5>Photoshop</h5>
                            </article>
                            <article className='experience-details'>
                                <SiAdobeillustrator className='experience-details-icon' />
                                <h5>Illustrator</h5>
                            </article>
                            <article className='experience-details'>
                                <SiAdobeindesign className='experience-details-icon' />
                                <h5>InDesign</h5>
                            </article>
                            <article className='experience-details'>
                                <SiArchicad className='experience-details-icon' />
                                <h5>ArchiCad</h5>
                            </article>
                        </div>
                    </div>
                </Container>
                {/* <img className="background-image-left" src={colorSharp} alt='colorSharp' /> */}
            </section>
        </div>
    )
}