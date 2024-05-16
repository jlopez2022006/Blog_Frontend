import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const PostCard = ({
    id,
    title,
    subheader,
    image,
    content,
}) => {
    return (
        <Card sx={{ maxWidth: 345, height: 300 }}>
            <Link to={`/post/${id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="Post image"
                />
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subheader}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span dangerouslySetInnerHTML={{ __html: content.split(" ").slice(0, 10).join(" ") + "..." }}></span>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PostCard;