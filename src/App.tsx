import React, { useState } from "react";
import QuestionCards from "./components/QuestionCards";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import { GlobalStyle, Wrapper  } from './AppStyles'


export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [card, setCard] = useState(false);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));
  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setCard(true);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;

      //check answer w/correct answer
      const correct = questions[number].correct_answer === answer;

      // add to score if correct

      if (correct) setScore((prev) => prev + 1);

      //save answer
      const AnswerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, AnswerObj]);
    }
  };

  const nextQuestion = () => {
    // move on unless last question

    const next = number + 1;

    if (next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1> React Quiz</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}

          <div className="card mt-5 pl-3 pr-3 pb-3 shadow p-3 mb-5 bg-white rounded">
      {!gameOver ? <p className="score">SCORE: { score }</p> : null}
      {/* {loading ? <p> Loading Questions... </p> : null} */}
      {loading && <p> Loading Questions... </p>}

      {!loading && !gameOver ? (
        <QuestionCards
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}

      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
        </div> 
        </Wrapper>
      </>
  );
}

export default App;
