import { Box, Grid, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import QuitButton from "../components/QuitButton";
import { useSpring, animated } from 'react-spring'
import Answer from "../components/Answer";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Question = () => {
    const local_url = "http://127.0.0.1:8000"
    const api_url = "https://web-production-1142.up.railway.app"
    const navigate = useNavigate()

    const [answerClicked, setAnswerClicked] = useState(false)
    const [countdown, setCountdown] = useState(12)
    const [open, setOpen] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [choicesData, setChoicesData] = useState([])
    const [userChoice, setUserChoice] = useState(null)
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState(null)

    const [goodAnswer, setGoodAnswer] = useState(false)
    const [badAnswer, setBadAnswer] = useState(false)
    const [noAnswer, setNoAnswer] = useState(false)

    const [showCountDown, setShowCountDown] = useState(true)

    useEffect(() => {
        const loadFirstUnansweredQuestion = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/game/first-unanswered-question/`
                );

                const player = await axios.get(
                    `${api_url}/game/get-game/1/`
                )

                console.log(response.data)

                if (response.data) {
                    setCurrentQuestion(response.data.question_text)
                    setChoicesData(response.data.choices)
                    setUserId(player.data.player_id)
                }
            } catch (error) {
                console.error("Error loading first unanswered question or player id:", error)
            }
        };
        const shuffledChoices = shuffleArray(choicesData)
        setChoicesData(shuffledChoices)
        loadFirstUnansweredQuestion()
    }, []);

    useEffect(() => {
        const getPlayer = async () => {
            try {
                const player_id = await axios.get(
                    `${api_url}/player/get-player/${userId}/`
                )

                console.log(player_id.data)

                if (player_id.data) {
                    setUserName(player_id.data.name)
                }
            } catch (error) {
                console.error("Error loading player name:", error)
            }
        }
        getPlayer()
    }, [userId])

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleAnswerClick = (value) => {
        setAnswerClicked(true)
        setUserChoice(value)
    };

    const handleQuitGameClick = async () => {
        try {
            const response = await axios.delete(`${api_url}/game/delete-game/`, {})

            console.log(response.data)
        } catch (error) {
            console.error('Error deleting game:', error)
        }
    };

    const animation = useSpring({
        from: { y: 1000 },
        to: { y: 0 },
        opacity: 1,
        config: { tension: 320, friction: 20 }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1)
        }, 1000);

        const isGameFinish = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/game/get-game/1/`
                )

                if (response.data) {
                    const isAnsweredList = response.data.questions.map(question => question.is_answered);
                    console.log(isAnsweredList)
                    const allTrue = isAnsweredList.every(value => value === true);

                    if (allTrue) {
                        navigate("/score")
                    }
                }
            } catch (error) {
                console.error("Error loading question is answered name:", error)
            }
        }

        if (countdown === 0) {
            // Cache le timer
            setShowCountDown(false)
            // Mettre la question a is_answered = true
            const setQuestionAnswered = async () => {
                const response = await axios.put(
                    `${api_url}/game/set-question-answered/`
                );
                console.log(response.data)
            }
            setQuestionAnswered()
            // Si bonne réponse
            if (userChoice == true) {
                // Affichage du message de bonne réponse
                setGoodAnswer(true)
                // Augmenter le score du joueur
                const increaseScore = async () => {
                    const response = await axios.put(
                        `${api_url}/player/increase-score/${userId}/`
                    );
                    console.log(response.data)
                }
                increaseScore()
                setTimeout(() => {
                    isGameFinish()
                    navigate('/category')
                }, 5000)
            } if (userChoice == null) {
                setAnswerClicked(true)
                setNoAnswer(true)
                setTimeout(() => {
                    isGameFinish()
                    navigate('/category')
                }, 5000)
            } if (userChoice == false) {
                setBadAnswer(true)
                setTimeout(() => {
                    isGameFinish()
                    navigate('/category')
                }, 5000)
            }
        }

        return () => clearInterval(timer)
    }, [countdown]);

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
                right: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                margin: "20px "
            }}>
                <Typography sx={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontSize: "2em",
                    textTransform: "uppercase",
                }}>
                    {userName}
                </Typography>
                {showCountDown && (
                    <Typography sx={{
                        fontFamily: "Archivo Black, sans-serif",
                        fontSize: "2em",
                        textTransform: "uppercase",
                    }}>
                        {countdown} s
                    </Typography>
                )}
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
                    {currentQuestion}
                </Typography>
                <Grid container rowSpacing={1} justifyContent="center">
                    {choicesData.map((choice, index) => (
                        <Grid key={index} item xs={4} sx={{ margin: '10px' }}>
                            <Answer
                                label={choice.choice_text}
                                onClick={() => handleAnswerClick(choice.is_correct)}
                                disabled={answerClicked}
                            />
                        </Grid>
                    ))}
                </Grid>
                {goodAnswer && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                        <Typography sx={{
                            fontFamily: "Archivo Black, sans-serif",
                            fontSize: "2em",
                            color: "#FF934F"
                        }}>
                            Good Answer !
                        </Typography>
                    </Box>
                )}
                {badAnswer && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                        <Typography sx={{
                            fontFamily: "Archivo Black, sans-serif",
                            fontSize: "2em",
                            color: "#FF934F"
                        }}>
                            Bad Answer ...
                        </Typography>
                    </Box>
                )}
                {noAnswer && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                        <Typography sx={{
                            fontFamily: "Archivo Black, sans-serif",
                            fontSize: "2em",
                            color: "#FF934F"
                        }}>
                            Bah alors bouffon faut répondre ;)
                        </Typography>
                    </Box>
                )}
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
    );
}

export default Question;