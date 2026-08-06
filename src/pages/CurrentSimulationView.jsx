import { useMemo, useState } from "react";
import { Check, Lock, Play } from "lucide-react";
import { BeaconSidebar } from "../components/BeaconSidebar.jsx";
import { ProgressBar } from "../components/ProgressBar.jsx";
import { beaconMessages, challengeSteps, progressByRoute } from "../data/simulationData.js";
import { BriefView } from "./BriefView.jsx";
import { IDoView } from "./IDoView.jsx";
import { SprintView } from "./SprintView.jsx";
import { StartView } from "./StartView.jsx";
import { WeDoView } from "./WeDoView.jsx";
import { YouDoView } from "./YouDoView.jsx";

const simulationStepIds = ["start", "sprint", "ido", "wedo", "youdo", "brief"];

export function CurrentSimulationView({ onAward, setBeaconMessage, onBeaconAction, sound }) {
  const [selectedStep, setSelectedStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [localBeaconMessage, setLocalBeaconMessage] = useState(
    "Choose a step to open it in a focused dialog."
  );

  const steps = useMemo(
    () => challengeSteps.filter((step) => simulationStepIds.includes(step.id)),
    []
  );
  const activeStep = steps.find((step) => step.id === selectedStep);
  const progress = selectedStep ? progressByRoute[selectedStep] || 15 : 15;

  function selectStep(stepId) {
    setSelectedStep(stepId);
    setLocalBeaconMessage(beaconMessages[stepId] || beaconMessages.start);
    setBeaconMessage?.(beaconMessages[stepId] || beaconMessages.start);
    sound?.playSelect();
  }

  function award(points) {
    if (points > 0) {
      onAward?.(points);
    }
  }

  function completeAndSelect(nextStep, points = 0) {
    award(points);
    if (selectedStep) {
      setCompletedSteps((items) => Array.from(new Set([...items, selectedStep])));
    }
    sound?.playChallengeComplete();
    if (simulationStepIds.includes(nextStep)) {
      selectStep(nextStep);
      return;
    }
  }

  function updateBeacon(message) {
    setLocalBeaconMessage(message);
    setBeaconMessage?.(message);
  }

  function renderStep() {
    if (selectedStep === "start") return <StartView onComplete={completeAndSelect} />;
    if (selectedStep === "sprint") {
      return <SprintView onComplete={completeAndSelect} setBeaconMessage={updateBeacon} sound={sound} />;
    }
    if (selectedStep === "ido") {
      return <IDoView onComplete={completeAndSelect} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />;
    }
    if (selectedStep === "wedo") {
      return <WeDoView onComplete={completeAndSelect} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />;
    }
    if (selectedStep === "youdo") {
      return <YouDoView onComplete={completeAndSelect} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />;
    }
    return <BriefView onAward={award} setBeaconMessage={updateBeacon} sound={sound} />;
  }

  return (
    <main className={`current-simulation-view ${selectedStep ? "is-active" : ""}`}>
      <section className="current-simulation-panel studio-card" aria-label="Current simulation steps">
        <div className="quest-card current-simulation-summary">
          <span className="eyebrow">Current Simulation</span>
          <strong>Investigating Student Health</strong>
          <span>Percentages and two-way tables</span>
        </div>

        <ProgressBar value={progress} label="Challenge Progress" />

        {!selectedStep && (
          <div className="current-simulation-intro">
            <span className="eyebrow">Current Simulation</span>
            <h1>Choose a Simulation Step</h1>
            <p>Select a step to open it in a focused dialog.</p>
          </div>
        )}

        <div className="simulation-step-list">
          {steps.map((step) => {
            const isActive = step.id === selectedStep;
            const isComplete = completedSteps.includes(step.id);
            const isLocked = step.id === "brief" && !completedSteps.includes("youdo");

            return (
              <button
                className={[
                  "simulation-step-card",
                  isActive ? "active" : "",
                  isComplete ? "complete" : "",
                  isLocked ? "locked" : ""
                ].join(" ")}
                type="button"
                key={step.id}
                disabled={isLocked}
                aria-current={isActive ? "step" : undefined}
                onClick={() => selectStep(step.id)}
              >
                <span className="skill-status">
                  {isLocked ? <Lock size={16} /> : isComplete ? <Check size={16} /> : <Play size={16} />}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.skill}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {selectedStep && (
        <>
          <section className="current-simulation-workspace" aria-label={activeStep?.title || "Simulation step"}>
            {renderStep()}
          </section>
          <BeaconSidebar message={localBeaconMessage} onQuickAction={onBeaconAction} />
        </>
      )}
    </main>
  );
}
