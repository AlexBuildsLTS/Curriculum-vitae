// src/components/Layout.tsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Optional floating toggle */}
            <div className="fixed top-16 right-6 z-50">
                <ThemeToggle />
            </div>

            <main className="px-6 pt-20 lg:px-24">{children}</main>
            <Footer />

            {/* Social links, email, etc. */}
            {/* ... */}
        </div>
    );
};

export default Layout;
