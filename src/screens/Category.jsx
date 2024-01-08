import { Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Joker from "../components/Joker";
import { useSpring, animated } from 'react-spring'
import { useNavigate } from "react-router-dom";
import QuitButton from "../components/QuitButton";
import Button from "../components/Button";
import axios from 'axios';

const Category = () => {
    const navigate = useNavigate();
    const [jokerClicked, setJokerClicked] = useState(false);
    const [countdown, setCountdown] = useState(8);
    const [open, setOpen] = React.useState(false);

    const handleJokerClick = () => {
        setJokerClicked(true);
    };

    const handleQuitGameClick = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/game/delete-game/11/', {});

            console.log(response.data);
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        // if (countdown === 0) {
        //     navigate('/question');
        // }

        return () => clearInterval(timer);
    }, [countdown]);

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    });

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

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
                <QuitButton label={"Quit Game"} handleOpen={handleOpen} />
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
            <Modal
                sx={{
                    border: "none",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                }}
                open={open}
                onClose={handleClose}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                        backgroundColor: "#91F5AD"
                    }}>
                    <Typography sx={{
                        fontFamily: "Archivo Black, sans-serif",
                        fontSize: "1em",
                    }}>
                        Are you sure you want to leave the game ?
                    </Typography>
                    <Box onClick={handleQuitGameClick}>
                        <Button label={"Quit Game"} url={""} />
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Category;