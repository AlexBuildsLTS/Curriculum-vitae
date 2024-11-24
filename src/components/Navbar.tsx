// Navbar.tsx

import * as Icons from 'lucide-react';
import profilePicture from '../assets/profilepicture.png'; // Adjust the path as necessary

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full px-6 py-4 bg-navy-primary/90 backdrop-blur-sm lg:px-24">
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <a href="#" className="flex items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="object-cover rounded-full w-14 h-14"
          />
        </a>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <a href="/resume.pdf" className="btn-primary">
            Resume
          </a>
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-6 py-2 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-4">
            <a href="/resume.pdf" className="inline-block btn-primary">
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
