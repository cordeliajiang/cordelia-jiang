import React from 'react';
import './skills.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiBootstrap, SiPhp, SiMysql, SiSqlite, SiPostman, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiArchicad } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import SkillItem from './SkillItem';
import useAutoHeight from './useAutoHeight';

export const Skills = () => {
    const { heightState, contentRef, containerRef } = useAutoHeight();

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

    return (
        <section className="skills" id="skills" style={{ minHeight: heightState }}>
            <div className="skills-container" ref={containerRef}>
                <h2>Programming & Design Skills</h2>
                <div className='skills-content' ref={contentRef}>
                    {skills.map((skill, index) => (
                        <SkillItem key={index} icon={skill.icon} title={skill.title} />
                    ))}
                </div>
            </div>
        </section>
    );
};