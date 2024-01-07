import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";

const Answer = ({ onClick, label, disabled }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        onClick();
    };

    if (clicked) {
        return (
            <Box
                sx={{
                    backgroundColor: "#91F5AD",
                    margin: "20px",
                    transition: "ease 0.3s",
                    border: "solid 1px #000",
                    borderRadius: "10px",
                    pointerEvents: disabled ? 'none' : 'auto',
                    opacity: disabled ? 0.5 : 1,
                    transform: "scale(1.1)"
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
        );
    }

    return (
        <Box
            sx={{
                margin: "20px",
                transition: "ease 0.3s",
                border: "solid 1px #000",
                borderRadius: "10px",
                '&:hover': {
                    cursor: "pointer",
                    backgroundColor: disabled ? "#BFCBC2" : "#BFCBC2",
                },
                pointerEvents: disabled ? 'none' : 'auto',
                opacity: disabled ? 0.5 : 1,
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

export default Answer;
