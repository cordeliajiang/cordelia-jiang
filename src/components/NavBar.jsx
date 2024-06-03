import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './navbar.css';
import logo from '../assets/img/logo.png';
import navLinkedinIcon from '../assets/img/nav-linkedin-icon.svg';
import navGithubIcon from '../assets/img/nav-github-icon.svg';
import navEmailIcon from '../assets/img/nav-email-icon.svg';

  // Add scroll event listener and clean it up on unmount
  useEffect(() => {
    const onScroll = () => {
      // Set the state based on whether the user has scrolled more than 50 pixels
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
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

  const mediaQuery = '(max-width: 9999px)'   

  return (
    /* expand = "lg" sets burger icon appears on 991px */
    <Navbar expand= {mediaQuery} expanded = {navbarToggled} className = {scrolled ? "scrolled": ''}>
      <Container>
        <div className="navbar-brand-container">
          <Navbar.Brand href="#home">
            <img src={logo} alt="Brand Logo on Navbar"/>
          </Navbar.Brand>
        </div>
        <div className="menu-icon-container">
          <Navbar.Toggle onClick={handleNavbarCollapse} aria-expanded={!navbarToggled ? false : true}/>
        </div>
        
        <Navbar.Collapse>
          <div className="nav-menu-overlay">
            <Nav>
              {/* since react doesn't reload the page, the nav remains open */}
              {/* <span className="navbar-link-left">   */}
                <div className="menu-logo">
                  <a href="#home"><img src={logo} alt="Brand Logo on Menu"/></a>
                </div>
                <div className="nav-links">
                  <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('home')} }>Home</Nav.Link>
                  <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('skills')} }>Skills</Nav.Link>
                  <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('projects')} } >Projects</Nav.Link>
                {/* </span> */}
                {/* <span className="navbar-link-right"> */}
                    {/* <a href="#connect" onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('connect')} }>
                      <button className="vvd">
                        <span>Contact</span>
                      </button>
                    </a> */}
                  <Nav.Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} onClick={() => { setScrollLocked(false); setNavbarToggled(false); onUpdateActiveLink('connect')} } >Contact</Nav.Link>                
                </div>
              <div className="social-icons">
                {/* Render social icons */}
                <a href="https://www.linkedin.com/in/cordeliajiang/" target="_blank" rel="noopener noreferrer">
                  <img src={navLinkedinIcon} alt="LinkedIn" className="social-icon" />
                </a>
                <a href="https://github.com/cordeliajiang" target="_blank" rel="noopener noreferrer">
                  <img src={navGithubIcon} alt="GitHub" className="social-icon" />
                </a>
                <a href="mailto:jiangcordelia@gmail.com">
                  <img src={navEmailIcon} alt="Email" className="social-icon" />
                </a>
                </div>
              {/* </span> */}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}