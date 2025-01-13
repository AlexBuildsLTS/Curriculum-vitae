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
        <div className="min-h-screen bg-var(--bg-color) text-var(--text-color)">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <div className="fixed top-16 right-6 z-50">
                <ThemeToggle />
            </div>

            <main className="px-6 pt-20 lg:px-24">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
