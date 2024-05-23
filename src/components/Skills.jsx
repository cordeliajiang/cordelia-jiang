import React, { useRef, useState, useEffect } from 'react';
import './skills.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiBootstrap, SiPhp, SiMysql, SiSqlite, SiPostman, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import SkillItem from './SkillItem';

export const Skills = () => {
    // Array to store skills data
    const skills = [
        { icon: <FaReact />, title: "ReactJS" },
        { icon: <TbBrandThreejs />, title: "ThreeJS" },
        { icon: <DiJavascript />, title: "JavaScript" },
        { icon: <SiBootstrap />, title: "Bootstrap" },
        { icon: <IoLogoCss3 />, title: "CSS" },
        { icon: <IoLogoHtml5 />, title: "HTML" },
        { icon: <FaNodeJs />, title: "NodeJS" },
        { icon: <FaPython />, title: "Python" },
        { icon: <FaLaravel />, title: "Laravel" },
        { icon: <SiPhp />, title: "PHP" },
        { icon: <SiMysql />, title: "MySQL" },
        { icon: <SiSqlite />, title: "SQLite" },
        { icon: <BsGit />, title: "Git" },
        { icon: <SiPostman />, title: "Postman" },
        { icon: <SiAdobexd />, title: "Adobe XD" },
        { icon: <SiAdobephotoshop />, title: "Photoshop" },
        { icon: <SiAdobeillustrator />, title: "Illustrator" },
        { icon: <SiAdobeindesign />, title: "Indesign" },
        { icon: <SiArchicad />, title: "ArchiCad" }
    ];


    const [containerHeightState, setcontainerHeightState] = useState('auto');
    const [skillsHeightState, setskillsHeightState] = useState('auto');
    const skillsContentReference = useRef(null);
    const skillsContainerReference = useRef(null);

    useEffect(() => {
        const updateHeights = () => {
            // Ensure skillsContentReference and skillsContainerReference are defined
            if (skillsContentReference.current && skillsContainerReference.current) {
                const contentHeight = skillsContentReference.current.clientHeight;
                const containerHeightState = skillsContainerReference.current.clientHeight;

                // Adjust the height of skills-container if skills-content overflows
                const heightDiff = contentHeight - containerHeightState;
                setcontainerHeightState(contentHeight > containerHeightState ? containerHeightState + heightDiff : 'auto');

                // Match skills div height with updated skills-container height
                setskillsHeightState(containerHeightState);
            }
        };

        window.addEventListener('resize', updateHeights);
        updateHeights();

        return () => window.removeEventListener('resize', updateHeights);
    }, []); // Run only once on component mount

    return (
        <section className="skills" id="skills" style={{ minHeight: skillsHeightState }}>
            <div className="skills-background"></div>
            <div className="skills-container" ref={skillsContainerReference} style={{ minHeight: containerHeightState }}>
                <h2>Programming & Design Skills</h2>
                <div className='skills-content' ref={skillsContentReference}>
                    {skills.map((skill, index) => (
                        <SkillItem key={index} icon={skill.icon} title={skill.title} />
                    ))}
                </div>
            </div>
        </section>
    );
}