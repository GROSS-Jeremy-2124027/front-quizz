import { Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Joker from "../components/Joker";
import { useSpring, animated } from 'react-spring'
import { useNavigate } from "react-router-dom";
import QuitButton from "../components/QuitButton";
import Button from "../components/Button";
import axios from 'axios';

const Category = () => {
    const local_url = "http://127.0.0.1:8000"
    const api_url = "https://web-production-1142.up.railway.app"
    const navigate = useNavigate()
    const [jokerClicked, setJokerClicked] = useState(false)
    const [category, setCategory] = useState(null)
    const [countdown, setCountdown] = useState(8)
    const [open, setOpen] = useState(false)
    const [jokersAvailable, setJokersAvailable] = useState(0)

    const handleJokerClick = async () => {
        try {
            const gameResponse = await axios.get(`${api_url}/game/get-game/1/`)
            const playerId = gameResponse.data.player_id

            const jokersResponse = await axios.get(`${api_url}/player/get-player/${playerId}/`)
            const availableJokers = jokersResponse.data.joker

            if (availableJokers > 0) {
                const jokerResponse = await axios.put(`${api_url}/player/use-joker/${playerId}/`)
                console.log(jokerResponse.data)

                setJokerClicked(true)
            }
        } catch (error) {
            console.error('Error using joker:', error)
        }
    }

    const handleQuitGameClick = async () => {
        try {
            const response = await axios.delete(`${api_url}/game/delete-game/`, {})

            console.log(response.data)
        } catch (error) {
            console.error('Error deleting game:', error)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1)
        }, 1000)

        if (countdown === 0) {
            navigate('/question')
        }

        return () => clearInterval(timer)
    }, [countdown])

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/game/first-unanswered-question/`
                );

                console.log(response.data)

                if (response.data) {
                    setCategory(response.data.category)
                } else {

                }
            } catch (error) {
                console.error("Error loading category:", error)
            }
        };
        loadCategory()
    }, []);

    useEffect(() => {
        const fetchJokers = async () => {
            try {
                const gameResponse = await axios.get(`${api_url}/game/get-game/1/`)
                const playerId = gameResponse.data.player_id

                const jokersResponse = await axios.get(`${api_url}/player/get-player/${playerId}/`)
                const availableJokers = jokersResponse.data.joker

                setJokersAvailable(availableJokers)
            } catch (error) {
                console.error('Error fetching available Jokers:', error)
            }
        }

        fetchJokers();
    }, [])

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    })

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

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
                    {category}
                </Typography>
                <Box sx={{
                    position: "relative",
                    display: jokersAvailable > 0 ? 'block' : 'none',
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