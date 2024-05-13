import React from 'react';
import herobg from '../assets/img/hero.jpg';
import { ModelAdd } from './ModelAdd';

export const Herosection = () => {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover" src={herobg} alt="Hero Background" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl md:text-6xl text-white font-bold tracking-tight leading-tight mb-4">Bienvenido a mi portafolio</h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8">Aquí puedes explorar algunos de los proyectos en los que he trabajado.</p>
                <div className="flex justify-center">
                    <ModelAdd />
                </div>
            </div>
        </div>
    );
};