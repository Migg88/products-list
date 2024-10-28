import React from "react";
import Nav from "../components/Nav";
import Container from '@mui/material/Container';

const Wrapper = ({children}) => {
    return (
        <>
            <Nav />
            <Container maxWidth="lg">
                {children}
            </Container>
        </>
    )
}

export default Wrapper