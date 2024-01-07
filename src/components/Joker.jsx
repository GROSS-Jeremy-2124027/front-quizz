import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { useSpring, animated } from 'react-spring';

const Joker = ({ onJokerClick }) => {
    const [jokerUsed, setJokerUsed] = useState(false);

    const handleClick = () => {
        setJokerUsed(true);
        onJokerClick();
    };

    const iconAnimation = useSpring({
        loop: { reverse: true },
        from: { transform: 'scale(1)' },
        to: { transform: 'scale(1.2)' },
        config: { duration: 500 }
    });

    if (jokerUsed) {
        return (
            <Box>
                <Typography sx={{
                    margin: "20px",
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "1.5em",
                    textTransform: "uppercase",
                }}>
                    Joker use
                </Typography>
                <Box>
                    <HelpIcon sx={{
                        fontSize: "3em",
                        color: "#FF934F",
                    }} />
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                margin: "20px",
                '&:hover': {
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
                Do you want to use a joker ?
            </Typography>
            <animated.div style={iconAnimation}>
                <HelpIcon sx={{
                    fontSize: "3em"
                }} />
            </animated.div>

        </Box>
    )
}

export default Joker;
