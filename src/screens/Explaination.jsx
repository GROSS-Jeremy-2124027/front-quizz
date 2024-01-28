import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "../components/Button";
import { useSpring, animated } from 'react-spring'

const Explaination = () => {
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
                <Button label={"Back"} url={"difficulty"} />
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
                    Explaination
                </Typography>
                <Typography sx={{
                    margin: "20px 20vw"
                }}>
                    Welcome to our exciting quiz game! To play, each player will have to answer ten questions within a time limit.
                    given for each puzzle.
                    Additionally, to spice up the challenge even more, each player has two special jokers. These jokers can be used
                    and double the points awarded to the next question. Choose wisely when to activate
                    your joker to maximize your winnings. Let the competition begin, and let the best minds triumph in this game of
                    captivating quiz!
                </Typography>
                <Box>
                    <Button label={"Start"} url={"category"} />
                </Box>
            </animated.div>
        </Box>
    )
}

export default Explaination;