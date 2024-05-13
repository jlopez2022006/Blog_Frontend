import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useProjects } from '../hooks/useProject';

export const ModelAdd = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createProject } = useProjects();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const onSubmit = handleSubmit(async (data) => {
        const img = selectedPhoto;
        console.log(img)
        createProject({})
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result; // Contenido de la imagen como cadena base64
                setSelectedPhoto(imageData); // Mostrar la imagen en tu componente
            };
            reader.readAsDataURL(file);
        }
    };


    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        <>
        </>

    )
}
