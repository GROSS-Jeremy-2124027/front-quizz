import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "../components/Button";
import SelectInput from "../components/SelectInput";
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

const Difficulty = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 220, friction: 20 }
    });

    const handleGetStartedClick = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/game/update-game/1/', {
                difficulty: selectedDifficulty
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
                <Button label={"Back"} url={"pseudo"} />
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
                    Choose difficulty
                </Typography>
                <SelectInput
                    selectedDifficulty={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                />
                <Box onClick={handleGetStartedClick}>
                    <Button label={"Get Started"} url={"explaination"} />
                </Box>
            </animated.div>
        </Box>
    )
}

export default Difficulty;
