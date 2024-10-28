import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchProductsQuery } from "../features/product/productApiSlice";
import { Link } from "react-router-dom";
import { Box, Grid2 } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import ProductCard from "../components/ProductCard";

const Products = () => {

    const [page, setPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, isError, data, isFetching } = useFetchProductsQuery({page, limit: 10});
    const products = useSelector((state) => state.products.products);
    const filteredProducts = products.filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchChange = (event, value) => {
        setSearchTerm(value);
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        marginBottom: 20,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && !isFetching) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFetching])

    if (isLoading) return <div>Loading products...</div>;
    if (isError) return <div>Error loading products.</div>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',      
                alignItems: 'center',         
                justifyContent: 'center', 
            }}
        >
            <Stack spacing={2} sx={{ width: 300, marginBottom: 5 }}>
                <Autocomplete
                    freeSolo
                    id="productSearch"
                    disableClearable
                    options={products.map((option) => option.product_name)}
                    onInputChange={handleSearchChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search',
                                    sx: {
                                        color: 'text.tertiary'
                                    }
                                },
                            }}
                        />
                    )}
                />
            </Stack>
            <Grid
                container
                spacing={2}
                sx={{
                    minHeight: '100vh'
                }}
            >
                {
                    filteredProducts
                        ? filteredProducts.map(
                            item => 
                                <Grid key={item.id} size={{xs: 12, md: 4}}>
                                    <Link to={`/products/${item.id}`}>
                                        <ProductCard
                                            name={item.product_name}
                                            description={item.description}
                                            image={item.image}
                                        />
                                    </Link>
                                </Grid>
                        )
                        : products.map(
                            item => 
                                <Grid key={item.id} size={{xs: 12, md: 4}}>
                                    <ProductCard
                                        name={item.product_name}
                                        description={item.description}
                                        image={item.image}
                                    />
                                </Grid>
                        )
                        
                }
            </Grid>
        </Box>
    )
}

export default Products