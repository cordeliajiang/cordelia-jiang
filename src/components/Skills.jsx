import React from 'react';
import './skills.css';
import { IoLogoHtml5, IoLogoCss3 } from 'react-icons/io';
import { DiJavascript } from 'react-icons/di';
import { BsGit } from 'react-icons/bs';
import { FaReact, FaNodeJs, FaPython, FaLaravel } from 'react-icons/fa';
import { SiCisco, SiApache, SiBootstrap, SiPhp, SiMysql, SiSqlite, SiExpress, SiCurl, SiPostman, SiWebpack, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import { GrVirtualMachine } from "react-icons/gr";
import { BiLogoNetlify } from "react-icons/bi";
import { GiMagickTrick } from "react-icons/gi";
import SkillItem from './SkillItem';
import useAutoHeight from './useAutoHeight';

const Skills = () => {
    const { heightState, containerRef } = useAutoHeight();

    const skills = [
        { icon: <FaPython />, title: "Python" },
        { icon: <DiJavascript />, title: "JavaScript" },
        { icon: <FaReact />, title: "ReactJS" },
        { icon: <FaNodeJs />, title: "NodeJS" },
        { icon: <SiExpress />, title: "ExpressJS" },
        { icon: <TbBrandThreejs />, title: "ThreeJS" },
        { icon: <IoLogoHtml5 />, title: "HTML" },
        { icon: <IoLogoCss3 />, title: "CSS" },
        { icon: <SiBootstrap />, title: "Bootstrap" },
        { icon: <SiPhp />, title: "PHP" },
        { icon: <FaLaravel />, title: "Laravel" },
        { icon: <SiMysql />, title: "MySQL" },
        { icon: <SiSqlite />, title: "SQLite" },
        { icon: <SiApache />, title: "Apache" },
        { icon: <GrVirtualMachine />, title: "VM" },
        { icon: <SiCisco />, title: "Packet Tracer" },
        { icon: <SiCurl />, title: "cURL" },
        { icon: <SiPostman />, title: "Postman" },
        { icon: <SiWebpack />, title: "Webpack" },
        { icon: <BsGit />, title: "Git" },
        { icon: <BiLogoNetlify />, title: "Netlify" },
        { icon: <SiAdobexd />, title: "Adobe XD" },
        { icon: <SiAdobephotoshop />, title: "Photoshop" },
        { icon: <SiAdobeillustrator />, title: "Illustrator" },
        { icon: <SiAdobeindesign />, title: "Indesign" },
    ];

    return (
        <section className="skills" id="skills" style={{ minHeight: heightState }}>
            <div className="skills-container" ref={containerRef}>
                <h2 className="old-standard-tt-bold">Programming & Design Skills</h2>
                <div className='skills-content'>
                    {skills.map((skill, index) => (
                        <SkillItem key={index} icon={skill.icon} title={skill.title} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;