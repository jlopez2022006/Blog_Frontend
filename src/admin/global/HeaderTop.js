import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'; // Importar Button desde Material-UI
import { Link } from 'react-router-dom'; // Importar Link para el enlace

const HeaderTop = () => {
    
    return (
        <Box sx={{ bgcolor: "red", flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <Button color="inherit" component={Link} to="/">Ir a la página principal</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderTop;