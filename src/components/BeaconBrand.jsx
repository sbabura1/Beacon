import beaconGuideUrl from "../assets/beacon-guide.png";

export function BeaconBrand({ className = "", onClick = null }) {
  const content = (
    <>
      <img src={beaconGuideUrl} alt="" className="beacon-brand__mascot" aria-hidden="true" />
      <div className="beacon-brand__copy">
        <h2>Beacon</h2>
        <p>Your SHINE AI Guide</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={`beacon-brand beacon-brand--button ${className}`} onClick={onClick} aria-label="Go to home">
        {content}
      </button>
    );
  }

  return (
    <div className={`beacon-brand ${className}`}>
      {content}
    </div>
  );
}
