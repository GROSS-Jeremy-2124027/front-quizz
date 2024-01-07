import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'
import Joker from "../components/Joker";
import { useNavigate } from "react-router-dom";

const Category = () => {
    const navigate = useNavigate()
    const [jokerClicked, setJokerClicked] = useState(false);
    const [countdown, setCountdown] = useState(8);

    const handleJokerClick = () => {
        setJokerClicked(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        if (countdown === 0) {
            navigate('/question');
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    });

    return (
        <Box sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#91F5AD",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "linear-gradient(-135deg, #FF934F, #91F5AD)",
            animation: "backgroundAnimation 8s infinite",
        }}>
            <Box sx={{
                position: "absolute",
            }}>
                <Button label={"Quit Game"} url={"explaination"} />
            </Box>
            <Box sx={{
                position: "absolute",
                right: "0"
            }}>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "3em",
                    textTransform: "uppercase",
                    margin: "20px",
                    padding: "10px",
                }}>
                    {countdown} s
                </Typography>
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
                    fontSize: "5em",
                    textTransform: "uppercase",
                }}>
                    Category
                </Typography>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "3em",
                    backgroundColor: "#BFCBC2",
                    padding: "10px",
                    borderRadius: "5px",
                    textTransform: "uppercase"
                }}>
                    Sports
                </Typography>
                <Box sx={{
                    position: "relative"
                }}>
                    <Joker onJokerClick={handleJokerClick} />
                </Box>
            </animated.div>

        </Box>
    )
}

export default Category;