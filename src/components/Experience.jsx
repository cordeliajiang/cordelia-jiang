import React, { useRef, useState, useEffect } from 'react';
import './experience.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiBootstrap, SiPhp, SiMysql, SiSqlite, SiPostman, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

export const Experience = () => {
    const [containerHeight, setContainerHeight] = useState('auto');
    const [skillsHeight, setSkillsHeight] = useState('auto');
    const experienceContentRef = useRef(null);

    useEffect(() => {
        const containerDiv = document.querySelector('.experience-container');
        const contentDiv = document.querySelector('.experience-content');

        const updateHeights = () => {
            const contentHeight = contentDiv.clientHeight;
            const containerHeight = containerDiv.clientHeight;

            // when experience-content height exceeds experience-container div's height, add the amount exceeded to the height of experience-container
            const heightDiff = contentHeight - containerHeight;
            setContainerHeight(contentHeight > containerHeight ? containerHeight + heightDiff : 'auto');

            // update skills div's height to match with the updated height of experience-container div
            setSkillsHeight(containerHeight);
        };

        window.addEventListener('resize', updateHeights);
        updateHeights();

        return () => window.removeEventListener('resize', updateHeights);
    }, []); // run only once on component mount

    return (
        <section className="skills" id="skills" style={{ minHeight: skillsHeight }}>
            <div className="section-background"></div>
            <div className="experience-container" style={{ minHeight: containerHeight }}>
                <h2>Programming & Design Skills</h2>
                <div className='experience-content' ref={experienceContentRef}>
                    <SkillItem icon={<FaReact />} title="ReactJS" />
                    <SkillItem icon={<TbBrandThreejs />} title="ThreeJS" />
                    <SkillItem icon={<DiJavascript />} title="JavaScript" />
                    <SkillItem icon={<SiBootstrap />} title="Bootstrap" />
                    <SkillItem icon={<IoLogoCss3 />} title="CSS" />
                    <SkillItem icon={<IoLogoHtml5 />} title="HTML" />
                    <SkillItem icon={<FaNodeJs />} title="NodeJS" />
                    <SkillItem icon={<FaPython />} title="Python" />
                    <SkillItem icon={<FaLaravel />} title="Laravel" />
                    <SkillItem icon={<SiPhp />} title="PHP" />
                    <SkillItem icon={<SiMysql />} title="MySQL" />
                    <SkillItem icon={<SiSqlite />} title="SQLite" />
                    <SkillItem icon={<BsGit />} title="Git" />
                    <SkillItem icon={<SiPostman />} title="Postman" />
                    <SkillItem icon={<SiAdobexd />} title="Adobe XD" />
                    <SkillItem icon={<SiAdobephotoshop />} title="Photoshop" />
                    <SkillItem icon={<SiAdobeillustrator />} title="Illustrator" />
                    <SkillItem icon={<SiAdobeindesign />} title="Indesign" />
                    <SkillItem icon={<SiArchicad />} title="ArchiCad" />
                </div>
            </div>
        </section>
    );
}

const SkillItem = ({ icon, title }) => (
    <article className='experience-details'>
        <div className="experience-details-icon">{icon}</div>
        <h5>{title}</h5>
    </article>
);