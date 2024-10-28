import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Box, Grid2 as Grid, Typography, Card, CardMedia, CardContent, Button, Divider } from "@mui/material";

const Product = () => {
    const { id } = useParams();
    const products = useSelector((state) => state.products.products);
    const getProduct = (products) => products.find(product => product.id === Number(id));
    const product = getProduct(products);
    
    return (
        <Box sx={{ p: 3, maxWidth: 1200, margin: 'auto' }}>
            <Grid container spacing={4}>
                
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.product_name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: 500,
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {product.product_name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                            {product.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                ${product.price}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {product.quantity} in stock
                            </Typography>
                        </Box>

                        <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                            Add to Cart
                        </Button>
                        <Button variant="outlined" color="secondary" size="large">
                            Buy Now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Product