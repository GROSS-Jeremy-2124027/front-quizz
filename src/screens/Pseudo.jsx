import { Box, Typography, TextField } from "@mui/material";
import React from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'

const Pseudo = () => {
    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 220, friction: 20 }
    });

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
                <TextField id="outlined-basic" label="Pseudo" variant="outlined" />
                <Box>
                    <Button label={"Difficulty"} url={"difficulty"} />
                </Box>
            </animated.div>
        </Box >
    )
}

export default Pseudo;