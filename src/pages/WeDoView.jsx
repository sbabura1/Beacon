import { useState } from "react";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";

export function WeDoView({ onComplete, onAward, setBeaconMessage, sound }) {
  const [denominator, setDenominator] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [awarded, setAwarded] = useState(false);

  function checkWork() {
    if (denominator === "80") {
      setFeedback({ tone: "success", text: "Correct: 40 divided by 80 times 100 = 50%. Half of students who do not exercise regularly have elevated blood pressure." });
      if (!awarded) {
        onAward(20);
        setAwarded(true);
      }
      setBeaconMessage("Correct. You compared within the non-exercising group and kept the conclusion in context.", "correct");
      sound?.playCorrect();
    } else {
      setFeedback({ tone: "error", text: "Check your denominator, then try again. The group is students who do not exercise regularly." });
      setBeaconMessage("Not quite yet. Try another denominator, or skip this question and keep moving.", "incorrect");
      sound?.playIncorrect();
    }
  }

  function showHint() {
    setFeedback({ tone: "success", text: "Beacon Hint: The phrase 'students who do not exercise regularly' tells you the group. Use that row total." });
    setBeaconMessage("Hint opened. Find the row for students who do not exercise regularly, then use its total.", "thinking");
    sound?.playHint();
  }

  return (
    <section className="studio-card">
      <span className="eyebrow">Guided Practice</span>
      <h1>We Do: Calculate Together</h1>
      <p>Now calculate the percentage of students who do not exercise regularly and have elevated blood pressure.</p>
      <label htmlFor="denominator">Choose the denominator</label>
      <select id="denominator" value={denominator} onChange={(event) => setDenominator(event.target.value)}>
        <option value="">Select one</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="200">200</option>
      </select>
      <label htmlFor="weExplain">Plain-English Explanation</label>
      <textarea id="weExplain" placeholder="Explain what the percentage means." />
      <div className="button-row">
        <button className="primary-button" type="button" onClick={checkWork}>Check My Work</button>
        <button className="secondary-button" type="button" onClick={showHint}>Show Hint</button>
        {feedback?.tone === "success" && <button className="secondary-button" type="button" onClick={() => onComplete("youdo", 0)}>Continue</button>}
        {feedback?.tone === "error" && <button className="secondary-button" type="button" onClick={() => onComplete("youdo", 0)}>Skip This Question</button>}
      </div>
      {feedback && <FeedbackPanel tone={feedback.tone}>{feedback.text}</FeedbackPanel>}
    </section>
  );
}
