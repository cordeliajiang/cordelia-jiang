import React, { useLayoutEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import 'animate.css';
import './project.css';
import ProjectCard from './ProjectCard';
import useAutoHeight from './useAutoHeight';
import programmingImg1 from "../assets/img/programming-img1.webp";
import designImg1 from "../assets/img/design-img1.webp";
import designImg2 from "../assets/img/design-img2.webp";
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
            github: "https://github.com/cordeliajiang/react-portfolio",
        },
    ],
    Design: [
        {
            title: "Web Portal Application Prototype, 2022",
            description: "Adobe XD, Indesign, Photoshop, Illustrator",
            coverImg: designImg1,
            website: "https://jiangcordelia.wixsite.com/portfolio/portal-video-render",
            brochure: designBrochure1,
        },
        {
            title: "Medical Mobile App Prototype, 2020",
            description: "Adobe XD, Indesign, Photoshop, Illustrator",
            coverImg: designImg2,
            website: "https://jiangcordelia.wixsite.com/portfolio/home-to-hospital",
            brochure: designBrochure2,
        },
    ],
};

const Projects = () => {
    const { updateHeights } = useAutoHeight();
    const [activeTab, setActiveTab] = useState('programming');

    // Update heights when the active tab changes
    useLayoutEffect(() => {
        updateHeights();
    }, [activeTab, updateHeights]);

    return (
        <section className="projects" id="projects">
            <div className="projects-container">
                <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                            <h2 className="old-standard-tt-bold">Projects</h2>
                        </div>}
                </TrackVisibility>

                {/* Render tabs for different project categories */}
                <Tab.Container id="projects-tabs" defaultActiveKey="programming" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav variant="pills" className="nav-pills" id="pill-tabs">
                        {tabs.map((tab, index) => (
                            <Nav.Item className="open-sans-regular" key={index}>
                                <Nav.Link eventKey={tab.toLowerCase()}>{tab}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Render tab content for each category */}
                    <Tab.Content>
                        {tabs.map((tab, index) => (
                            <Tab.Pane key={index} eventKey={tab.toLowerCase()}>
                                <div className='projects-cards'>
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