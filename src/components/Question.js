import { useState, useEffect } from "react";

function Question(props) {
  function getStatus(x) {
    if (props.check)
      if (x == props.selected && x != props.correct) {
        return "incorrect";
      } else if (x == props.correct) {
        return "correct";
      } else {
        return "disable";
      }
  }
  let elements = props.allAnswers.map((x) => (
    <span
      className={`${props.selected === x && "selected"} ${getStatus(x)} answer`}
      onClick={() => props.handleSelect(props.id, x)}
    >
      {x}
    </span>
  ));

  return (
    <div>
      <p className="question">{props.question}</p>
      <div className="answers">{elements}</div>
      <hr />
    </div>
  );
}

export default Question;
