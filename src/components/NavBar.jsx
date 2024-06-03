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
                {/* Render Nav.Links for each section */}
                {['home', 'skills', 'projects', 'connect'].map((value) => (
                  <Nav.Link
                    key={value}
                    href={`#${value}`}
                    className={activeLink === value ? 'active navbar-link' : 'navbar-link'}
                    onClick={() => onUpdateActiveLink(value)}
                  >
                    {/* Capitalize the first letter of the section name */}
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Nav.Link>
                ))}
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