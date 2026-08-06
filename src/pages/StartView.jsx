import { bossQuestions, challengeSteps } from "../data/simulationData.js";

export function StartView({ onComplete }) {
  return (
    <div className="view-stack">
      <section className="studio-card">
        <div className="metric-grid metric-grid--compact">
          <div className="metric-card">
            <span className="metric-card__label">Challenge Steps</span>
            <strong className="metric-card__value">{challengeSteps.length}</strong>
            <span className="metric-card__description">Available in this simulation</span>
          </div>
          <div className="metric-card">
            <span className="metric-card__label">Sprint Questions</span>
            <strong className="metric-card__value">{bossQuestions.length}</strong>
            <span className="metric-card__description">From the current question set</span>
          </div>
        </div>

        <span className="eyebrow">Challenge Context</span>
        <h1>Start</h1>
        <p>Today you will investigate whether regular exercise appears to be associated with blood pressure among college students.</p>

        <div className="prompt-card">
          <strong>Research Question</strong>
          <span>Does regular exercise appear to be associated with blood pressure among college students?</span>
        </div>

        <label htmlFor="reflection">Initial Reflection</label>
        <textarea id="reflection" placeholder="What pattern do you expect to see?" />

        <button className="primary-button" type="button" onClick={() => onComplete("sprint", 10)}>
          Start SHINE Sprint
        </button>
      </section>

      <section className="studio-card">
        <h2>Learning Goal</h2>
        <p>Use percentages and two-way tables to make an evidence-based claim about student health data.</p>
        <div className="badge-row">
          <span className="badge">Percentages</span>
          <span className="badge">Two-way tables</span>
          <span className="badge">Evidence-based claim</span>
        </div>
      </section>
    </div>
  );
}
