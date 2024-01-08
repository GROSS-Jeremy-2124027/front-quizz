import React from 'react';
import { Box, Typography } from "@mui/material";


const QuitButton = ({ label, handleOpen }) => {

    const handleClick = () => {
        handleOpen();
    };

    return (
        <Box
            sx={{
                margin: "20px",
                padding: "10px",
                backgroundColor: "#FF934F",
                display: "inline-block",
                justifyContent: "center",
                transition: "ease 0.3s",
                borderRadius: "5px",
                '&:hover': {
                    backgroundColor: "#FF7723",
                    cursor: "pointer"
                }
            }}
            onClick={handleClick}
        >
            <Typography sx={{
                fontFamily: "Archivo Black, sans-serif",
                fontSize: "1.5em",
                textTransform: "uppercase",
            }}>
                {label}
            </Typography>
        </Box>
    )
}

export default QuitButton;