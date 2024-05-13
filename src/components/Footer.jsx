import React from 'react';
import { SiInstagram } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-beige text-black py-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="flex items-center mb-4 md:mb-0">
                    
                </div>
                <div className="text-center md:text-left text-black">
                    © 2024 Ivan Lopez - Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
};