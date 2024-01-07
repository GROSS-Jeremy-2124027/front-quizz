import React, { useState, useEffect } from 'react';

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=30&encode=base64');
                const data = await response.json();

                if (data.results) {
                    setQuestions(data.results);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div>
            <h1>Quiz Questions</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <p>{atob(question.question)}</p>
                        <ul>
                            {question.incorrect_answers.map((answer, ansIndex) => (
                                <li key={ansIndex}>{atob(answer)}</li>
                            ))}
                            <li>{atob(question.correct_answer)}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizComponent;