import { useState, useEffect } from "react";
import Question from "./Question";

function Questions(props) {
  let [questions, setQuestions] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [checkAnswers, setCheckAnswers] = useState(false);

  console.log("Questions generated");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  useEffect(() => {
    async function getQuestions() {
      let res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=32&difficulty=medium&type=multiple"
      );
      let data = await res.json();
      let newData = data.results.map((x, i) => ({
        ...x,
        id: i,
        selected: "",
        allAnswers: shuffleArray([...x.incorrect_answers, x.correct_answer]),
      }));
      setQuestions(newData);
      setIsLoading(false);
    }

    getQuestions();
  }, [props.isStarted]);

  function selectAnswer(questionId, selected) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId) {
          return { ...q, selected: selected };
        } else {
          return q;
        }
      })
    );
  }

  let questionElements = questions.map((data, i) => (
    <Question
      key={i}
      id={data.id}
      question={data.question}
      correct={data.correct_answer}
      allAnswers={data.allAnswers}
      selected={data.selected}
      check={checkAnswers}
      handleSelect={selectAnswer}
    />
  ));

  return (
    <div>
      {isLoading ? (
        <img src="/images/loading.gif" className="loading" />
      ) : (
        <div className="all-questions">
          {questionElements}
          {checkAnswers ? (
            <div className="score-box">
              <p className="score-text">
                You scored{" "}
                {
                  questions.filter((x) => x.correct_answer === x.selected)
                    .length
                }
                /5 correct answers
              </p>
              <button onClick={props.toggleQuiz}>Play again</button>
            </div>
          ) : (
            <button
              onClick={() => {
                setCheckAnswers((x) => !x);
              }}
            >
              Check answers
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Questions;
