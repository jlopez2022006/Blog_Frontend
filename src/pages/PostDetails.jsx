import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { useProjects } from '../hooks/useProject';
import { useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const PostDetails = () => {
    const { projectId } = useParams();
    const { findByIdProject, isFetching, projects } = useProjects();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    useEffect(() => {
        findByIdProject(projectId);
    }, [projectId]);

    const project = projects.find(proj => proj._id === projectId);
    console.log(project)
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="py-8">

                        <h1 className="text-3xl font-bold mb-2"> {project && (project.title)}</h1>
                        <p className="text-gray-500 text-sm">Published on <time dateTime="2022-04-05">{project && formatDate(project.createdAt)}</time></p>
                    </div>


                    <img src={project && (project.image)} alt="Featured image" className="w-full h-auto mb-8" />

                    <div className='flex mb-5'>
                        <p className='text-xl font-bold'>Materia: <span className='font-normal'>{project && (project.course)}</span></p>
                    </div>
                    <div className="prose mb-40 prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                        <p>{project && (project.description)}</p>

                        <a href={project && (project.code)} target='_blank' class="text-blue-500 hover:text-blue-700">Ver codigo</a>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};
