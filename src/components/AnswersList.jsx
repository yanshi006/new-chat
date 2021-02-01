import React from "react";
import { Answer } from "./index";

const AnswersList = ({answers, select}) => {
  return (
    <div className='c-grid__answer'>
      {/* answersはApp.jsxから受け取った配列（Answers） */}
      {answers.map((answer, index) => {
        return <Answer key={index.toString()} nextId={answer.nextId} content={answer.content} select={select} />
      })}
    </div>
  )
}

export default AnswersList