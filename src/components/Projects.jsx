import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import ProjectCard from './ProjectCard';
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import programmingImg1 from "../assets/img/programming-img1.png";
import designImg1 from "../assets/img/design-img1.png";
import designImg2 from "../assets/img/design-img2.png";
import cafeDesign from "../assets/img/cafeDesign.jpg";
import designBrochure1 from '../assets/pdf/design-brochure1.pdf';
import designBrochure2 from '../assets/pdf/design-brochure2.pdf';
import 'animate.css';
import './project.css';

// Define tabs and projects data
const Projects = () => {
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

    const [activeTab, setActiveTab] = useState('programming');
    const [projectsHeightState, setProjectsHeightState] = useState('auto');
    const projectsContentReference = useRef(null); // Ref for projects content
    const projectsContainerReference = useRef(null); // Ref for projects container

    // Function to update projects section's heights based on projects-content and projects-container size
    const updateHeights = () => {
        if (projectsContentReference.current && projectsContainerReference.current) {
            const contentHeight = projectsContentReference.current.clientHeight;
            const containerHeight = projectsContainerReference.current.clientHeight;
            const projectsContainerStyles = getComputedStyle(projectsContainerReference.current);
            const marginHeight = parseFloat(projectsContainerStyles.marginTop) + parseFloat(projectsContainerStyles.marginBottom);

            // Calculate total height considering projects-content, projects-container, and projects-container's margins
            const totalHeight = Math.max(contentHeight, containerHeight) + marginHeight;
            setProjectsHeightState(totalHeight);
        }
    };

    // Effect hook to update heights when active tab changes
    useLayoutEffect(() => {
        updateHeights();
    }, [activeTab]);

    // Effect hook to handle resize events and update heights
    useEffect(() => {
        const handleResize = () => {
            requestAnimationFrame(updateHeights);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call on mount

        // Cleanup function to remove resize event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Effect hook to update heights when projects height state changes
    useLayoutEffect(() => {
        requestAnimationFrame(updateHeights);
    }, [projectsHeightState]);
    

    // Render the Projects component
    return (
        <section className="projects" id="projects" style={{ minHeight: projectsHeightState }}>
            <div className="projects-container" ref={projectsContainerReference}>
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
                                <div className='projects-cards' ref={projectsContentReference}>
                                    {/* Render individual project cards */}
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