import { useState } from "react";
import { Check, Circle, Moon, Play, Settings, ShieldAlert, Square } from "lucide-react";
import { careerPathways, learner, skillConstellation } from "../data/navigatorData.js";
import { challengePathData, challengePathSkills, skillQuestionGroups } from "../data/simulationData.js";
import { ProgressBar } from "../components/ProgressBar.jsx";
import { AppTitleCard } from "../components/AppTitleCard.jsx";
import { StudentAvatar } from "../components/StudentAvatar.jsx";
import mariaAvatarUrl from "../assets/student-avatar-maria.png";

const iconMap = {
  square: Square,
  moon: Moon,
  gear: Settings,
  risk: ShieldAlert
};

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
                <h1>Welcome back, {learner.name}</h1>
                <p>Start a Riverton challenge path, review core quantitative skills, or continue the next data-driven task.</p>
              </div>
              <StudentAvatar name={learner.name} imageSrc={mariaAvatarUrl} />
              <ProgressBar value={learner.moduleProgress} label="Module Complete" />
              <div className="learner-summary">
                <span>XP {learner.xp}</span>
                <span>{learner.level}</span>
              </div>
              <div className="home-summary-grid">
                <div className="summary-tile">
                  <span>Challenges</span>
                  <strong>{challengePathData.length}</strong>
                  <small>data-driven tasks</small>
                </div>
                <div className="summary-tile">
                  <span>Skills</span>
                  <strong>{challengePathSkills.length}</strong>
                  <small>quantitative skills</small>
                </div>
              </div>
              <div className="button-row recommendation-actions">
                <button className="primary-button" type="button" onClick={onOpenSimulation}>Continue</button>
                <button className="primary-button" type="button" onClick={onOpenChallengePath}>Challenge Path</button>
              </div>
              <div className="feature-actions">
                <button className="feature-button" type="button" onClick={() => setView("skills")}>
                  Explore Skills
                </button>
                <button className="feature-button" type="button" onClick={() => setView("constellation")}>
                  Skill Constellation
                </button>
              </div>
            </section>
          </>
        )}

        {view === "skills" && (
          <>
            {skillQuestionGroups.map((group) => (
              <section className="skill-group" key={group.id}>
                <div className="section-heading">
                  <h2>{group.title}</h2>
                  <span>{group.questions.length}</span>
                </div>
                <button
                  className="skill-item active"
                  type="button"
                  onClick={() => onOpenSkillPath(group.id)}
                >
                  <span className="skill-status"><Play size={16} /></span>
                  <span>
                    <strong>Start {group.title}</strong>
                    <small>{group.description}</small>
                  </span>
                  <span className="badge">{group.questions.length} questions</span>
                </button>
                {group.questions.slice(0, 3).map((question) => (
                  <button
                    className="skill-item"
                    type="button"
                    key={question.id}
                    onClick={() => onOpenSkillPath(group.id)}
                  >
                    <span className="skill-status"><Check size={16} /></span>
                    <span>
                      <strong>{question.pathTitle}</strong>
                      <small>{question.prompt}</small>
                    </span>
                    <span className="badge">Q{question.questionIndex + 1}</span>
                  </button>
                ))}
              </section>
            ))}
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
              <p>Skills are connected. Select a node to open a learning pathway.</p>
              <div className="constellation-map">
                <span className="constellation-line vertical" />
                <span className="constellation-line horizontal" />
                {skillConstellation.map((node) => (
                  <button
                    className={`constellation-node ${node.className}`}
                    type="button"
                    key={node.title}
                    onClick={() => openDetail(node, "constellation")}
                  >
                    {node.title}
                  </button>
                ))}
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
