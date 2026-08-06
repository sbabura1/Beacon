import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      className="icon-button secondary-icon"
      aria-pressed={enabled}
      aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
      title={enabled ? "Disable sound effects" : "Enable sound effects"}
      onClick={onToggle}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
