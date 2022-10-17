import { useState } from "react";
import Questions from "./components/Questions";
function App() {
  let [isStarted, setIsStarted] = useState(false);

  console.log("app generated");

  function toggleQuiz() {
    setIsStarted((x) => !x);
  }

  return (
    <div className="App">
      {isStarted ? (
        <Questions isStarted={isStarted} toggleQuiz={toggleQuiz} />
      ) : (
        <div className="start-page">
          <h1 className="start-title">Quizzical</h1>
          <p className="start-desc">Some description if needed</p>
          <button className="btn-start" onClick={toggleQuiz}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
