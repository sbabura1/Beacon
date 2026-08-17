import { useMemo, useState } from "react";
import { Check, Flame, Globe2, Hospital, Lightbulb, Play, Search, ShieldQuestion, Trophy } from "lucide-react";
import { BeaconSidebar } from "../components/BeaconSidebar.jsx";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";
import {
  challengePathData,
  challengePathSkills,
  challengeQuestions,
  personaActivities,
  personaData,
  personaLevels,
  skillQuestionGroups
} from "../data/simulationData.js";

const levelIds = Object.keys(personaLevels);
const personaIconMap = {
  Hospital,
  Detective: ShieldQuestion,
  Globe: Globe2,
  Basketball: Trophy
};

function normalizeAnswer(value) {
  return Number(String(value).replace(/[$,%\s]/g, "").replace(/,/g, ""));
}

function getActivity(personaId, levelId, activityIndex) {
  return personaActivities.find(
    (activity) =>
      activity.personaId === personaId &&
      activity.levelId === levelId &&
      activity.activityIndex === activityIndex
  );
}

function getPersonaActivities(personaId, levelId) {
  return personaActivities.filter((activity) => activity.personaId === personaId && activity.levelId === levelId);
}

export function CurrentSimulationView({
  mode = "challenge",
  skillId = "",
  onAward,
  setBeaconMessage,
  onBeaconAction,
  sound
}) {
  const initialSkillGroup = skillQuestionGroups.find((group) => group.id === skillId);
  const initialSkillActivity = initialSkillGroup?.questions[0];
  const [selectedPersonaId, setSelectedPersonaId] = useState(
    mode === "path" || (mode === "skill" && !initialSkillActivity)
      ? null
      : initialSkillActivity?.personaId || personaData[0].id
  );
  const [selectedLevelId, setSelectedLevelId] = useState(
    initialSkillActivity?.levelId || (mode === "path" || mode === "skill" ? "" : "beginning")
  );
  const [activityIndex, setActivityIndex] = useState(initialSkillActivity?.activityIndex || 0);
  const [currentSkillId, setCurrentSkillId] = useState(skillId);
  const [completed, setCompleted] = useState([]);
  const [answer, setAnswer] = useState("");
  const [choice, setChoice] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [sidebarMessage, setSidebarMessage] = useState("");
  const [xpBursts, setXpBursts] = useState([]);
  const [progressPulse, setProgressPulse] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completionCelebration, setCompletionCelebration] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  const selectedPersona = personaData.find((persona) => persona.id === selectedPersonaId);
  const selectedSkillGroup = skillQuestionGroups.find((group) => group.id === currentSkillId);
  const activeActivity = selectedPersonaId === null || !selectedLevelId
    ? null
    : getActivity(selectedPersonaId, selectedLevelId, activityIndex);
  const visibleActivities = mode === "skill" && selectedSkillGroup
    ? selectedSkillGroup.questions
    : selectedPersonaId && selectedLevelId
      ? getPersonaActivities(selectedPersonaId, selectedLevelId)
      : [];
  const totalActivities = mode === "skill" && selectedSkillGroup ? selectedSkillGroup.questions.length : visibleActivities.length;
  const progress = totalActivities ? Math.round((completed.length / totalActivities) * 100) : 0;
  const title = mode === "skill" && selectedSkillGroup ? selectedSkillGroup.title : selectedPersona?.title || "Beacon Persona Simulations";
  const intro = mode === "skill" && selectedSkillGroup
    ? selectedSkillGroup.description
    : selectedPersona?.tag || "Choose a persona and mode to begin.";

  function resetFeedback() {
    setAnswer("");
    setChoice(null);
    setSelectedIssues([]);
    setFeedback(null);
    setSidebarMessage("");
    setWrongAttempts(0);
    setHintUsed(false);
    setCompletionCelebration(false);
  }

  function celebrateXp(points = 25) {
    const burstId = `${Date.now()}-${Math.random()}`;
    const particles = Array.from({ length: 7 }, (_, index) => ({
      id: `${burstId}-${index}`,
      points,
      drift: index - 2,
      delay: index * 55
    }));
    setXpBursts((items) => [...items, ...particles]);
    setProgressPulse((value) => value + 1);
    window.setTimeout(() => {
      setXpBursts((items) => items.filter((item) => !particles.some((particle) => particle.id === item.id)));
    }, 1400);
  }

  function selectActivity(personaId, levelId, nextActivityIndex) {
    setSelectedPersonaId(personaId);
    setSelectedLevelId(levelId);
    setActivityIndex(nextActivityIndex);
    resetFeedback();
    setBeaconMessage?.(`Activity ${nextActivityIndex + 1}: inspect, calculate, then decide what the result means.`);
    sound?.playSelect();
  }

  function selectPersona(personaId) {
    setSelectedPersonaId(personaId);
    setSelectedLevelId("");
    setActivityIndex(0);
    resetFeedback();
    const persona = personaData.find((item) => item.id === personaId);
    setBeaconMessage?.(`Choose a mode for ${persona?.title || "this persona"} before starting.`);
    sound?.playSelect();
  }

  function selectLevel(levelId) {
    if (!selectedPersonaId) return;
    selectActivity(selectedPersonaId, levelId, 0);
  }

  function selectSkill(nextSkillId) {
    const group = skillQuestionGroups.find((item) => item.id === nextSkillId);
    const first = group?.questions[0];
    if (!first) return;
    setCurrentSkillId(nextSkillId);
    selectActivity(first.personaId, first.levelId, first.activityIndex);
  }

  function returnToPersonaList() {
    setSelectedPersonaId(null);
    setSelectedLevelId("");
    setActivityIndex(0);
    resetFeedback();
    setBeaconMessage?.("Choose a persona path and mode.");
    sound?.playSelect();
  }

  function returnToModeList() {
    setSelectedLevelId("");
    setActivityIndex(0);
    resetFeedback();
    setBeaconMessage?.("Choose a mode for this persona.");
    sound?.playSelect();
  }

  function returnToSkillsList() {
    setSelectedPersonaId(null);
    setActivityIndex(0);
    resetFeedback();
    setBeaconMessage?.("Choose a skill group to practice across personas and modes.");
    sound?.playSelect();
  }

  function showHint() {
    if (!activeActivity) return;
    setHintUsed(true);
    setFeedback({ tone: "success", title: "Beacon Hint", text: activeActivity.helper });
    setSidebarMessage(activeActivity.helper);
    setBeaconMessage?.(activeActivity.helper);
    sound?.playHint();
  }

  function explainData() {
    if (!activeActivity) return;
    const text = activeActivity.activityType === "audit"
      ? "This table is raw evidence from the selected persona's work context. Read it for completeness, consistency, and unusual values before trusting the results."
      : "This table is the evidence for the current persona decision. Read the row labels, compare the available values, and keep the final answer tied to the scenario.";
    setSidebarMessage(text);
    setBeaconMessage?.("I explained the evidence without revealing the hint.");
    sound?.playSelect();
  }

  function checkAudit() {
    const correctIssueIndexes = activeActivity.correctIssueIndexes || [];
    const selectedSet = new Set(selectedIssues);
    const hasAllCorrect = correctIssueIndexes.every((index) => selectedSet.has(index));
    const hasOnlyCorrect = selectedIssues.every((index) => correctIssueIndexes.includes(index));
    const isCorrectAudit = selectedIssues.length === correctIssueIndexes.length && hasAllCorrect && hasOnlyCorrect;

    if (isCorrectAudit) {
      setStreak((value) => value + 1);
      setCompleted((items) => Array.from(new Set([...items, activeActivity.id])));
      setFeedback({ tone: "success", title: "Data Audit Complete", text: activeActivity.feedback });
      setSidebarMessage(activeActivity.feedback);
      setBeaconMessage?.("Good. Data cleaning is a reasoning task, not just a cleanup step.");
      onAward?.(25);
      celebrateXp(25);
      sound?.playCorrect();
      return;
    }

    setWrongAttempts((value) => value + 1);
    setStreak(0);
    setFeedback({
      tone: "error",
      title: "Keep Inspecting",
      text: `Select the ${correctIssueIndexes.length} true data-quality issues for the ${personaLevels[selectedLevelId].title} level. Extra non-issues will not pass.`
    });
    setSidebarMessage("Check completeness, validity, consistency, duplicates, and plausibility.");
    setBeaconMessage?.("Check completeness, validity, consistency, duplicates, and plausibility.");
    sound?.playIncorrect();
  }

  function checkQuestion() {
    const isChoice = activeActivity.answerType === "choice";
    const isCorrect = isChoice
      ? choice === activeActivity.expected
      : Math.abs(normalizeAnswer(answer) - activeActivity.expected) <= 0.05;

    if (isCorrect) {
      setStreak((value) => value + 1);
      setCompleted((items) => Array.from(new Set([...items, activeActivity.id])));
      setFeedback({ tone: "success", title: "Correct", text: activeActivity.feedback });
      setSidebarMessage(activeActivity.feedback);
      setBeaconMessage?.("Strong reasoning. Now ask what this result means for the decision.");
      onAward?.(25);
      celebrateXp(25);
      sound?.playCorrect();
      return;
    }

    setWrongAttempts((value) => value + 1);
    setStreak(0);
    setFeedback({
      tone: "error",
      title: "Try Again",
      text: "Not quite. Recheck the operation, denominator, units, comparison, or assumption."
    });
    setSidebarMessage("Reconstruct the relationship among the quantities before trying again.");
    setBeaconMessage?.("Reconstruct the relationship among the quantities before trying again.");
    sound?.playIncorrect();
  }

  function checkAnswer() {
    if (!activeActivity) return;
    if (activeActivity.activityType === "audit") {
      checkAudit();
      return;
    }
    checkQuestion();
  }

  function getNextActivity() {
    if (mode === "skill" && selectedSkillGroup) {
      const currentIndex = selectedSkillGroup.questions.findIndex((activity) => activity.id === activeActivity.id);
      return selectedSkillGroup.questions[currentIndex + 1] || null;
    }

    const nextIndex = activityIndex + 1;
    const samePersonaActivities = getPersonaActivities(selectedPersonaId, selectedLevelId);
    return samePersonaActivities.find((activity) => activity.activityIndex === nextIndex) || null;
  }

  function moveNext() {
    const next = getNextActivity();
    if (!next) {
      setBeaconMessage?.("Simulation complete. You inspected the data and worked through the persona reasoning path.");
      setCompletionCelebration(true);
      celebrateXp(50);
      sound?.playSimulationComplete();
      return;
    }
    selectActivity(next.personaId, next.levelId, next.activityIndex);
  }

  function skipActivity() {
    if (activeActivity) {
      setCompleted((items) => Array.from(new Set([...items, activeActivity.id])));
    }
    moveNext();
  }

  function handleBeaconAction(action) {
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
      title: "Decision Connection",
      text: `As a ${selectedPersona?.title || "professional"}, a calculation matters only if it changes a decision, reveals a trade-off, or tells you what evidence to collect next.`
    });
    setSidebarMessage("Numbers become useful when they inform action.");
    setBeaconMessage?.("Numbers become useful when they inform action.");
    onBeaconAction?.(action);
  }

  if (selectedPersonaId === null) {
    if (mode === "skill") {
      return (
        <main className="challenge-path-home">
          <section className="challenge-list">
            {skillQuestionGroups.map((group, index) => (
              <button
                className="challenge-list-card"
                type="button"
                key={group.id}
                onClick={() => selectSkill(group.id)}
                style={{ "--stagger-index": index }}
              >
                <span className="skill-status"><Play size={16} /></span>
                <span>
                  <strong>{group.title}</strong>
                  <small>{group.description}</small>
                </span>
                <span className="badge">{group.questions.length} activities</span>
              </button>
            ))}
          </section>
        </main>
      );
    }

    return (
      <main className="challenge-path-home">
        <section className="challenge-list persona-list">
          {personaData.map((persona, index) => {
            const PersonaIcon = personaIconMap[persona.icon] || Search;

            return (
              <button
                className="challenge-list-card persona-list-card"
                type="button"
                key={persona.id}
                onClick={() => selectPersona(persona.id)}
                style={{ "--persona-color": persona.color, "--stagger-index": index }}
              >
                <span className="persona-icon"><PersonaIcon size={24} /></span>
                <span>
                  <strong>{persona.title}</strong>
                  <small>{persona.tag}</small>
                  <small className="persona-challenge-description">{persona.challengeDescription}</small>
                </span>
              </button>
            );
          })}
        </section>
      </main>
    );
  }

  if (selectedPersonaId !== null && !selectedLevelId && mode !== "skill") {
    const PersonaIcon = personaIconMap[selectedPersona.icon] || Search;

    return (
      <main className="challenge-path-home">
        <section className="studio-card persona-mode-card" style={{ "--persona-color": selectedPersona.color }}>
          <div className="persona-mode-heading">
            <span className="persona-icon persona-icon-large"><PersonaIcon size={28} /></span>
            <div>
              <span className="eyebrow">Beacon Persona Simulations</span>
              <h1>{selectedPersona.title}</h1>
              <p>{selectedPersona.tag}</p>
            </div>
          </div>
          <button className="path-back-button" type="button" onClick={returnToPersonaList}>Back to Personas</button>
        </section>

        <section className="level-picker">
          {levelIds.map((levelId, index) => (
            <button
              className="level-chip"
              type="button"
              key={levelId}
              onClick={() => selectLevel(levelId)}
              style={{ "--stagger-index": index }}
            >
              <strong>{personaLevels[levelId].title}</strong>
              <span>{personaLevels[levelId].description}</span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  const isCorrect = feedback?.tone === "success" && (feedback.title === "Correct" || feedback.title === "Data Audit Complete");
  const backLabel = mode === "skill" ? "Back to Skills" : "Back to Modes";
  const handleBack = mode === "skill" ? returnToSkillsList : returnToModeList;
  const activeDisplayIndex = Math.max(0, visibleActivities.findIndex((activity) => activity.id === activeActivity.id));
  const nextActivity = getNextActivity();
  const nextButtonLabel = nextActivity ? "Next Activity" : "Finish Simulation";

  return (
    <main
      className={[
        "current-simulation-view is-active challenge-player",
        feedback?.tone === "success" ? "answer-success" : "",
        feedback?.tone === "error" ? "answer-error" : "",
        completionCelebration ? "simulation-complete" : ""
      ].join(" ")}
      style={{ "--persona-color": selectedPersona.color }}
    >
      <section className="current-simulation-panel studio-card" aria-label="Persona path">
        <div className="quest-card current-simulation-summary persona-summary">
          <span className="eyebrow">{mode === "skill" ? "Skill Practice" : "Persona Path"}</span>
          <strong>{title}</strong>
          <span>{intro}</span>
          <button className="path-back-button" type="button" onClick={handleBack}>{backLabel}</button>
        </div>

        <div className="progress-celebration-target" data-pulse={progressPulse} key={progressPulse}>
          <ProgressBar value={progress} label="Activity Progress" />
        </div>
        {streak >= 2 && (
          <div className="streak-badge" aria-live="polite">
            <Flame size={14} aria-hidden="true" />
            <strong>{streak}</strong>
          </div>
        )}

        <div className="simulation-step-list">
          {visibleActivities.map((activity, displayIndex) => {
            const isActive = activity.id === activeActivity.id;
            return (
              <button
                className={[
                  "simulation-step-card",
                  isActive ? "active" : "",
                  completed.includes(activity.id) ? "complete" : ""
                ].join(" ")}
                type="button"
                key={activity.id}
                onClick={() => selectActivity(activity.personaId, activity.levelId, activity.activityIndex)}
              >
                <span className="skill-status">{completed.includes(activity.id) ? <Check size={16} /> : <Play size={16} />}</span>
                <span>
                  <strong>Activity {displayIndex + 1}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="current-simulation-workspace" aria-label={activeActivity.prompt}>
        <div className="xp-burst-layer" aria-hidden="true">
          {xpBursts.map((burst, index) => (
            <span
              className="xp-burst"
              style={{
                "--burst-index": index,
                "--burst-drift": burst.drift,
                "--burst-delay": `${burst.delay}ms`
              }}
              key={burst.id}
            >
              +{burst.points} XP
            </span>
          ))}
        </div>
        <section className="studio-card challenge-work-card" key={activeActivity.id}>
          <div className="challenge-work-actions">
            <button className="path-back-button" type="button" onClick={handleBack}>{backLabel}</button>
          </div>

          <div className="challenge-headline">
            <div>
              <span className="eyebrow">
                {personaLevels[selectedLevelId].title} | Activity {activeDisplayIndex + 1} of {visibleActivities.length}
              </span>
              <h1>{activeActivity.activityType === "audit" ? "Data Quality Audit" : activeActivity.title}</h1>
              <p>{activeActivity.scenario}</p>
            </div>
          </div>

          {activeActivity.activityType === "audit" && (
            <div className="challenge-data-table" key={`${activeActivity.id}-table`}>
              <strong>{selectedPersona.title} Raw Data</strong>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {selectedPersona.sheet.headers.map((header) => <th scope="col" key={header}>{header}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPersona.sheet.rows.map((row, rowIndex) => (
                      <tr key={row.join("-") || rowIndex}>
                        <th scope="row">{rowIndex + 2}</th>
                        {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell || "-"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeActivity.activityType === "audit" ? (
            <div className="audit-grid">
              {(activeActivity.auditIssues || selectedPersona.sheet.issues).map((issue, index) => (
                <button
                  className={[
                    "audit-issue",
                    selectedIssues.includes(index) ? "selected" : "",
                    isCorrect && selectedIssues.includes(index) ? "correct" : "",
                    feedback?.tone === "error" && selectedIssues.includes(index) ? "incorrect" : ""
                  ].join(" ")}
                  type="button"
                  key={issue[0]}
                  onClick={() => setSelectedIssues((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])}
                >
                  <strong>{issue[0]}</strong>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="prompt-card">
                <strong>{activeActivity.prompt}</strong>
                {hintUsed && <span>{activeActivity.helper}</span>}
              </div>

              {activeActivity.answerType === "choice" ? (
                <div className="choice-grid">
                  {activeActivity.options.map((option, index) => (
                    <button
                      className={[
                        "answer-option",
                        choice === index ? "selected" : "",
                        isCorrect && choice === index ? "correct" : "",
                        feedback?.tone === "error" && choice === index ? "incorrect" : ""
                      ].join(" ")}
                      type="button"
                      key={option}
                      onClick={() => setChoice(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="answer-row challenge-answer-row">
                  <label className="answer-input-label" htmlFor="challenge-answer">Your answer</label>
                  <div className="challenge-answer-input">
                    {activeActivity.prefix && <span>{activeActivity.prefix}</span>}
                    <input
                      id="challenge-answer"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      placeholder="Enter answer"
                      inputMode="decimal"
                    />
                    {activeActivity.suffix && <span>{activeActivity.suffix}</span>}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="button-row challenge-nav-actions">
            {isCorrect ? (
              <button className="primary-button" type="button" onClick={moveNext}>{nextButtonLabel}</button>
            ) : (
              <>
                <button className="secondary-button" type="button" onClick={showHint}><Lightbulb size={16} /> Hint</button>
                <button className="primary-button" type="button" onClick={checkAnswer}>
                  {activeActivity.activityType === "audit" ? "Check Data Audit" : "Check Reasoning"}
                </button>
              </>
            )}
          </div>

          {feedback && (
            <FeedbackPanel tone={feedback.tone} title={feedback.title}>
              {feedback.text}
            </FeedbackPanel>
          )}

          <div className="button-row challenge-nav-actions">
            {wrongAttempts > 0 && !isCorrect && <button className="secondary-button" type="button" onClick={skipActivity}>Skip This Activity</button>}
          </div>
        </section>
      </section>

      <BeaconSidebar
        message={sidebarMessage}
        onQuickAction={handleBeaconAction}
      />
      {completionCelebration && (
        <div className="completion-overlay" role="status" aria-live="polite">
          <div className="completion-card">
            <span className="eyebrow">Simulation Complete</span>
            <strong>+50 XP Bonus</strong>
            <p>Nice finish. Choose another persona or skill when you are ready.</p>
            <button className="primary-button" type="button" onClick={handleBack}>Choose Next</button>
          </div>
        </div>
      )}
    </main>
  );
}
