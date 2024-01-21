import { Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import QuitButton from "../components/QuitButton";
import { useSpring, animated } from 'react-spring'
import Button from "../components/Button";
import axios from 'axios';

const Score = () => {
    const local_url = "http://127.0.0.1:8000"
    const api_url = "https://web-production-1142.up.railway.app"
    const [playerId, setPlayerId] = useState(null)
    const [open, setOpen] = useState(false)
    const [playerName, setPlayerName] = useState(null)
    const [playerScore, setPlayerScore] = useState(null)

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleQuitGameClick = async () => {
        try {
            const response = await axios.delete(`${api_url}/game/delete-game/`, {})

            console.log(response.data)
        } catch (error) {
            console.error('Error deleting game:', error)
        }
    }

    useEffect(() => {
        const getPlayerId = async () => {
            try {
                const player = await axios.get(
                    `${api_url}/game/get-game/1/`
                )

                if (player.data.player_id) {
                    setPlayerId(player.data.player_id)
                } else {
                    console.error("There is no player for this game")
                }
            } catch (error) {
                console.error("Error loading first unanswered question or player id:", error)
            }

        }
        getPlayerId()
    }, [])

    useEffect(() => {
        const getPlayerNameScore = async () => {
            try {
                const player_id = await axios.get(
                    `${api_url}/player/get-player/${playerId}/`
                )

                if (player_id.data) {
                    setPlayerName(player_id.data.name)
                    setPlayerScore(player_id.data.score)
                }
            } catch (error) {
                console.error("Error loading player name:", error)
            }
        }
        getPlayerNameScore()
    }, [playerId])

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    })

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
                    Score of {playerName}
                </Typography>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "3em",
                    backgroundColor: "#BFCBC2",
                    padding: "10px",
                    borderRadius: "5px",
                    textTransform: "uppercase"
                }}>
                    {playerScore}/30
                </Typography>
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

export default Score;