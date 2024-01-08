import { Box, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react"; import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'
import axios from 'axios';

const Pseudo = () => {
    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const gameId = getCookie('game_id');
        console.log('Game ID from cookie:', gameId);

        if (!gameId) {
            console.log('Game ID not found in cookie');
        }
    }, []);

    const [pseudo, setPseudo] = useState("");

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 220, friction: 20 }
    });

    const handleNextClick = async () => {
        try {
            // TODO : modifier la bonne game
            const response = await axios.put('http://127.0.0.1:8000/game/update-game/1', {
                player_name: pseudo
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error modifying game:', error);
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
                <Button label={"Back"} url={""} />
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
                    Enter your pseudo
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Pseudo"
                    variant="outlined"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}  // Met à jour l'état du pseudo
                />
                <Box onClick={handleNextClick}>
                    <Button label={"Difficulty"} url={"difficulty"} />
                </Box>
            </animated.div>
        </Box >
    )
}

export default Pseudo;