export function BeaconSidebar({ message, onQuickAction }) {
  const actions = ["Explain the data", "Give me a hint", "Check my thinking", "Connect to the big picture"];

  return (
    <aside className="beacon-sidebar" aria-label="Beacon assistant">
      <div className="beacon-message">{message}</div>

      <div className="beacon-actions" aria-label="Beacon quick actions">
        {actions.map((action) => (
          <button type="button" key={action} onClick={() => onQuickAction(action)}>
            {action}
          </button>
        ))}
      </div>
    </aside>
  );
}
