import React, { useLayoutEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import 'animate.css';
import './project.css';
import ProjectCard from './ProjectCard';
import useAutoHeight from './useAutoHeight';
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import programmingImg1 from "../assets/img/programming-img1.png";
import designImg1 from "../assets/img/design-img1.png";
import designImg2 from "../assets/img/design-img2.png";
import cafeDesign from "../assets/img/cafeDesign.jpg";
import designBrochure1 from '../assets/pdf/design-brochure1.pdf';
import designBrochure2 from '../assets/pdf/design-brochure2.pdf';

// Define project categories and respective projects outside the component
const tabs = ['Programming', 'Design'];

const projects = {
    Programming: [
        {
            title: "Personal Portfolio, 2023",
            description: "ReactJS, ThreeJS, JavaScript, Bootstrap, CSS, HTML, Nodemailer, Git",
            coverImg: programmingImg1,
            website: "https://github.com/cordeliajiang/react-portfolio",
        },
        {
            title: "Interior Design Gallery Website",
            description: "HTML, CSS, JavaScript, Bootstrap",
            coverImg: projImg2,
            website: "https://jiangcordelia.wixsite.com/portfolio",
        },
    ],
    Design: [
        {
            title: "Web Portal Application Prototype, 2022",
            description: "Adobe XD, Indesign, Illustrator",
            coverImg: designImg1,
            website: "https://jiangcordelia.wixsite.com/portfolio/portal-video-render",
            brochure: designBrochure1,
        },
        {
            title: "Medical Mobile App Prototype, 2020",
            description: "Adobe XD, Indesign, Illustrator",
            coverImg: designImg2,
            website: "https://jiangcordelia.wixsite.com/portfolio/home-to-hospital",
            brochure: designBrochure2,
        },
        {
            title: "Cafe Design, 2016",
            description: "Photoshop, Illustrator, InDesign, ArchiCad",
            coverImg: cafeDesign,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            coverImg: projImg1,
        },
    ],
};

const Projects = () => {
    const { heightState, contentRef, containerRef, updateHeights } = useAutoHeight();
    const [activeTab, setActiveTab] = useState('programming');

    // Update heights when the active tab changes
    useLayoutEffect(() => {
        updateHeights();
    }, [activeTab, updateHeights]);

    return (
        <section className="projects" id="projects" style={{ minHeight: heightState }}>
            <div className="projects-container" ref={containerRef}>
                <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                            <h2>Projects</h2>
                        </div>}
                </TrackVisibility>

                {/* Render tabs for different project categories */}
                <Tab.Container id="projects-tabs" defaultActiveKey="programming" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <div className="projects-background"></div>
                    <Nav variant="pills" className="nav-pills" id="pill-tabs">
                        {tabs.map((tab, index) => (
                            <Nav.Item key={index}>
                                <Nav.Link eventKey={tab.toLowerCase()}>{tab}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Render tab content for each category */}
                    <Tab.Content>
                        {tabs.map((tab, index) => (
                            <Tab.Pane key={index} eventKey={tab.toLowerCase()}>
                                <div className='projects-cards' ref={contentRef}>
                                    {projects[tab].map((project, idx) => (
                                        <div key={idx}>
                                            <ProjectCard {...project} />
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </div>
        </section>
    );
};

export default Projects;