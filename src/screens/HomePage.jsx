import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

const HomePage = () => {
    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 220, friction: 20 }
    });

    const handleStartNowClick = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/game/delete-game/', {});
            await axios.delete('http://127.0.0.1:8000/player/delete-all-players/', {});
            const response = await axios.post('http://127.0.0.1:8000/game/create-game/', {});

            console.log(response.data);
        } catch (error) {
            console.error('Error creating/modifying game:', error);
        }
    };

    return (
        <Box sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "linear-gradient(-135deg, #FF934F, #91F5AD)",
            animation: "backgroundAnimation 8s infinite",
        }}>
            <Box sx={{
                position: "absolute"
            }}>
                <Button label={"Language"} url={"language"} />
            </Box>
            <animated.div style={{
                ...animation,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                textAlign: "center",
            }}>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "1.7em",
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                    textTransform: "uppercase",
                }}>
                    Let's go Play a
                </Typography>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "7em",
                    lineHeight: 1,
                    textTransform: "uppercase",
                }}>
                    Quizz Game
                </Typography>
                <Box onClick={handleStartNowClick}>
                    <Button label={"Start Now"} url={"pseudo"} />
                </Box>
            </animated.div>
        </Box>
    );
};

export default HomePage;
