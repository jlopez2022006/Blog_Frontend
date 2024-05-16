import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import CreatePost from './CreatePost';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);

    const displayPost = async () => {
        try {
            const { data } = await axios.get('/api/posts/show');
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayPost();
    }, []);

    const deletePostById = async (e, id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const { data } = await axios.delete(`/api/delete/post/${id}`);
                if (data.success === true) {
                    toast.success(data.message);
                    displayPost();
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    }

    const columns = [
        { field: '_id', headerName: 'Post ID', width: 150, editable: true },
        { field: 'title', headerName: 'Título', width: 150 },
        {
            field: 'image',
            headerName: 'Imagen',
            width: 150,
            renderCell: (params) => (
                <img width="100%" src={params.row.image.url} alt="Post" />
            )
        },
        {
            field: 'comments',
            headerName: 'Comentarios',
            width: 150,
            renderCell: (params) => (
                params.row.comments.length
            )
        },
        {
            field: 'postedBy',
            headerName: 'Autor',
            width: 150,
            valueGetter: (data) => data.row.postedBy.name
        },
        {
            field: 'createdAt',
            headerName: 'Fecha de creación',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD')
            )
        },
        {
            field: 'Acciones',
            width: 200,
            renderCell: (value) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', alignItems: 'center' }}>
                    <Link to={`/admin/post/edit/${value.row._id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                        <Typography sx={{ color: '#1976d2', ml: 1 }}>Edit</Typography>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deletePostById(e, value.row._id)} style={{ display: 'flex', alignItems: 'center' }}>
                        <DeleteIcon sx={{ color: 'red' }} />
                        <Typography sx={{ color: 'red', ml: 1 }}>Delete</Typography>
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1, pr: 2 }}>
                <CreatePost />
            </Box>

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
                    <Typography variant='h5' sx={{ pb: 4, textAlign: "center", fontWeight: 'bold' }}>
                        Proyectos
                    </Typography>

                    <Paper sx={{ bgcolor: "white" }}>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                sx={{
                                    '& .MuiTablePagination-displayedRows': {
                                        color: 'black',
                                    },
                                    color: 'black',
                                    [`& .${gridClasses.row}`]: {
                                        bgcolor: "white"
                                    },
                                }}
                                rows={posts}
                                columns={columns}
                                pageSize={3}
                                rowsPerPageOptions={[3]}
                                checkboxSelection={false}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;