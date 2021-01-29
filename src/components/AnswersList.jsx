import React from "react";
import { Answer } from "./index";

const AnswersList = (props) => {
  return (
    <div className='c-grid__answer'>
      {/* props.answersはApp.jsxから受け取った配列（Answers） */}
      {props.answers.map((value, index) => {
        return <Answer key={index.toString()} content={value.content} />
      })}
    </div>
  )
}

export default AnswersList