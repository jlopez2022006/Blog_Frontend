import { Avatar, Box, Card, CardContent, Grid, Typography, Stack } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const validationSchema = yup.object({
    name: yup
        .string('Enter your complete name')
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

const Register = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            <Navbar />
            <Box sx={{ height: '100vh', bgcolor: 'primary.main', py: 8 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
                                        <LockOpenIcon />
                                    </Avatar>
                                    <Typography variant="h5" component="h1" mb={3}>
                                        Crea una cuenta
                                    </Typography>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Stack spacing={2} width="100%">
                                            <TextField
                                                fullWidth
                                                id="name"
                                                label="Nombre"
                                                name="name"
                                                variant="outlined"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                            />
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Correo electronico"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                            <TextField
                                                fullWidth
                                                id="password"
                                                label="Contraseña"
                                                name="password"
                                                type="password"
                                                variant="outlined"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                            />
                                        </Stack>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            sx={{ mt: 2 }}
                                        >
                                            Registrar
                                        </Button>
                                    </form>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default Register;