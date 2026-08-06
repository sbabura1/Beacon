import { useState } from "react";
import { bloodPressureTable } from "../data/simulationData.js";
import { DataTable } from "../components/DataTable.jsx";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";

export function IDoView({ onComplete, onAward, setBeaconMessage, sound }) {
  const [selectedDenominator, setSelectedDenominator] = useState("");
  const [awarded, setAwarded] = useState(false);
  const isCorrect = selectedDenominator === "120";

  function chooseDenominator(value) {
    setSelectedDenominator(value);
    if (value === "120") {
      if (!awarded) {
        onAward(10);
        setAwarded(true);
      }
      setBeaconMessage("Nice work. You selected the row total, so your percentage has the right denominator.", "correct");
      sound?.playCorrect();
    } else {
      setBeaconMessage("Pause and try again. Find the group named in the question; the denominator should be that group total.", "incorrect");
      sound?.playIncorrect();
    }
  }

  return (
    <div className="view-stack">
      <section className="studio-card">
        <span className="eyebrow">Worked Example</span>
        <h1>I Do: Worked Example</h1>
        <div className="prompt-card">
          <strong>Question</strong>
          <span>What percentage of students who exercise regularly have normal blood pressure?</span>
        </div>
        <p><strong>Step 1:</strong> Click the correct denominator.</p>
        <DataTable
          caption="Exercise and blood pressure frequency table"
          rows={bloodPressureTable}
          selectableDenominator="120"
          selectedValue={selectedDenominator}
          onSelect={chooseDenominator}
        />
        {selectedDenominator && (
          <FeedbackPanel tone={isCorrect ? "success" : "error"} title={isCorrect ? "Correct" : "Not quite"}>
            {isCorrect
              ? "The denominator is 120 because the question asks about students within the Exercise Regularly = Yes group."
              : "The denominator should be the total number of students in the group named by the question."}
          </FeedbackPanel>
        )}
        {isCorrect && <div className="calculation-card">90 divided by 120 times 100 = <strong>75%</strong></div>}
        <div className="button-row">
          {isCorrect && <button className="primary-button" type="button" onClick={() => onComplete("wedo", 20)}>Continue to We Do</button>}
          {selectedDenominator && !isCorrect && (
            <button className="secondary-button" type="button" onClick={() => onComplete("wedo", 0)}>Skip This Question</button>
          )}
        </div>
      </section>

      <section className="studio-card">
        <h2>I Do Video</h2>
        <iframe
          className="video-frame"
          title="I Do worked example video"
          src="https://drive.google.com/file/d/1yKJuRfcAX64USHwy8U4PmFyWKlXjGzZl/preview"
          allow="autoplay"
        />
      </section>
    </div>
  );
}
