import React, { useLayoutEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import 'animate.css';
import './project.css';
import ProjectCard from './ProjectCard';
import useAutoHeight from './useAutoHeight';
import reactPortfolioCover from "../assets/img/reactPortfolioCover.webp";
import SQLDatabaseInjectionPreventionCover from "../assets/img/SQLDatabaseInjectionPreventionCover.webp";
import computerNetworkingCover from "../assets/img/computerNetworkingCover.webp";
import pythonAlgorithmPracticeCover from "../assets/img/pythonAlgorithmPracticeCover.webp";
import laravelAlcoholReviewWebsiteCover from "../assets/img/laravelAlcoholReviewWebsiteCover.webp";


import designImg1 from "../assets/img/design-img1.webp";
import designImg2 from "../assets/img/design-img2.webp";

import designBrochure1 from '../assets/pdf/design-brochure1.pdf';
import designBrochure2 from '../assets/pdf/design-brochure2.pdf';
import plan1 from '../assets/pdf/ITSecurityPlanRiskAssessment.pdf';
import execution1 from '../assets/pdf/SQLDatabaseInjectionPrevention.pdf';
import practice1 from '../assets/pdf/computerNetworkingPrac.pdf';


// Define project categories and respective projects outside the component
const tabs = ['Programming', 'Design'];

const projects = {
    Programming: [
        {
            title: "React Portfolio, 2023",
            description: "Front-end built with JavaScript, React.js, ThreeJS, React Hook Form. Back-end built with NodeJS, ExpressJS, and Nodemailer. API testing using cURL and Postman. Deployed to Netlify. Optimized performance using Webpack and ImageMagick. Version control using Git.",
            coverImg: reactPortfolioCover,
            github: "https://github.com/cordeliajiang/react-portfolio",
        },
        {
            title: "SQL Database Injection & Prevention, 2020",
            description: "Implement, manage, backup, and recover databases; create views, assign user privileges using MySQL. Setup a SQL Injection environment, configure Apache server in VM, perform SQL injections and preventions using UNIX prompt. Review security policies and procedures, identify key assets and set boundaries, conduct risk assessments to prioritize risks, manage access control and implement risk prevention measures.",
            coverImg: SQLDatabaseInjectionPreventionCover,
            plan: plan1,
            execution: execution1,
        },
        {
            title: "Computer Networking, 2021",
            description: "Calculate IPv4/IPv6 subnets and IP addresses for network topologies. Configure, troubleshoot, and fix network devices using Cisco Packet Tracer.",
            coverImg: computerNetworkingCover,
            practice: practice1,
        },
        {
            title: "Python Algorithm, 2021",
            description: "Explore programming algorithms, and perform data analytics and visualization using Python.",
            coverImg: pythonAlgorithmPracticeCover,
            github: "https://github.com/cordeliajiang/python-sqlite-algorithm-prac",
        },
        {
            title: "Laravel Review Website, 2021",
            description: "Build a database-connected website with Laravel, Blade, PHP, NodeJS, SQLite.",
            coverImg: laravelAlcoholReviewWebsiteCover,
            github: "https://github.com/cordeliajiang/alcohol-review-web",
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