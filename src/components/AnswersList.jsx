import React from "react";
import { Answer } from "./index";

const AnswersList = (props) => {
  return (
    <div className='c-grid__answer'>
      {/* props.answersはApp.jsxから受け取った配列（Answers） */}
      {props.answers.map((answer, index) => {
        return <Answer key={index.toString()} nextId={answer.nextId} content={answer.content} select={props.select} />
      })}
    </div>
  )
}

export default AnswersList