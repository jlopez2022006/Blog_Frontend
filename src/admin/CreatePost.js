import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { modules } from '../components/moduleToolbar';


const validationSchema = yup.object({
    title: yup
        .string('Add a post title')
        .min(4, 'Title must have at least 4 characters')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Content must have at least 10 characters')
        .required('Content is required'),
});

const CreatePost = () => {
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
            title: '',
            content: '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            createNewPost(values);
            actions.resetForm();
        },
    });

    const createNewPost = async (values) => {
        try {
            const { data } = await axios.post('/api/post/create', values);
            toast.success('Post created');
        } catch (error) {
            console.log(error);
            toast.error('Error creating post');
        }
    }

    return (
        <Box sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundSize: "cover",
            backdropFilter: "blur(10px)",
            zIndex: 0,
        }}>
            <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant='h5' sx={{ pb: 4, textAlign: "center", fontWeight: 'bold' }}> Subir Proyecto </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="title"
                        label="Título"
                        name='title'
                        InputLabelProps={{ shrink: true }}
                        placeholder="Título del proyecto"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        sx={{ mb: 3 }}
                    />
                    <ReactQuill
                        theme="bubble"
                        placeholder={'Descripción del proyecto...'}
                        modules={modules}
                        value={values.content}
                        onChange={(e) => setFieldValue('content', e)}
                        style={{
                            minHeight: '200px',
                        }}
                    />
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
                                p={2}
                                sx={{
                                    border: '2px dashed #1976d2',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                    ...(isDragActive && { backgroundColor: '#cceffc' })
                                }}
                            >
                                <input {...getInputProps()} />
                                <CloudUploadIcon sx={{ fontSize: 72, mb: 1, color: isDragActive ? '#1976d2' : undefined }} />
                                <Typography variant="body1" sx={{ fontSize: "16px", fontWeight: 'bold', color: '#1976d2' }}>
                                    {isDragActive ? 'Suelta aquí' : 'Arrastra y suelta aquí o haz clic para seleccionar'}
                                </Typography>
                            </Box>
                        )}
                    </Dropzone>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", bgcolor: "#1976d2", color: "#fff" }}
                    >
                        Subir Proyecto
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default CreatePost;