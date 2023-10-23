import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { ProgrammingProjectCard } from "./ProgrammingProjectCard";
import { DesignProjectCard } from "./DesignProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
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

export const Projects = () => {

    const programmingProjects = [
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
    ];

    const designProjects = [
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
    ];

    return(
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                        <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                <h2>Projects</h2>
                            </div>}
                        </TrackVisibility>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                            <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pill-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Programming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Design</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="third">Other</Nav.Link>
                                </Nav.Item> */}
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {
                                            programmingProjects.map((project, index) => {
                                                return(
                                                    <ProgrammingProjectCard key={index}{...project}/>
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row>
                                        {
                                            designProjects.map((project, index) => {
                                                return(
                                                    <DesignProjectCard key={index}{...project}/>
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                {/* <Tab.Pane eventKey="third">
                                    <Row>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis cum, tempore libero consequuntur adipisci sequi, illum perferendis cupiditate, architecto quo laborum ducimus! Unde est esse facilis explicabo quis eum.
                                    </Row>
                                </Tab.Pane> */}
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <img className = "background-image-right" src={colorSharp2} alt="colorSharp2"/>
        </section>
    )
}