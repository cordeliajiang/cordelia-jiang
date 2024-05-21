// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'; // import useEffect, so the API can be called just when the page loads
import './app.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
// import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
// import { Projects } from './components/Projects';
import Projects from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    fetch("/api") // since proxy is added to package.json, path before /api is omitted.
    .then((res) => res.json())
    .then((data) => { console.log(data) })
  }, []);

  var pos = document.documentElement;
  pos.addEventListener('mousemove', e => {
      pos.style.setProperty('--x', e.clientX + 'px')
      pos.style.setProperty('--y', e.clientY + 'px')
  })


  return (
    <div className={`${scrollLocked ? "scrollLocked": ''} ${"App"}`}>
      <div className="spotlight"></div>
      <NavBar scrollLocked = {scrollLocked} setScrollLocked = {setScrollLocked}/>
      <Banner/>
      {/* <Skills/> */}
      <Experience/>
      <Projects/>
      {/* <Contact/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
