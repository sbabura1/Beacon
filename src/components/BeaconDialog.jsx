import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function BeaconDialog({ action, children, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("dialog-open");
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!action) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="beacon-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="beacon-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="dialog-close" type="button" aria-label="Close Beacon dialog" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 id="beacon-dialog-title" className="sr-only">{action}</h2>
        <div className="dialog-body">{children}</div>
        <button className="primary-button" type="button" onClick={onClose}>Got it</button>
      </section>
    </div>
  );
}
