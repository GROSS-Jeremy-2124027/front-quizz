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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet congue ipsum, interdum aliquet sapien. Etiam gravida congue velit, a auctor felis gravida eget. Aenean at augue ac nulla convallis pulvinar sed in metus. Pellentesque sodales molestie quam vehicula egestas. Nunc semper purus in convallis iaculis. Sed placerat dui vel arcu dapibus blandit. Pellentesque blandit rhoncus magna. Vestibulum lobortis tellus nisi. Sed commodo sem eget ex commodo, non lacinia magna varius. Sed a tempor massa, sit amet auctor sem. Suspendisse rhoncus, augue vel posuere gravida, nisl est semper tellus, vitae aliquam risus risus nec ante. Vivamus tincidunt egestas justo a rhoncus. Curabitur a convallis tellus. Vivamus ac sem nec orci dignissim mollis. Sed porttitor ut felis quis porttitor.
                </Typography>
                <Box>
                    <Button label={"Start"} url={"category"} />
                </Box>
            </animated.div>
        </Box>
    )
}

export default Explaination;