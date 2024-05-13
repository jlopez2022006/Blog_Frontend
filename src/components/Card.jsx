import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoTrashSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useProjects } from '../hooks/useProject';


export const Card = ({ data, updateProjects }) => {
    const { _id, title, description, code, authorName, createdAt } = data;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { deleteProject } = useProjects()
    const descriptionRef = useRef(null);



    useEffect(() => {
        if (descriptionRef.current) {
            const maxHeight = parseInt(window.getComputedStyle(descriptionRef.current).getPropertyValue('height'), 10);
            const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).getPropertyValue('line-height'), 10);
            const maxLines = maxHeight / lineHeight;
            setShowFullDescription(maxLines > 2);
        }
    }, [description]);

    const OnDelete = async () => {
        await deleteProject(_id);
        updateProjects();
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className=" bg-white rounded-2xl overflow-hidden shadow-lg h-auto">
            <a href="#"></a>
            <div className="flex flex-col justify-between px-6 py-4">
                <p className="cursor-default inline-block mb-4 text-xs font-bold capitalize relative">
                    <span className="border-b-2 border-blue-600">
                        {authorName}
                    </span>
                </p>
                <Link to={`/post/${_id}`} className="font-bold text-2xl inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{title}</Link>
                <div ref={descriptionRef} className={`text-gray-500 ${showFullDescription ? '' : 'line-clamp-2'}`}>
                    {description}
                </div>
                {!showFullDescription && <Link to={`/post/${_id}`} className="cursor-pointer text-gray-500 hover:text-blue-600" >... Leer más</Link>}
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
                <span href="#" className="py-1 text-sm font-regular text-gray-900 mr-1">
                    {formatDate(createdAt)}
                </span>
                <div>
                    <button className="focus:outline-none mr-2 text-gray-500 hover:text-red-600 transition duration-300 ease-in-out" onClick={OnDelete}><IoTrashSharp size={24} /></button>
                </div>
            </div>
        </div>
    );
};
