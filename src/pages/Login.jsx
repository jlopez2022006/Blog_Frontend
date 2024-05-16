import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction, userSignUpAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import '../pages/LogIn.css';

const validationSchemaLogin = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const validationSchemaSignUp = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.signIn);
    const navigate = useNavigate(); // Usa el hook useNavigate

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirige al usuario a la página principal si está autenticado
        }
    }, [isAuthenticated, navigate]);

    const [isSignUp, setIsSignUp] = useState(false);

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: (values, actions) => {
            dispatch(userSignInAction(values));
            actions.resetForm();
        },
    });

    const formikSignUp = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchemaSignUp,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        },
    });

    const switchMode = () => {
        setIsSignUp(prevState => !prevState);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                    <div className="form-container sign-up-container">
                        <form onSubmit={formikSignUp.handleSubmit}>
                            <h1>Crea tu cuenta</h1>
                            <span>o usa tu correo para registrarte</span>
                            <TextField
                                type="text"
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                {...formikSignUp.getFieldProps('name')}
                                error={formikSignUp.touched.name && Boolean(formikSignUp.errors.name)}
                                helperText={formikSignUp.touched.name && formikSignUp.errors.name}
                            />
                            <TextField
                                type="email"
                                label="Correo electronico"
                                variant="outlined"
                                fullWidth
                                {...formikSignUp.getFieldProps('email')}
                                error={formikSignUp.touched.email && Boolean(formikSignUp.errors.email)}
                                helperText={formikSignUp.touched.email && formikSignUp.errors.email}
                            />
                            <TextField
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                fullWidth
                                {...formikSignUp.getFieldProps('password')}
                                error={formikSignUp.touched.password && Boolean(formikSignUp.errors.password)}
                                helperText={formikSignUp.touched.password && formikSignUp.errors.password}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Registrar
                            </Button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={formikLogin.handleSubmit}>
                            <h1>Ingresar</h1>
                            <span>o usa tu correo</span>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="outlined"
                                fullWidth
                                {...formikLogin.getFieldProps('email')}
                                error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                                helperText={formikLogin.touched.email && formikLogin.errors.email}
                            />
                            <TextField
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                fullWidth
                                {...formikLogin.getFieldProps('password')}
                                error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                                helperText={formikLogin.touched.password && formikLogin.errors.password}
                            />
                            <a href="#">¿Olvidaste tu contraseña?</a>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Ingresar
                            </Button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Bienvenido!</h1>
                                <Typography variant="body1">Para mantenerse conectado con nosotros, inicie sesión con su información personal</Typography>
                                <Button className="ghost" onClick={switchMode}>
                                    Ingresar
                                </Button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hola!</h1>
                                <Typography variant="body1">Introduce tus datos personales y enterate de los proyectos hechos</Typography>
                                <Button className="ghost" onClick={switchMode}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Login;