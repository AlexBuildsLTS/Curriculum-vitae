// src/components/Navbar.tsx

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import * as Icons from "lucide-react";
import profilePicture from "../assets/profilepicture.png";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { label: "About", to: "about" },
    { label: "Skills", to: "skills" },
    { label: "Projects", to: "projects" },
    { label: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full px-6 py-4 bg-navy-primary/90 backdrop-blur-sm lg:px-24">
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <RouterLink to="/" className="flex items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="object-cover rounded-full w-14 h-14"
          />
        </RouterLink>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 md:flex">
          {navItems.map((item, index) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="cursor-pointer nav-link"
              style={{ animationDelay: `${index * 100}ms` }}>
              {item.label}
            </ScrollLink>
          ))}
          {/* Link to Calendar Page */}
          <RouterLink to="/calendar" className="btn-primary">
            Calendar
          </RouterLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-green md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 w-full py-4 md:hidden top-full bg-navy-light">
          {navItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="block px-6 py-2 cursor-pointer nav-link"
              onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </ScrollLink>
          ))}
          {/* Link to Calendar Page */}
          <div className="px-6 pt-4">
            <RouterLink
              to="/calendar"
              className="inline-block btn-primary"
              onClick={() => setIsMenuOpen(false)}>
              Calendar
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
