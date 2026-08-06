import { useState } from "react";
import { Check, Circle, Lock, Moon, Play, Settings, ShieldAlert, Square } from "lucide-react";
import { careerPathways, learner, recommendedSkill, skillConstellation, skillGroups } from "../data/navigatorData.js";
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

export function NavigatorView({ onOpenSimulation, soundEnabled, onToggleSound, theme, onToggleTheme }) {
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
                <p>Your next best move is based on recent diagnostic work and your health-data investigation.</p>
              </div>
              <StudentAvatar name={learner.name} imageSrc={mariaAvatarUrl} />
              <ProgressBar value={learner.moduleProgress} label="Module Complete" />
              <div className="learner-summary">
                <span>XP {learner.xp}</span>
                <span>{learner.level}</span>
              </div>
            </section>

            <section className="recommendation-card">
              <span className="eyebrow">Today's Recommendation</span>
              <h2>{recommendedSkill.title}</h2>
              <p>{recommendedSkill.description}</p>
              <div className="badge-row">
                {recommendedSkill.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}
              </div>
              <div className="button-row recommendation-actions">
                <button className="primary-button" type="button" onClick={onOpenSimulation}>Continue</button>
                <button className="primary-button" type="button" onClick={() => setView("skills")}>Explore Skills</button>
              </div>
              <div className="feature-actions">
                <button className="feature-button" type="button" onClick={() => setView("pathways")}>
                  Career Pathways
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
            {skillGroups.map((group) => (
              <section className="skill-group" key={group.title}>
                <div className="section-heading">
                  <h2>{group.title}</h2>
                  <span>{group.skills.length}</span>
                </div>
                {group.skills.map((skill) => (
                  <button
                    className={`skill-item ${skill.status}`}
                    type="button"
                    key={skill.title}
                    onClick={() => skill.status !== "locked" && openDetail(skill, "skills")}
                  >
                    <span className="skill-status">
                      {skill.status === "done" ? <Check size={16} /> : skill.status === "locked" ? <Lock size={16} /> : <Play size={16} />}
                    </span>
                    <span>
                      <strong>{skill.title}</strong>
                      <small>{skill.description}</small>
                    </span>
                    <span className="badge">{skill.progress}%</span>
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
