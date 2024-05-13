import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}

            <nav className="bg-beige shadow-lg h-screen fixed top-0 left-0 z-50">
                <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col justify-between items-start h-full">
                    <div>
                        <Link to="/" className="text-2xl font-bold text-black mb-8">Blog</Link>
                        <ul className="flex flex-col space-y-4">
                            <li><Link to="/" className="text-black hover:text-teal-500 font-bold">Inicio</Link></li>
                            <li><Link to="/add" className="text-black hover:text-teal-500 font-bold">Agregar Artículo</Link></li>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button type="button" className="text-white focus:outline-none" onClick={toggleSidebar}>
                            {isOpen ? <IoMdClose size={24} /> : <CgMenuRight size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};