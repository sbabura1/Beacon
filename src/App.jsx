import { useEffect, useMemo, useState } from "react";
import { AppTitleCard } from "./components/AppTitleCard.jsx";
import { BeaconDialog } from "./components/BeaconDialog.jsx";
import { BeaconSidebar } from "./components/BeaconSidebar.jsx";
import { ChallengeSidebar } from "./components/ChallengeSidebar.jsx";
import { FancyCursor } from "./components/FancyCursor.jsx";
import { beaconMessages, beaconQuickActions, challengeSteps, progressByRoute } from "./data/simulationData.js";
import { BriefView } from "./pages/BriefView.jsx";
import { CurrentSimulationView } from "./pages/CurrentSimulationView.jsx";
import { IDoView } from "./pages/IDoView.jsx";
import { NavigatorView } from "./pages/NavigatorView.jsx";
import { SprintView } from "./pages/SprintView.jsx";
import { StartView } from "./pages/StartView.jsx";
import { WeDoView } from "./pages/WeDoView.jsx";
import { YouDoView } from "./pages/YouDoView.jsx";
import { useShineSound } from "./hooks/useShineSound.js";
import { runGas } from "./services/gas.js";

function getInitialRoute() {
  if (window.__SHINE_INITIAL_ROUTE) {
    return window.__SHINE_INITIAL_ROUTE;
  }

  const hash = window.location.hash.replace("#/", "");
  if (hash === "navigator" || hash === "continue" || hash === "challenge-paths" || hash.startsWith("skill-")) {
    return hash;
  }
  return "navigator";
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [impactScore, setImpactScore] = useState(0);
  const [completedRoutes, setCompletedRoutes] = useState([]);
  const [beaconMessage, setBeaconMessage] = useState(beaconMessages.start);
  const [beaconAction, setBeaconAction] = useState(null);
  const [theme, setTheme] = useState("dark");
  const sound = useShineSound();

  const progress = route === "navigator" ? 67 : progressByRoute[route] || 15;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((value) => (value === "light" ? "dark" : "light"));
  }

  function updateBeacon(message) {
    setBeaconMessage(message);
  }

  function navigate(nextRoute, options = {}) {
    window.location.hash = `/${nextRoute}`;
    setRoute(nextRoute);
    if (nextRoute !== "navigator") {
      setBeaconMessage(beaconMessages[nextRoute] || beaconMessages.start);
    }
    if (!options.silent) {
      sound.playSelect();
    }
  }

  function goHome() {
    navigate("navigator");
  }

  function award(points) {
    if (points > 0) {
      setImpactScore((value) => value + points);
    }
  }

  function completeAndNavigate(nextRoute, points = 0) {
    award(points);
    setCompletedRoutes((routes) => Array.from(new Set([...routes, route])));
    sound.playChallengeComplete();
    navigate(nextRoute, { preserveBeaconState: true, silent: true });
  }

  async function openCurrentSimulation() {
    try {
      await runGas("showDialog", "continue");
      return;
    } catch {
      // Local dev fallback: show the current simulation screen in this window.
    }

    navigate("continue");
  }

  async function openChallengePath() {
    try {
      await runGas("showDialog", "challenge-paths");
      return;
    } catch {
      // Local dev fallback: show the challenge path screen in this window.
    }

    navigate("challenge-paths");
  }

  async function openSkillPath(skillId) {
    const routeName = `skill-${skillId}`;
    try {
      await runGas("showDialog", routeName);
      return;
    } catch {
      // Local dev fallback: show the skill question group in this window.
    }

    navigate(routeName);
  }

  function openBeaconAction(action) {
    setBeaconAction(action);
    if (action === "Give me a hint") {
      sound.playHint();
    } else {
      sound.playSelect();
    }
  }

  const activeMessage = useMemo(() => {
    if (route === "navigator") return "Choose a skill when you are ready. I will meet you inside the simulation.";
    return beaconMessage || beaconMessages[route];
  }, [beaconMessage, route]);

  return (
    <>
      <FancyCursor />
      {route === "navigator" ? (
        <NavigatorView
          onOpenSimulation={openCurrentSimulation}
          onOpenChallengePath={openChallengePath}
          onOpenSkillPath={openSkillPath}
          soundEnabled={sound.soundEnabled}
          onToggleSound={sound.toggleSound}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <div className="shine-app studio-shell">
          <AppTitleCard
            soundEnabled={sound.soundEnabled}
            onToggleSound={sound.toggleSound}
            theme={theme}
            onToggleTheme={toggleTheme}
            onHome={goHome}
          />

          {route === "continue" || route === "challenge-paths" || route.startsWith("skill-") ? (
            <CurrentSimulationView
              mode={route.startsWith("skill-") ? "skill" : route === "challenge-paths" ? "path" : "challenge"}
              skillId={route.startsWith("skill-") ? route.replace("skill-", "") : ""}
              onAward={award}
              setBeaconMessage={updateBeacon}
              onBeaconAction={openBeaconAction}
              sound={sound}
            />
          ) : (
            <main className="studio-grid">
              <ChallengeSidebar
                steps={challengeSteps}
                currentRoute={route}
                completedRoutes={completedRoutes}
                progress={progress}
                onNavigate={navigate}
              />

              <section className="workspace" aria-label="Simulation workspace">
                {route === "start" && <StartView onComplete={completeAndNavigate} />}
                {route === "sprint" && <SprintView onComplete={completeAndNavigate} setBeaconMessage={updateBeacon} sound={sound} />}
                {route === "ido" && <IDoView onComplete={completeAndNavigate} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />}
                {route === "wedo" && <WeDoView onComplete={completeAndNavigate} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />}
                {route === "youdo" && <YouDoView onComplete={completeAndNavigate} onAward={award} setBeaconMessage={updateBeacon} sound={sound} />}
                {route === "brief" && <BriefView onAward={award} setBeaconMessage={updateBeacon} sound={sound} />}
              </section>

              <BeaconSidebar message={activeMessage} onQuickAction={openBeaconAction} />
            </main>
          )}

          <BeaconDialog action={beaconAction} onClose={() => setBeaconAction(null)}>
            <p>{beaconQuickActions[beaconAction] || activeMessage}</p>
          </BeaconDialog>
        </div>
      )}
    </>
  );
}
