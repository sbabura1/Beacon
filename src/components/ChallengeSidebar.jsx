import { Check, Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar.jsx";

export function ChallengeSidebar({ steps, currentRoute, completedRoutes, progress, onNavigate }) {
  return (
    <aside className="challenge-sidebar" aria-label="Challenge path">
      <div className="quest-card">
        <span className="eyebrow">Current Simulation</span>
        <strong>Investigating Student Health</strong>
        <span>Percentages and two-way tables</span>
      </div>

      <ProgressBar value={progress} label="Challenge Progress" />

      <div className="step-list">
        {steps.map((step) => {
          const isActive = step.id === currentRoute;
          const isComplete = completedRoutes.includes(step.id);
          const isLocked = step.id === "brief" && !completedRoutes.includes("youdo");

          return (
            <button
              className={[
                "challenge-step",
                isActive ? "active" : "",
                isComplete ? "complete" : "",
                isLocked ? "locked" : ""
              ].join(" ")}
              disabled={isLocked}
              aria-current={isActive ? "step" : undefined}
              key={step.id}
              type="button"
              onClick={() => onNavigate(step.id)}
            >
              <span className="step-number">{isComplete ? <Check size={16} /> : step.number}</span>
              <span className="step-copy">
                <strong>{step.title}</strong>
                <small>{step.skill}</small>
                <span className="sr-only">
                  {isActive ? "Active challenge. " : ""}
                  {isComplete ? "Completed. " : ""}
                  {isLocked ? "Locked. " : ""}
                </span>
              </span>
              {isLocked && <Lock size={16} aria-label="Locked" />}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
