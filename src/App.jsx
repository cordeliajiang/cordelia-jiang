import React, { useEffect, useState } from 'react';
import './app.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [scrollLocked, setScrollLocked] = useState(false);

  const handleScrollLock = (value) => {
    setScrollLocked(value);
  };

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => { console.log(data) });
  // }, []);

  // useEffect(() => {
  //   fetch("/.netlify/functions/server/api")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  // useEffect(() => {
  //   fetch("/.netlify/functions/server/api")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  

  useEffect(() => {
    fetch("http://localhost:9999/.netlify/functions/server/api")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  


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