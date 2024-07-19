import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import './navbar.css';
import logo from '../assets/img/logo.webp';

// NavBar component to handle navbar functionalities
// Takes setScrollLocked as a prop to control scroll locking
const NavBar = ({ setScrollLocked }) => {
  const [activeLink, setActiveLink] = useState('home'); // Currently active link
  const [scrolled, setScrolled] = useState(false); // Whether the user has scrolled
  const [navbarToggled, setNavbarToggled] = useState(false); // Whether the navbar is toggled
  const [savedScrollPosition, setSavedScrollPosition] = useState(0); // Saved scroll position

  // Handle navbar toggle
  const toggleNavbar = () => {
    if (!navbarToggled) {
      // Save the current scroll position before opening the navbar
      setSavedScrollPosition(window.scrollY);
    }
    setNavbarToggled(!navbarToggled);
  };

  // Add scroll event listener and clean it up on unmount
  useEffect(() => {
    const onScroll = () => {
      // Set the state based on whether the user has scrolled more than 50 pixels
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle scroll lock state based on navbar toggled state
  useEffect(() => {
    setScrollLocked(navbarToggled);
    if (!navbarToggled) {
      // Restore the scroll position after closing the navbar
      window.scrollTo(0, savedScrollPosition);
    }
  }, [navbarToggled, setScrollLocked, savedScrollPosition]);

  // Handle hash change for smooth scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const section = document.getElementById(hash);
      if (section) {
        const navbarHeight = document.querySelector('.navbar').clientHeight;
        const scrollOffset = section.offsetTop - navbarHeight;
        window.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update the active link and close the navbar menu
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    setNavbarToggled(false);
    setScrollLocked(false);
    window.location.hash = value;
  };

  // Render NavBar component
  return (
    <Navbar expand="(max-width: 9999px)" expanded={navbarToggled} className={scrolled ? "scrolled" : ''}>
      <div className="navbar-container">
        <div className="navbar-brand-container">
          <Navbar.Brand href="#home">
            <img src={logo} alt="Navbar Brand Logo" />
          </Navbar.Brand>
        </div>
        <div className="menu-icon-container">
          <Navbar.Toggle onClick={toggleNavbar} aria-expanded={navbarToggled} />
        </div>
        <Navbar.Collapse>
          <div className="nav-menu-overlay">
            <Nav>
              <div className="menu-logo">
                <a href="#home"><img src={logo} alt="Menu Brand Logo" /></a>
              </div>
              <div className="open-sans-regular nav-links">
                {/* Render Nav.Links for each section */}
                {['home', 'skills', 'projects', 'contact'].map((value) => (
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
            </Nav>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;