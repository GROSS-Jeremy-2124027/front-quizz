import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'
import Answer from "../components/Answer";

const Question = () => {
    const [answerClicked, setAnswerClicked] = useState(false);
    const [countdown, setCountdown] = useState(8);

    const handleAnswerClick = () => {
        setAnswerClicked(true);
    };

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        if (countdown === 0) {

        }

        return () => clearInterval(timer);
    }, [countdown]);

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
                <Button label={"Quit Game"} url={""} />
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
                    fontSize: "3em",
                    textTransform: "uppercase",
                    margin: "0 10vw"
                }}>
                    How much Rafael Nadal has won Rolland Garros ?
                </Typography>
                <Grid container rowSpacing={1} justifyContent="center">
                    <Grid item xs={4} sx={{ margin: '10px' }}>
                        <Answer label={"5"} onClick={handleAnswerClick} disabled={answerClicked} />
                    </Grid>
                    <Grid item xs={4} sx={{ margin: '10px' }}>
                        <Answer label={"8"} onClick={handleAnswerClick} disabled={answerClicked} />
                    </Grid>
                    <Grid item xs={4} sx={{ margin: '10px' }}>
                        <Answer label={"12"} onClick={handleAnswerClick} disabled={answerClicked} />
                    </Grid>
                    <Grid item xs={4} sx={{ margin: '10px' }}>
                        <Answer label={"14"} onClick={handleAnswerClick} disabled={answerClicked} />
                    </Grid>
                </Grid>
            </animated.div>
        </Box>
    );
}

export default Question;