import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // Cambio en la importación
import { modules } from '../components/moduleToolbar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
    title: yup
        .string('Add a post title')
        .min(4, 'text content should have a minimum of 4 characters ')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'text content should have a minimum of 10 characters ')
        .required('text content is required'),
});

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            title,
            content,
            image: ''
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updatePost(values);
            actions.resetForm();
        },
    });

    const singlePostById = async () => {
        try {
            const { data } = await axios.get(`/api/post/${id}`);
            setTitle(data.post.title);
            setContent(data.post.content);
            setImagePreview(data.post.image.url);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    useEffect(() => {
        singlePostById();
    }, []);

    const updatePost = async (values) => {
        try {
            const { data } = await axios.put(`/api/update/post/${id}`, values);
            if (data.success === true) {
                toast.success('post updated');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Editar proyecto  </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="title"
                        label="Titulo"
                        name='title'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Titulo del proyecto"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />

                    <Box sx={{ mb: 3 }}>
                        <ReactQuill
                            theme="bubble"
                            placeholder={'Descripcion del proyecto...'}
                            modules={modules}
                            value={values.content}
                            onChange={(e) => setFieldValue('content', e)}
                        />
                        <Box component='span' sx={{ color: '#d32f2f', fontSize: "12px", pl: 2 }}>{touched.content && errors.content}</Box>
                    </Box>

                    <Box border='2px dashed blue' sx={{ p: 1 }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                acceptedFiles.map((file, index) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onloadend = () => {
                                        setFieldValue('image', reader.result)
                                    }
                                })
                            }
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <Box
                                    {...getRootProps()}

                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" }, bgcolor: isDragActive ? "#cceffc" : "#fafafa" }}
                                >
                                    <input name="image" {...getInputProps()} />
                                    {
                                        isDragActive ? (
                                            <>
                                                <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                                <p style={{ textAlign: "center", fontSize: "12px" }}> Drop here!</p>
                                            </>
                                        ) :
                                            values.image === null ?
                                                <>
                                                    <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                                    <p style={{ textAlign: "center", fontSize: "12px" }}>Drag and Drop image here or click to choose</p>
                                                </> :
                                                <>
                                                    <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                                                        <Box ><img style={{ maxWidth: "100px" }} src={values.image === '' ? imagePreview : values.image} alt="" /></Box>
                                                    </Box>
                                                </>
                                    }
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button onClick={handleCancel} variant="outlined" fullWidth> Cancelar </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" fullWidth >Actualizar proyecto </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default EditPost;