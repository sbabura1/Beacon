import { useState } from "react";
import { bloodPressureTable, rowPercentTable } from "../data/simulationData.js";
import { DataTable } from "../components/DataTable.jsx";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";

export function YouDoView({ onComplete, onAward, setBeaconMessage, sound }) {
  const [tableMode, setTableMode] = useState(null);
  const [interpretation, setInterpretation] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [interpretationAwarded, setInterpretationAwarded] = useState(false);

  function showFrequencyTable() {
    setTableMode("frequency");
    onAward(15);
    setBeaconMessage("Good. The frequency table gives the raw counts. Next, use row percentages to compare fairly.", "listening");
    sound?.playSelect();
  }

  function showRowTable() {
    setTableMode("row");
    onAward(20);
    setBeaconMessage("Great. Row percentages make the pattern easier to compare across groups.", "thinking");
    sound?.playHint();
  }

  function submitInterpretation() {
    if (interpretation.includes("%") || interpretation.includes("75") || interpretation.includes("50") || interpretation.includes("25")) {
      setFeedback({ tone: "success", text: "Strong claim. You used quantitative evidence to compare groups." });
      if (!interpretationAwarded) {
        onAward(25);
        setInterpretationAwarded(true);
      }
      setBeaconMessage("Strong evidence move. You included numbers, so the claim is easier to trust.", "correct");
      sound?.playCorrect();
    } else {
      setFeedback({ tone: "error", text: "Good start. Add at least one percentage, then try again, or skip this question to keep moving." });
      setBeaconMessage("You have the idea. Add a percentage from the table, or skip this question and return later.", "incorrect");
      sound?.playIncorrect();
    }
  }

  return (
    <div className="view-stack">
      <section className="studio-card">
        <span className="eyebrow">Independent Practice</span>
        <h1>You Do: Build the Bivariate Table</h1>
        <label htmlFor="rows">Rows</label>
        <select id="rows" defaultValue="Exercise_Regularly">
          <option>Exercise_Regularly</option>
          <option>Gender</option>
          <option>Stress_Level</option>
        </select>
        <label htmlFor="columns">Columns</label>
        <select id="columns" defaultValue="Blood_Pressure">
          <option>Blood_Pressure</option>
          <option>Stress_Level</option>
          <option>Age_Group</option>
        </select>
        <div className="button-row">
          <button className="primary-button" type="button" onClick={showFrequencyTable}>Generate Frequency Table</button>
          <button className="secondary-button" type="button" onClick={showRowTable}>Calculate Row %</button>
        </div>
        {tableMode === "frequency" && <DataTable caption="Frequency table" rows={bloodPressureTable} />}
        {tableMode === "row" && <DataTable caption="Row percentage table" rows={rowPercentTable} percent />}
      </section>

      <section className="studio-card">
        <h2>Interpretation</h2>
        <textarea value={interpretation} onChange={(event) => setInterpretation(event.target.value)} placeholder="What pattern do you notice? Use percentages in your claim." />
        <div className="button-row">
          <button className="primary-button" type="button" onClick={submitInterpretation}>Submit Interpretation</button>
          {feedback?.tone === "success" && <button className="secondary-button" type="button" onClick={() => onComplete("brief", 0)}>Continue to Brief</button>}
          {feedback?.tone === "error" && <button className="secondary-button" type="button" onClick={() => onComplete("brief", 0)}>Skip This Question</button>}
        </div>
        {feedback && <FeedbackPanel tone={feedback.tone}>{feedback.text}</FeedbackPanel>}
      </section>
    </div>
  );
}
