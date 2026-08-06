export function BeaconMascot({
  state = "idle",
  size = "medium",
  label = "Beacon, your SHINE AI guide",
  imageSrc = null
}) {
  if (!imageSrc) {
    return null;
  }

  return (
    <div
      className={`beacon-mascot beacon-mascot--${state} beacon-mascot--${size}`}
      role="img"
      aria-label={label}
    >
      <div className="beacon-mascot__glow" aria-hidden="true" />
      <img className="beacon-mascot__image" src={imageSrc} alt="" />
    </div>
  );
}
