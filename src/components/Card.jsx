import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoTrashSharp } from "react-icons/io5";
import { Button } from '@mui/material';
import { useProjects } from '../hooks/useProject';

export const Card = ({ data, updateProjects }) => {
    const { _id, title, description, authorName, createdAt, image } = data;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { deleteProject } = useProjects();
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const maxHeight = parseInt(window.getComputedStyle(descriptionRef.current).getPropertyValue('height'), 10);
            const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).getPropertyValue('line-height'), 10);
            const maxLines = maxHeight / lineHeight;
            setShowFullDescription(maxLines > 2);
        }
    }, [description]);

    const onDelete = async () => {
        await deleteProject(_id);
        updateProjects();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="max-w-lg bg-white rounded-xl overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className={`text-gray-500 ${showFullDescription ? '' : 'line-clamp-2'}`} ref={descriptionRef}>
                    {description}
                </p>
            </div>
            <div className="px-6 py-4">
                <Button size="small" color="primary" component={Link} to={`/post/${_id}`}>
                    Ver más
                </Button>
                <span className="ml-2 text-gray-500">{formatDate(createdAt)}</span>
                <button className="ml-2 text-gray-500 hover:text-red-600 focus:outline-none" onClick={onDelete}>
                    <IoTrashSharp size={20} />
                </button>
            </div>
        </div>
    );
};