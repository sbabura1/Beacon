import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function FeedbackPanel({ tone = "success", title, children }) {
  const Icon = tone === "error" ? AlertTriangle : CheckCircle2;

  return (
    <div className={`feedback-panel ${tone}`} role="status" aria-live="polite">
      <Icon size={20} />
      <div>
        {title && <strong>{title}</strong>}
        <p>{children}</p>
      </div>
    </div>
  );
}
