import { Tab, Nav } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import ProjectCards from './ProjectCards';
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import programmingImg1 from "../assets/img/programming-img1.png"
import designImg1 from "../assets/img/design-img1.png"
import designImg2 from "../assets/img/design-img2.png"
import cafeDesign from "../assets/img/cafeDesign.jpg"
import designBrochure1 from '../assets/pdf/design-brochure1.pdf';
import designBrochure2 from '../assets/pdf/design-brochure2.pdf';
import 'animate.css';
import './project.css';

// Main Projects component
const Projects = () => {
    // Define project categories and respective projects
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

    return (
        <section className="projects" id="projects" >
            <div className="projects-container">
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
                            <ProjectCards key={index} title={tab} projects={projects[tab]} />
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </div>
        </section >
    )
}

export default Projects;