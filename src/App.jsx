import React, { useEffect, useState, useRef } from 'react';
import './app.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const hasFetched = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (hasFetched.current) return; // Prevent unnecessary fetches. If data has already been fetched, return early

    const fetchApiData = async () => {
      try {
        const response = await fetch("/api", { signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Process response if fetch is successful
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        hasFetched.current = true;
      }
    };

    fetchApiData();

    return () => {
      abortController.abort(); // Cleanup: Abort the fetch request on component unmount
    };
  }, []);


  const [scrollLocked, setScrollLocked] = useState(false);

  const handleScrollLock = (value) => {
    setScrollLocked(value);
  };

  useEffect(() => {
    const pos = document.documentElement;
    const updateMousePosition = (e) => {
      pos.style.setProperty('--x', e.clientX + 'px');
      pos.style.setProperty('--y', e.clientY + 'px');
    };
    pos.addEventListener('mousemove', updateMousePosition);

    return () => pos.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className={`${scrollLocked ? "scrollLocked" : ''} App`}>
      <div className="spotlight"></div>
      <NavBar scrollLocked={scrollLocked} setScrollLocked={handleScrollLock} />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;