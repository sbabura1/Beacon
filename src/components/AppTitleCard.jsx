import { BeaconBrand } from "./BeaconBrand.jsx";
import { SoundToggle } from "./SoundToggle.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function AppTitleCard({ soundEnabled, onToggleSound, theme, onToggleTheme, onHome }) {
  return (
    <header className="app-title-card">
      <BeaconBrand className="app-brand" onClick={onHome} />
      <div className="title-card-actions" aria-label="Display and sound settings">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
