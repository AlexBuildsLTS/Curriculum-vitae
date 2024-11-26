// src/components/Layout.tsx

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import * as Icons from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Theme Toggle Button */}
      <div className="fixed top-16 right-6">
        <ThemeToggle />
      </div>

      <main className="px-6 pt-20 lg:px-24">{children}</main>

      <Footer />

      {/* Social Links */}
      <div className="fixed left-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-32 after:bg-slate">
        <a
          href="https://github.com/AlexBuildsLTS"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          title="GitHub Profile">
          <Icons.Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/alex-youssef-02512a335/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          title="LinkedIn Profile">
          <Icons.Linkedin size={20} />
        </a>
      </div>

      {/* Email */}
      <div className="fixed right-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-32 after:bg-slate">
        <a
          href="mailto:alex.youssef@live.com"
          className="nav-link vertical-text">
          alex.youssef@live.com
        </a>
      </div>
    </div>
  );
};

export default Layout;
