// src/components/Navbar.tsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import * as Icons from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import profilePicture from "../assets/profilepicture.png";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "about" },
    { label: "Experience", to: "experience" },
    { label: "Projects", to: "projects" },
    { label: "Contact", to: "contact" },
  ];

  return (
      <nav className="fixed top-0 z-50 w-full px-6 py-4 bg-navy-primary/90 backdrop-blur-sm lg:px-24">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            <RouterLink to="/" className="flex items-center">
              <img
                  src={profilePicture}
                  alt="Profile"
                  className="object-cover rounded-full w-14 h-14"
              />
            </RouterLink>
            {navItems.map((item, index) =>
                location.pathname === "/" ? (
                    <ScrollLink
                        key={item.label}
                        to={item.to}
                        smooth
                        duration={500}
                        className="cursor-pointer nav-link"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.label}
                    </ScrollLink>
                ) : (
                    <RouterLink
                        key={item.label}
                        to={`/#${item.to}`}
                        className="nav-link"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.label}
                    </RouterLink>
                )
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <a
                href="https://github.com/AlexBuildsLTS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:text-slate-lightest"
                aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
                href="https://www.linkedin.com/in/alex-youssef-02512a335/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:text-slate-lightest"
                aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <RouterLink
                to="/calendar"
                className="p-2 text-green hover:text-slate-lightest"
            >
              <Icons.Calendar size={24} />
            </RouterLink>
            <ThemeToggle />
            <RouterLink
                to="/login"
                className="px-4 py-2 text-sm font-semibold border rounded text-green border-green hover:bg-green hover:text-navy-primary"
            >
              Log In
            </RouterLink>
          </div>

          {/* Mobile Menu Button */}
          <button
              className="text-green md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="absolute left-0 w-full py-4 md:hidden top-full bg-navy-light">
              <RouterLink
                  to="/"
                  className="block px-6 py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
              >
                Home
              </RouterLink>
              {navItems.map((item) =>
                  item.to.startsWith("/") ? (
                      <RouterLink
                          key={item.label}
                          to={item.to}
                          className="block px-6 py-2 nav-link"
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </RouterLink>
                  ) : (
                      <ScrollLink
                          key={item.label}
                          to={item.to}
                          smooth
                          duration={500}
                          className="block px-6 py-2 cursor-pointer nav-link"
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </ScrollLink>
                  )
              )}
              <RouterLink
                  to="/calendar"
                  className="block px-6 py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
              >
                Calendar
              </RouterLink>
            </div>
        )}
      </nav>
  );
};

export default Navbar;