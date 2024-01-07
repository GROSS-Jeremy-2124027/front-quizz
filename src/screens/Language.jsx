import { Box, Typography, Radio, FormControlLabel, RadioGroup, FormControl } from "@mui/material";
import React from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'

const Language = () => {
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
            background: "linear-gradient(-135deg, #C2E812, #FFFFFF)",
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
                    Choose Language
                </Typography>
                <FormControl>
                    <RadioGroup
                        defaultValue="english"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="english" control={<Radio />} label="English" />
                        <FormControlLabel value="french" control={<Radio />} label="French" />
                    </RadioGroup>
                </FormControl>
                <Box>
                    <Button label={"Validate"} url={""} />
                </Box>
            </animated.div>
        </Box>
    )
}

export default Language;