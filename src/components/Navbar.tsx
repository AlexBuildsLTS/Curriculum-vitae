import * as Icons from 'lucide-react';

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
    <nav className="fixed w-full top-0 z-50 bg-[var(--navy-primary)]/90 backdrop-blur-sm py-4 px-6 lg:px-24">
      <div className="flex items-center justify-between">
        <a href="#" className="text-[var(--green)] text-2xl font-bold">AY</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
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
          <a href="/resume.pdf" className="btn-primary">Resume</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--green)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--navy-light)] py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 px-6 nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-4">
            <a href="/resume.pdf" className="btn-primary inline-block">Resume</a>
          </div>
        </div>
      )}
    </nav>
  );
}