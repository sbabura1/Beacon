export function ProgressBar({ value, label = "Progress" }) {
  return (
    <div className="progress-box" aria-label={`${label}: ${value}%`}>
      <div className="progress-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
