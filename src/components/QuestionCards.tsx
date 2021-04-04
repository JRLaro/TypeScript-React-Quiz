import React from 'react'
import { NumberLiteralType } from 'typescript'
import {Wrapper, ButtonWrapper} from './QuestionStyles'

import { AnswerObj } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObj | undefined;
    questionNum: number;
    totalQuestions: number;
}

const QuestionCards: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => (
        <Wrapper>
        <p className="number">
            Question:  {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                > <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html:answer}} />
                </button> </ButtonWrapper>
))}
        </div>
        </Wrapper>
    )


export default QuestionCards
