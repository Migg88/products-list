import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const grayscaleTheme = createTheme({
    palette: {
        mode: 'light', 
        primary: {
            main: '#555555',
        },
        secondary: {
            main: '#777777',
        },
        background: {
            default: '#f0f0f0', 
            paper: '#e0e0e0',  
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
            tertiary: '#fff',
            disabled: '#999999',
            
        },
        divider: '#bdbdbd',
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default function ProductThemeProvider ({children}) {
    return (
        <ThemeProvider theme={grayscaleTheme}>
            {children}
        </ThemeProvider>
    )
}