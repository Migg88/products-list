import React from "react";
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ProductCard = ({name, description, image}) => {
    return (
        <Card sx={{ maxWidth: '100%', height: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`${name} image`}
                />
                <CardContent sx={{ height: 'calc(100% - 140px)', overflow: 'hidden' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'text.secondary',
                            maxHeight: '100px',       
                            overflow: 'hidden',       
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

ProductCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
}

export default ProductCard;