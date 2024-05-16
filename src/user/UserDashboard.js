import { Box } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const UserDashboard = () => {

    const { user } = useSelector(state => state.userProfile);

    return (
        <>
            <Box sx={{ bgcolor: "white", p: 3 }}>
                <h1>Perfil</h1>
                <p>Complete name: {user && user.name}</p>
                <p>E-mail: {user && user.email}</p>
            </Box>
        </>
    )
}

export default UserDashboard