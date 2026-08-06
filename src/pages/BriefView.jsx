import { useState } from "react";
import { FeedbackPanel } from "../components/FeedbackPanel.jsx";

export function BriefView({ onAward, setBeaconMessage, sound }) {
  const [submitted, setSubmitted] = useState(false);

  function submitBrief() {
    setSubmitted(true);
    onAward(40);
    setBeaconMessage("Simulation complete. Your brief has a claim, evidence, and a clear audience.", "celebrate");
    sound?.playSimulationComplete();
  }

  return (
    <section className="studio-card">
      <span className="eyebrow">Final Deliverable</span>
      <h1>QR Brief</h1>
      <p>Create a one-page brief for the campus health center.</p>
      <label htmlFor="researchQuestion">Research Question</label>
      <input id="researchQuestion" defaultValue="Does regular exercise appear to be associated with blood pressure among college students?" />
      <label htmlFor="claim">Evidence-Based Claim</label>
      <textarea id="claim" placeholder="Use one or more percentages from your table." />
      <label htmlFor="limitations">Limitations</label>
      <textarea id="limitations" placeholder="What can't this data tell us? Example: self-report, one campus, no causal claim." />
      <button className="primary-button" type="button" onClick={submitBrief}>Submit QR Brief</button>
      {submitted && <FeedbackPanel>QR Brief submitted. Your evidence-based claim was saved.</FeedbackPanel>}
    </section>
  );
}
