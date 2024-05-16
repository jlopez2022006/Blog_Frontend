import { Box } from '@mui/material';
import React from 'react';
import HeaderTop from './HeaderTop';

const Layout = (Component) => ({ ...props }) => {

    return (
        <>
            <div style={{ display: 'flex', minHeight: "100vh" }}>
                <Box sx={{ 
                    width: "100%", 
                    backgroundImage: "url('https://images.pexels.com/photos/4792352/pexels-photo-4792352.jpeg?cs=srgb&dl=pexels-anete-lusina-4792352.jpg&fm=jpg')", 
                    backgroundSize: "cover",
                    minHeight: "70vh",
                    backdropFilter: "blur(10px)",
                    zIndex: 0,
                }}>
                    <HeaderTop />
                    <Box sx={{ p: 3 }}>
                        <Component {...props} />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Layout;