import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo2.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <span className='navbar-toggle-icon'/>
        <Navbar.Toggle/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* if a link is clicked, highlight it and update the state, otherwise leave it as is */}
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="replace with github url:xxxx"/></a>
                <a href="#"><img src={navIcon2} alt=""/></a>
                <a href="#"><img src={navIcon3} alt=""/></a>
              </div>
              <button className="vvd" onClick={() => console.log('connect')}><span>Contact</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}