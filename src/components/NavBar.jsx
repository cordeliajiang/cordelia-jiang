import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './navbar.css';
import logo from '../assets/img/logo.png';
import navLinkedinIcon from '../assets/img/nav-linkedin-icon.svg';
import navGithubIcon from '../assets/img/nav-github-icon.svg';
import navEmailIcon from '../assets/img/nav-email-icon.svg';

// passed two variables from App Component for locking scrolling functionality after opened burger menu
export const NavBar = ({ scrollLocked, setScrollLocked }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [navbarToggled, setNavbarToggled] = useState(false);
  // const [scrollLocked, setScrollLocked] = useState(false);
  const handleNavbarCollapse = () => setNavbarToggled(!navbarToggled);

  useEffect(() => {
    setScrollLocked(scrollLocked);
  }, []);

  // scroll condition based on scroll Y
  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY > 50){
        setScrolled(true);
      }else{
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return() => window.removeEventListener("scroll", onScroll);
  }, []
  )

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  } 

  useEffect(() => {
    if(navbarToggled === true){
      setScrollLocked(true);
    }else{
      setScrollLocked(false);
    }
  }
  )
  console.log(navbarToggled, activeLink)


  return (
    <Navbar expand="lg" expanded={navbarToggled} className= {scrolled ? "scrolled": ''}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt="Logo"/>
        </Navbar.Brand>
        {/* <Navbar.Toggle onClick={() => setNavbarToggled(navbarToggled ? false : "navbarToggled")} aria-expanded={!navbarToggled ? "false" : "true"}/> */}
        <Navbar.Toggle onClick={handleNavbarCollapse} aria-expanded={!navbarToggled ? "false" : "true"}/>
          <Navbar.Collapse>
            {/* <div className="burger-menu"> */}
              <Nav className="me-auto">
                <div className="burger-menu-logo"><img src={logo} alt="Logo"/></div>
                {/* if a link is clicked, highlight it and update the state, otherwise leave it as is */}
                {/* since react doesn't reload the page the nav remains open */}
                <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('home')} }>Home</Nav.Link>
                <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('skills')} }>Skills</Nav.Link>
                <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('projects')} } >Projects</Nav.Link>
                <span className="navbar-text">
                    <div className="social-icon">
                      <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer"><img src={navLinkedinIcon} alt="replace with github url:xxxx"/></a>
                      <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer"><img src={navGithubIcon} alt=""/></a>
                      <a href="mailto:jiangcordelia@gmail.com"><img src={navEmailIcon} alt=""/></a>
                    </div>
                    <a href="#connect" onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('connect')} }>
                      <button className="vvd">
                        <span>Contact</span>
                      </button>
                    </a>
                </span>
              </Nav>
            {/* </div> */}
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}