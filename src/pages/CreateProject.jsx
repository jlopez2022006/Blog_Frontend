import React from 'react';
import { useForm } from 'react-hook-form';
import { useProjects } from '../hooks/useProject';
import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import { FiPaperclip } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';


export const CreateProject = () => {
    const { createProject } = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const onSubmit = (data) => {
        const { title, description, code, course } = data;
        const image = selectedPhoto;
        createProject({ title, image, description, code, course });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setSelectedPhoto(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mx-auto mt-8">
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Project</h2>
                        <TextField
                            {...register("title", { required: true })} // Registrar en el formulario con react-hook-form
                            id="outlined-basic"
                            label="Titulo"
                            variant="outlined"
                            fullWidth // Para ocupar todo el ancho disponible
                            margin="normal" // Para agregar un margen
                            required // Para hacerlo obligatorio
                        />
                        {errors.title && <p className="text-red-500">This field is required.</p>}
                        <TextField
                            {...register("code", { required: true })} // Registrar en el formulario con react-hook-form
                            id="outlined-basic"
                            label="Page link"
                            variant="outlined"
                            fullWidth // Para ocupar todo el ancho disponible
                            margin="normal" // Para agregar un margen
                            required // Para hacerlo obligatorio
                        />
                        {errors.code && <p className="text-red-500">This field is required.</p>}
                        <TextField
                            {...register("description", { required: true })} // Registrar en el formulario con react-hook-form
                            id="standard-basic"
                            label="Description"
                            variant="standard"
                            multiline // Para permitir múltiples líneas
                            rows={4} // Altura inicial de 4 líneas
                            fullWidth // Para ocupar todo el ancho disponible
                            margin="normal" // Para agregar un margen
                            required // Para hacerlo obligatorio
                        />
                        {errors.description && <p className="text-red-500">This field is required.</p>}
                        <TextField
                            {...register("course", { required: true })} // Registrar en el formulario con react-hook-form
                            id="outlined-basic"
                            label="Curso"
                            variant="outlined"
                            fullWidth // Para ocupar todo el ancho disponible
                            margin="normal" // Para agregar un margen
                            required // Para hacerlo obligatorio
                        />
                        {errors.course && <p className="text-red-500">This field is required.</p>}
                        <div className="flex items-center">
                            <label htmlFor="photo-upload" className="mr-4 cursor-pointer text-gray-600 hover:text-gray-800">
                                <FiPaperclip className="text-xl" />
                                <span className="ml-2">Attach Photo</span>
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                {...register("photo", {
                                    required: "Photo is required",
                                    onChange: handleFileChange
                                })}
                                style={{ display: 'none' }}
                            />
                            {errors.photo && <span className="text-red-500">{errors.photo.message}</span>}
                        </div>
                        <div className="flex justify-center mt-6">
                            <Link to="/" className="btn bg-gray-400 text-white px-6 py-2 rounded-md mr-4 hover:bg-gray-500">
                                Cancel
                            </Link>
                            <Button type='submit' variant="contained">Subir</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};