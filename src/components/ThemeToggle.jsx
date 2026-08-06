import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="icon-button secondary-icon"
      aria-pressed={isLight}
      aria-label={isLight ? "Use dark mode" : "Use light mode"}
      title={isLight ? "Use dark mode" : "Use light mode"}
      onClick={onToggle}
    >
      {isLight ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
