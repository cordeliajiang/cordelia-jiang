import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { ProgrammingProjectCard } from "./ProgrammingProjectCard";
import { DesignProjectCard } from "./DesignProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import programmingImg1 from "../assets/img/programming-img1.png"
import designImg1 from "../assets/img/design-img1.png"
import designImg2 from "../assets/img/design-img2.png"
import cafeDesign from "../assets/img/cafeDesign.jpg"
import designBrochure1 from '../assets/pdf/design-brochure1.pdf';
import designBrochure2 from '../assets/pdf/design-brochure2.pdf';
import 'animate.css';
import './project.css';
import TrackVisibility from "react-on-screen";

/* decomposed rendering logic for each tab into a separate ProjectSection component */
/* passing title and projects props to the ProjectSection component */
const ProjectSection = ({ title, projects }) => (
    <Tab.Pane eventKey={title.toLowerCase()}>
        <div className='proj-content'>
            {projects.map((project, index) => (
                <div key={index}>
                    {title === 'Programming' ? (
                        <ProgrammingProjectCard {...project} />
                    ) : (
                        <DesignProjectCard {...project} />
                    )}
                </div>
            ))}
        </div>
    </Tab.Pane>
);

const Projects = () => {
    const tabs = ['Programming', 'Design'];
    const projects = {
        Programming: [
            {
                title: "Personal Portfolio, 2023",
                description: "ReactJS, ThreeJS, JavaScript, Bootstrap, CSS, HTML, Nodemailer, Git",
                imgUrl: programmingImg1,
                website: "https://github.com/cordeliajiang/react-portfolio",
                github: "https://github.com/cordeliajiang/react-portfolio",
            },
            {
                title: "Interior Design Gallery Website",
                description: "HTML, CSS, JavaScript, Bootstrap",
                imgUrl: projImg2,
                website: "https://jiangcordelia.wixsite.com/portfolio",
                github: "https://jiangcordelia.wixsite.com/portfolio",
            },
            {
                title: "Alcohol Review Web Application",
                description: "Node.js, Laravel, Blade, PHP, SQLite",
                imgUrl: projImg3,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg1,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg2,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg3,
            }
        ],
        Design: [
            {
                title: "Web Portal Application Prototype, 2022",
                description: "Adobe XD, Indesign, Illustrator",
                imgUrl: designImg1,
                website: "https://jiangcordelia.wixsite.com/portfolio/portal-video-render",
                brochure: designBrochure1,
            },
            {
                title: "Medical Mobile App Prototype, 2020",
                description: "Adobe XD, Indesign, Illustrator",
                imgUrl: designImg2,
                website: "https://jiangcordelia.wixsite.com/portfolio/home-to-hospital",
                brochure: designBrochure2,
            },
            {
                title: "Cafe Design, 2016",
                description: "Photoshop, Illustrator, InDesign, ArchiCad",
                imgUrl: cafeDesign,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg1,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg2,
            },
            {
                title: "Business Startup",
                description: "Design & Development",
                imgUrl: projImg3,
            }
        ],
    };

    return (
        <section className="project" id="projects" >
            <div className="project-container">
                <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                            <h2>Projects</h2>
                        </div>}
                </TrackVisibility>
                <Tab.Container id="projects-tabs" defaultActiveKey="programming">
                    <div className="projects-background"></div>
                    <Nav variant="pills" className="nav-pills" id="pill-tabs">
                        {tabs.map((tab, index) => (
                            <Nav.Item key={index}>
                                <Nav.Link eventKey={tab.toLowerCase()}>{tab}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Tab.Content>
                        {tabs.map((tab, index) => (
                            <ProjectSection key={index} title={tab} projects={projects[tab]} />
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </div>
        </section >
    )
}

export default Projects;