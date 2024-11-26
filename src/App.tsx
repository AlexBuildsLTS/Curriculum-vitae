// src/App.tsx

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MeetingCalendar from './components/MeetingCalendar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import * as Icons from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="px-6 pt-20 lg:px-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <MeetingCalendar /> 
        <Contact />
      </main>

      <Footer />

      {/* Social Links */}
      <div className="fixed left-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-32 after:bg-slate">
        <a href="https://github.com/AlexBuildsLTS" target="_blank" rel="noopener noreferrer" className="nav-link" title="GitHub Profile">
          <Icons.Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/alex-youssef-02512a335/" target="_blank" rel="noopener noreferrer" className="nav-link" title="LinkedIn Profile">
          <Icons.Linkedin size={20} />
        </a>
      </div>

      {/* Email */}
      <div className="fixed right-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-32 after:bg-slate">
        <a href="mailto:alex.youssef@live.com" className="nav-link vertical-text">alex.youssef@live.com</a>
      </div>
    </div>
  );
}

export default App;
