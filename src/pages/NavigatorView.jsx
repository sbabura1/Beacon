import { useState } from "react";
import { Circle, Moon, Settings, ShieldAlert, Square } from "lucide-react";
import { careerPathways, learner } from "../data/navigatorData.js";
import { challengePathData, challengePathSkills, challengeQuestions, personaLevels, skillQuestionGroups } from "../data/simulationData.js";
import { ProgressBar } from "../components/ProgressBar.jsx";
import { AppTitleCard } from "../components/AppTitleCard.jsx";
import { StudentAvatar } from "../components/StudentAvatar.jsx";
import rishiAvatarUrl from "../assets/student-avatar-rishi.png";

const iconMap = {
  square: Square,
  moon: Moon,
  gear: Settings,
  risk: ShieldAlert
};

const constellationPositions = ["top-node wide", "middle-node active wide", "left-node wide", "right-node wide", "bottom-node active wide"];

export function NavigatorView({ onOpenSimulation, onOpenChallengePath, onOpenSkillPath, soundEnabled, onToggleSound, theme, onToggleTheme }) {
  const [view, setView] = useState("home");
  const [selectedSkill, setSelectedSkill] = useState(null);

  function openDetail(item, sourceView = view) {
    setSelectedSkill({ ...item, sourceView });
    setView("detail");
  }

  function goHome() {
    setSelectedSkill(null);
    setView("home");
  }

  function returnToSource() {
    setView(selectedSkill?.sourceView || "home");
    setSelectedSkill(null);
  }

  return (
    <div className="shine-app navigator-shell">
      <AppTitleCard
        onHome={goHome}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main className="navigator-scroll">
        {view === "home" && (
          <>
            <section className="studio-card welcome-card">
              <div className="welcome-card__copy">
                <span className="eyebrow">Beacon Persona Simulations</span>
                <h1>Welcome back, {learner.name}</h1>
                <p>Choose a role. Inspect the data. Solve the problem with Beacon as your SHINE AI guide.</p>
              </div>
              <StudentAvatar name={learner.name} imageSrc={rishiAvatarUrl} />
              <ProgressBar value={learner.moduleProgress} label="Module Complete" />
              <div className="learner-summary">
                <span>XP {learner.xp}</span>
                <span>{learner.level}</span>
              </div>
              <div className="home-summary-grid">
                <div className="summary-tile">
                  <span>Challenges</span>
                  <strong>{challengePathData.length}</strong>
                  <small>persona paths</small>
                </div>
                <div className="summary-tile">
                  <span>Modes</span>
                  <strong>{Object.keys(personaLevels).length}</strong>
                  <small>difficulty levels</small>
                </div>
                <div className="summary-tile">
                  <span>Activities</span>
                  <strong>{challengeQuestions.length}</strong>
                  <small>persona tasks</small>
                </div>
              </div>
              <div className="button-row recommendation-actions">
                <button className="primary-button" type="button" onClick={onOpenSimulation}>Continue</button>
                <button className="primary-button" type="button" onClick={onOpenChallengePath}>Personas</button>
              </div>
              <div className="feature-actions">
                <button className="feature-button" type="button" onClick={() => onOpenSkillPath()}>
                  Explore Skills
                </button>
                <button className="feature-button" type="button" onClick={() => setView("constellation")}>
                  Skill Constellation
                </button>
              </div>
            </section>
          </>
        )}

        {view === "pathways" && (
          <>
            <section className="studio-card">
              <h1>Choose a Career Pathway</h1>
              <p>Selecting a pathway changes the context, not the math.</p>
            </section>
            <section className="career-path-list">
              {careerPathways.map((pathway) => {
                const Icon = iconMap[pathway.icon] || Circle;
                return (
                  <button className="career-path-card" type="button" key={pathway.title} onClick={() => openDetail(pathway, "pathways")}>
                    <span className="path-icon"><Icon size={18} /></span>
                    <span className="path-copy">
                      <strong>{pathway.title}</strong>
                      <span className="badge-row">
                        {pathway.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}
                      </span>
                    </span>
                    <span className="path-duration">{pathway.duration}</span>
                  </button>
                );
              })}
            </section>
          </>
        )}

        {view === "constellation" && (
          <>
            <section className="studio-card">
              <h1>Skill Constellation</h1>
              <p>Skills are connected across persona simulations. Select a node to open its practice questions.</p>
              <div className="constellation-map">
                <span className="constellation-line vertical" />
                <span className="constellation-line horizontal" />
                {challengePathSkills.map((node, index) => {
                  const group = skillQuestionGroups.find((item) => item.id === node.id);

                  return (
                    <button
                      className={`constellation-node ${constellationPositions[index] || ""}`}
                      type="button"
                      key={node.id}
                      onClick={() => onOpenSkillPath(node.id)}
                      title={`${group?.questions.length || 0} activities`}
                    >
                      <span>{node.title}</span>
                      <small>{group?.questions.length || 0}</small>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {view === "detail" && selectedSkill && (
          <>
            <section className="studio-card">
              <h1>{selectedSkill.title}</h1>
              <p>{selectedSkill.description}</p>
              <div className="badge-row">
                {selectedSkill.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}
              </div>
              <div className="button-row detail-actions">
                <button className="primary-button" type="button" onClick={onOpenSimulation}>Continue</button>
                {selectedSkill.sourceView !== "home" && (
                  <button className="primary-button" type="button" onClick={returnToSource}>
                    Back
                  </button>
                )}
              </div>
            </section>
            <section className="studio-card">
              <h2>Why this skill?</h2>
              <p>SHINE recommends this pathway based on your current roadmap progress and recent diagnostic work.</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
