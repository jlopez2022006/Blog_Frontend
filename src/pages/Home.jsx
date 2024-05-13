import React from 'react';
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { Herosection } from '../components/Herosection';
import { useProjects } from '../hooks/useProject';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export const Home = () => {
    const { getProjects, isFetching, projects } = useProjects();

    useEffect(() => {
        getProjects();
    }, []);

    const updateProjects = () => {
        getProjects();
    };

    return (
        <>
            <Navbar />
            <Herosection />
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">Proyectos</h1>
                    {isFetching ? (
                        <div className="flex items-center justify-center h-48">
                            <p className="text-gray-500 text-lg">Sin proyectos aun...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {projects.map(project => (
                                <Card key={project._id} data={project} updateProjects={updateProjects} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
