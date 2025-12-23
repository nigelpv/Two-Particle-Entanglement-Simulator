import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const navItems = [
        { name: 'ABOUT', path: '/about' },
        { name: 'CREATOR', path: '#' }, // Inert for now
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-none">
            <nav className="flex justify-start items-center p-8 w-full pointer-events-auto pl-12">
                <div style={{ display: 'flex', gap: '100px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{ color: 'white', textDecoration: 'none' }}
                            className={`
                                font-sans font-medium text-sm md:text-base 
                                uppercase tracking-[0.25em] transition-all duration-300
                                hover:tracking-[0.3em]
                                ${item.path === '#' ? 'cursor-default' : 'cursor-pointer'}
                            `}
                            onClick={item.path === '#' ? (e) => e.preventDefault() : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
