import { useMemo, useState } from "react";
import { Check, Lightbulb, Play } from "lucide-react";
import { BeaconSidebar } from "../components/BeaconSidebar.jsx";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";
import { challengePathData, challengePathSkills, challengeQuestions, skillQuestionGroups } from "../data/simulationData.js";

function normalizeAnswer(value) {
  return Number(String(value).replace(/[$,%\s]/g, "").replace(/,/g, ""));
}

function getPathQuestion(pathIndex, questionIndex) {
  return challengePathData[pathIndex]?.questions[questionIndex] || null;
}

export function CurrentSimulationView({
  mode = "challenge",
  skillId = "",
  onAward,
  setBeaconMessage,
  onBeaconAction,
  sound
}) {
  const [currentSkillId, setCurrentSkillId] = useState(skillId);
  const selectedSkillGroup = skillQuestionGroups.find((group) => group.id === currentSkillId);
  const initialQuestion = selectedSkillGroup?.questions[0];
  const [selectedPathIndex, setSelectedPathIndex] = useState(
    mode === "path" ? null : initialQuestion?.pathIndex ?? 0
  );
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(
    initialQuestion?.questionIndex ?? 0
  );
  const [completed, setCompleted] = useState([]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  const activePath = selectedPathIndex === null ? null : challengePathData[selectedPathIndex];
  const activeQuestion = selectedPathIndex === null ? null : getPathQuestion(selectedPathIndex, selectedQuestionIndex);
  const activeQuestionId = activeQuestion ? `${activePath.id}-${selectedQuestionIndex + 1}` : "";
  const visibleQuestions = mode === "skill" && selectedSkillGroup ? selectedSkillGroup.questions : activePath?.questions || [];
  const totalQuestions = mode === "skill" && selectedSkillGroup ? selectedSkillGroup.questions.length : challengeQuestions.length;
  const completedCount = completed.length;
  const progress = totalQuestions ? Math.round((completedCount / totalQuestions) * 100) : 0;

  const title = mode === "skill" && selectedSkillGroup ? selectedSkillGroup.title : "Health Care Costs in Riverton";
  const intro = mode === "skill" && selectedSkillGroup
    ? selectedSkillGroup.description
    : "Use data to make an evidence-based decision.";

  function resetFeedback() {
    setAnswer("");
    setFeedback(null);
    setWrongAttempts(0);
    setHintUsed(false);
  }

  function selectQuestion(pathIndex, questionIndex) {
    setSelectedPathIndex(pathIndex);
    setSelectedQuestionIndex(questionIndex);
    resetFeedback();
    const questionNumber = questionIndex + 1;
    const message = `Question ${questionNumber}: Read the dataset, identify the needed values, then enter your answer.`;
    setBeaconMessage?.(message);
    sound?.playSelect();
  }

  function returnToChallengeList() {
    setSelectedPathIndex(null);
    setSelectedQuestionIndex(0);
    resetFeedback();
    setBeaconMessage?.("Choose a challenge path to open its five-question sequence.");
    sound?.playSelect();
  }

  function returnToSkillsList() {
    setSelectedPathIndex(null);
    setSelectedQuestionIndex(0);
    resetFeedback();
    setBeaconMessage?.("Choose a skill to open its five-question practice set.");
    sound?.playSelect();
  }

  function selectSkill(nextSkillId) {
    const nextGroup = skillQuestionGroups.find((group) => group.id === nextSkillId);
    const firstQuestion = nextGroup?.questions[0];
    if (!firstQuestion) return;
    setCurrentSkillId(nextSkillId);
    selectQuestion(firstQuestion.pathIndex, firstQuestion.questionIndex);
  }

  function showHint() {
    if (!activeQuestion) return;
    setHintUsed(true);
    setFeedback({ tone: "success", title: "Beacon Hint", text: activeQuestion.helper });
    setBeaconMessage?.(activeQuestion.helper);
    sound?.playHint();
  }

  function explainData() {
    if (!activeQuestion) return;
    const rows = activeQuestion.rows.map((row) => row.join(" | ")).join("; ");
    const text = `${activeQuestion.datasetTitle} shows the values needed for this task: ${rows}. First identify which row or value answers the question, then decide whether you need a percentage, total, difference, or average.`;
    setFeedback({ tone: "success", title: "Data Overview", text });
    setBeaconMessage?.("I explained the dataset without giving away the calculation hint.");
    sound?.playSelect();
  }

  function checkAnswer() {
    if (!activeQuestion) return;
    const numeric = normalizeAnswer(answer);
    const tolerance = activeQuestion.expected % 1 === 0 ? 0.01 : 0.05;
    const isCorrect = Math.abs(numeric - activeQuestion.expected) <= tolerance;

    if (isCorrect) {
      setFeedback({ tone: "success", title: "Correct", text: activeQuestion.feedback });
      setCompleted((items) => Array.from(new Set([...items, activeQuestionId])));
      setBeaconMessage?.("Correct. Nice evidence move. Use the result to explain what is happening in context.");
      onAward?.(25);
      sound?.playCorrect();
      return;
    }

    setWrongAttempts((value) => value + 1);
    setFeedback({
      tone: "error",
      title: "Try Again",
      text: "Not quite. Recheck the operation, denominator, and units. You can try again or skip this question."
    });
    setBeaconMessage?.("Not quite. Try another answer before moving on, or skip this question if you want to keep your path moving.");
    sound?.playIncorrect();
  }

  function getNextQuestion() {
    if (mode === "skill" && selectedSkillGroup) {
      const currentFlatIndex = selectedSkillGroup.questions.findIndex((question) => question.id === activeQuestionId);
      return selectedSkillGroup.questions[currentFlatIndex + 1] || null;
    }

    const nextQuestionIndex = selectedQuestionIndex + 1;
    if (activePath && nextQuestionIndex < activePath.questions.length) {
      return {
        pathIndex: selectedPathIndex,
        questionIndex: nextQuestionIndex
      };
    }

    const nextPathIndex = selectedPathIndex + 1;
    if (nextPathIndex < challengePathData.length) {
      return {
        pathIndex: nextPathIndex,
        questionIndex: 0
      };
    }

    return null;
  }

  function moveNext() {
    const next = getNextQuestion();
    if (!next) {
      setBeaconMessage?.("Challenge path complete. You have worked through the full Riverton evidence story.");
      sound?.playSimulationComplete();
      return;
    }
    selectQuestion(next.pathIndex, next.questionIndex);
  }

  function skipQuestion() {
    if (activeQuestionId) {
      setCompleted((items) => Array.from(new Set([...items, activeQuestionId])));
    }
    setBeaconMessage?.("Skipped. Keep moving and use the next question to rebuild momentum.");
    moveNext();
  }

  function handleBeaconAction(action) {
    if (action === "Give me a hint") {
      showHint();
      return;
    }
    if (action === "Explain the data") {
      explainData();
      return;
    }
    if (action === "Check my thinking") {
      checkAnswer();
      return;
    }
    setFeedback({
      tone: "success",
      title: "Big Picture",
      text: "Connect the calculation to who is affected, how large the issue is, and what action the evidence supports."
    });
    setBeaconMessage?.("Connect the number to the decision Riverton needs to make.");
    onBeaconAction?.(action);
  }

  const nextQuestion = selectedPathIndex === null ? null : getNextQuestion();
  const nextButtonLabel = !nextQuestion
    ? "Finish Path"
    : nextQuestion.pathIndex !== selectedPathIndex
      ? "Move to Next Challenge"
      : "Next Question";
  const backLabel = mode === "skill" ? "Back to Skills" : "Back to Challenge Path";
  const handleBack = mode === "skill" ? returnToSkillsList : returnToChallengeList;

  if (selectedPathIndex === null) {
    if (mode === "skill") {
      return (
        <main className="challenge-path-home">
          <section className="studio-card challenge-path-hero">
            <span className="eyebrow">Explore Skills</span>
            <h1>Choose a Skill</h1>
            <p>Each skill contains 5 questions, one pulled from each challenge path.</p>
            <div className="challenge-summary-grid">
              <div className="summary-tile">
                <span>Skills</span>
                <strong>{challengePathSkills.length}</strong>
                <small>practice groups</small>
              </div>
              <div className="summary-tile">
                <span>Questions</span>
                <strong>{challengeQuestions.length}</strong>
                <small>shared mock questions</small>
              </div>
            </div>
          </section>

          <section className="challenge-list">
            {skillQuestionGroups.map((group) => (
              <button className="challenge-list-card" type="button" key={group.id} onClick={() => selectSkill(group.id)}>
                <span className="skill-status"><Play size={16} /></span>
                <span>
                  <strong>{group.title}</strong>
                  <small>{group.questions.length} questions | {group.description}</small>
                </span>
              </button>
            ))}
          </section>
        </main>
      );
    }

    return (
      <main className="challenge-path-home">
        <section className="challenge-list">
          {challengePathData.map((path, index) => (
            <button className="challenge-list-card" type="button" key={path.id} onClick={() => selectQuestion(index, 0)}>
              <span className="skill-status"><Play size={16} /></span>
              <span>
                <strong>{path.title}</strong>
                <small>{path.questions.length} questions | {path.description}</small>
              </span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  const isCorrect = feedback?.tone === "success" && feedback?.title === "Correct";
  const activeDisplayIndex = Math.max(
    0,
    visibleQuestions.findIndex((question) => {
      const path = challengePathData[question.pathIndex ?? selectedPathIndex];
      const questionIndex = question.questionIndex ?? activePath.questions.indexOf(question);
      const questionId = question.id || `${path.id}-${questionIndex + 1}`;
      return questionId === activeQuestionId;
    })
  );

  return (
    <main className="current-simulation-view is-active challenge-player">
      <section className="current-simulation-panel studio-card" aria-label="Challenge path">
        <div className="quest-card current-simulation-summary">
          <span className="eyebrow">{mode === "skill" ? "Skill Practice" : "Challenge Path"}</span>
          <strong>{title}</strong>
          <span>{intro}</span>
          <button
            className="path-back-button"
            type="button"
            onClick={handleBack}
          >
            {backLabel}
          </button>
        </div>

        <ProgressBar value={progress} label="Question Progress" />

        <div className="simulation-step-list">
          {visibleQuestions.map((question, displayIndex) => {
            const path = challengePathData[question.pathIndex ?? selectedPathIndex];
            const questionIndex = question.questionIndex ?? activePath.questions.indexOf(question);
            const questionId = question.id || `${path.id}-${questionIndex + 1}`;
            const isActive = path.id === activePath.id && questionIndex === selectedQuestionIndex;
            return (
              <button
                className={[
                  "simulation-step-card",
                  isActive ? "active" : "",
                  completed.includes(questionId) ? "complete" : ""
                ].join(" ")}
                type="button"
                key={questionId}
                onClick={() => selectQuestion(question.pathIndex ?? selectedPathIndex, questionIndex)}
              >
                <span className="skill-status">{completed.includes(questionId) ? <Check size={16} /> : <Play size={16} />}</span>
                <span>
                  <strong>Question {displayIndex + 1}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="current-simulation-workspace" aria-label={activeQuestion.prompt}>
        <section className="studio-card challenge-work-card">
          <div className="challenge-work-actions">
            <button className="path-back-button" type="button" onClick={handleBack}>
              {backLabel}
            </button>
          </div>

          <div className="challenge-headline">
            <div>
              <span className="eyebrow">
                Question {activeDisplayIndex + 1} of {visibleQuestions.length}
              </span>
              <h1>{activePath.title}</h1>
              <p>{activePath.description}</p>
            </div>
          </div>

          <div className="challenge-data-table">
            <strong>{activeQuestion.datasetTitle}</strong>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Residents / Value</th>
                    <th scope="col">Rate / Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {activeQuestion.rows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prompt-card">
            <strong>{activeQuestion.prompt}</strong>
            {hintUsed && <span>{activeQuestion.helper}</span>}
          </div>

          <div className="answer-row challenge-answer-row">
            <label className="answer-input-label" htmlFor="challenge-answer">Your answer</label>
            <div className="challenge-answer-input">
              {activeQuestion.prefix && <span>{activeQuestion.prefix}</span>}
              <input
                id="challenge-answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Enter answer"
                inputMode="decimal"
              />
              {activeQuestion.suffix && <span>{activeQuestion.suffix}</span>}
            </div>
            <button className="secondary-button" type="button" onClick={showHint}>
              <Lightbulb size={16} /> Hint
            </button>
            <button className="primary-button" type="button" onClick={checkAnswer}>Check Answer</button>
          </div>

          {feedback && (
            <FeedbackPanel tone={feedback.tone} title={feedback.title}>
              {feedback.text}
            </FeedbackPanel>
          )}

          <div className="button-row challenge-nav-actions">
            {isCorrect && (
              <button className="primary-button" type="button" onClick={moveNext}>
                {nextButtonLabel}
              </button>
            )}
            {wrongAttempts > 0 && !isCorrect && (
              <button className="secondary-button" type="button" onClick={skipQuestion}>Skip This Question</button>
            )}
          </div>
        </section>
      </section>

      <BeaconSidebar
        message={feedback?.text || "Start by identifying the total, the subgroup, and the calculation the question is asking for."}
        onQuickAction={handleBeaconAction}
      />
    </main>
  );
}
