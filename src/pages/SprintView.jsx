import { useMemo, useState } from "react";
import { bossQuestions } from "../data/simulationData.js";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";

export function SprintView({ onComplete, setBeaconMessage, sound }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [wrongSelections, setWrongSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const question = bossQuestions[index];

  const mastery = useMemo(() => correctCount * 10, [correctCount]);
  const hasWrongAttempt = wrongSelections.length > 0;

  function chooseAnswer(optionIndex) {
    if (selected !== null) return;
    if (wrongSelections.includes(optionIndex)) return;
    sound?.playSelect();
    if (optionIndex === question.correct) {
      const nextStreak = streak + 1;
      setSelected(optionIndex);
      setScore((value) => value + 1000 + nextStreak * 100);
      setCorrectCount((value) => value + 1);
      setStreak(nextStreak);
      setBestStreak((value) => Math.max(value, nextStreak));
      setBeaconMessage(nextStreak >= 2 ? "That streak is building. Keep checking denominators." : "Correct. Good evidence habit.", "correct");
      sound?.playCorrect();
    } else {
      setWrongSelections((items) => Array.from(new Set([...items, optionIndex])));
      setStreak(0);
      setBeaconMessage("Not quite. Try again before moving on. Read the group named in the question before choosing a denominator.", "incorrect");
      sound?.playIncorrect();
    }
  }

  function moveForward() {
    if (index === bossQuestions.length - 1) {
      onComplete("ido", 0);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setWrongSelections([]);
    sound?.playSelect();
  }

  function skipQuestion() {
    setStreak(0);
    setBeaconMessage("Skipped. Keep moving, and watch the denominator in the next question.", "thinking");
    moveForward();
  }

  if (!started) {
    return (
      <section className="studio-card sprint-intro">
        <span className="eyebrow">Fast Fluency</span>
        <h1>SHINE Sprint</h1>
        <p>Complete 10 quick questions about percentages and bivariate tables.</p>
        <div className="metric-grid">
          <div><strong>10</strong><span>Questions</span></div>
          <div><strong>60s</strong><span>Per question</span></div>
          <div><strong>85%</strong><span>Mastery goal</span></div>
        </div>
        <div className="button-row">
          <button className="primary-button" type="button" onClick={() => setStarted(true)}>Begin Sprint</button>
          <button className="secondary-button" type="button" onClick={() => onComplete("ido", 0)}>Skip to I Do</button>
        </div>
      </section>
    );
  }

  return (
    <section className="studio-card sprint-card">
      <div className="sprint-topline">
        <span className="badge">Question {index + 1} of {bossQuestions.length}</span>
        <span className="badge">Score {score.toLocaleString()}</span>
        <span className="badge">Streak {streak}</span>
        <span className="badge">Mastery {mastery}%</span>
      </div>

      <h1>{question.question}</h1>
      <div className="answer-grid">
        {question.options.map((option, optionIndex) => (
          <button
            key={option}
            className={[
              "answer-option",
              selected === optionIndex ? "selected" : "",
              selected === optionIndex && optionIndex === question.correct ? "correct" : "",
              wrongSelections.includes(optionIndex) ? "incorrect" : ""
            ].join(" ")}
            disabled={selected !== null || wrongSelections.includes(optionIndex)}
            type="button"
            onClick={() => chooseAnswer(optionIndex)}
          >
            {option}
          </button>
        ))}
      </div>

      {(selected !== null || hasWrongAttempt) && (
        <>
          <FeedbackPanel tone={selected === question.correct ? "success" : "error"} title={selected === question.correct ? "Correct" : "Try again"}>
            {selected === question.correct
              ? question.explanation
              : "That answer is not it yet. Use another attempt, or skip this question and keep your sprint moving."}
          </FeedbackPanel>
          {selected === question.correct ? (
            <button className="primary-button" type="button" onClick={moveForward}>
              {index === bossQuestions.length - 1 ? "Continue to I Do" : "Next Question"}
            </button>
          ) : (
            <button className="secondary-button" type="button" onClick={skipQuestion}>Skip This Question</button>
          )}
        </>
      )}
      <p className="helper-text">Best streak: {bestStreak}</p>
    </section>
  );
}
