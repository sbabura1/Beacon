function getInitials(name = "") {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials || "ST";
}

export function StudentAvatar({ name = "Student", imageSrc = "", variant = "illustrated", className = "" }) {
  const initials = getInitials(name);

  if (imageSrc) {
    return (
      <span className={`student-avatar student-avatar--image ${className}`} aria-label={`${name} profile image`}>
        <img src={imageSrc} alt="" />
      </span>
    );
  }

  if (variant === "initials") {
    return (
      <span className={`student-avatar student-avatar--initials ${className}`} aria-label={`${name} avatar`}>
        {initials}
      </span>
    );
  }

  if (variant === "anonymous") {
    return (
      <span className={`student-avatar student-avatar--anonymous ${className}`} aria-label="Student avatar">
        <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
          <circle className="student-avatar__backdrop" cx="48" cy="48" r="46" />
          <circle className="student-avatar__head" cx="48" cy="36" r="16" />
          <path className="student-avatar__body" d="M20 82c4-20 18-31 28-31s24 11 28 31" />
        </svg>
      </span>
    );
  }

  if (variant === "male") {
    return (
      <span className={`student-avatar student-avatar--illustrated ${className}`} aria-label={`${name} avatar`}>
        <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="studentAvatarMaleBg" x1="12" x2="84" y1="8" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#08A88A" />
              <stop offset="0.52" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#FFC43D" />
            </linearGradient>
          </defs>
          <circle className="student-avatar__ring student-avatar__ring--male" cx="48" cy="48" r="45" />
          <circle className="student-avatar__backdrop" cx="48" cy="48" r="39" />
          <path className="student-avatar__hair student-avatar__hair--male" d="M27 37c2-15 12-24 27-23 13 1 21 9 22 22-5-5-12-8-21-9-11-1-21 3-28 10Z" />
          <circle className="student-avatar__face" cx="48" cy="44" r="22" />
          <path className="student-avatar__neck" d="M41 61h14v10H41z" />
          <path className="student-avatar__shirt" d="M17 84c6-17 18-25 31-25s25 8 31 25" />
          <path className="student-avatar__collar" d="M36 62l12 11 12-11" />
          <circle className="student-avatar__eye" cx="40" cy="43" r="2.4" />
          <circle className="student-avatar__eye" cx="56" cy="43" r="2.4" />
          <path className="student-avatar__smile" d="M40 52c4 4 12 4 16 0" />
          <path className="student-avatar__accent" d="M28 70c6 3 13 4 20 4s14-1 20-4" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`student-avatar student-avatar--illustrated ${className}`} aria-label={`${name} avatar`}>
      <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="studentAvatarBg" x1="12" x2="84" y1="8" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#08A88A" />
            <stop offset="0.55" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#EF3B78" />
          </linearGradient>
        </defs>
        <circle className="student-avatar__ring" cx="48" cy="48" r="45" />
        <circle className="student-avatar__backdrop" cx="48" cy="48" r="39" />
        <path className="student-avatar__hair" d="M26 39c1-17 12-27 27-26 12 1 20 9 20 22 0 4-1 8-3 12-5-8-13-14-25-14-8 0-14 2-19 6Z" />
        <circle className="student-avatar__face" cx="48" cy="43" r="22" />
        <path className="student-avatar__neck" d="M41 61h14v10H41z" />
        <path className="student-avatar__shirt" d="M18 84c5-17 17-25 30-25s25 8 30 25" />
        <path className="student-avatar__collar" d="M38 61l10 10 10-10" />
        <circle className="student-avatar__eye" cx="40" cy="42" r="2.4" />
        <circle className="student-avatar__eye" cx="56" cy="42" r="2.4" />
        <path className="student-avatar__smile" d="M40 51c4 4 12 4 16 0" />
        <path className="student-avatar__accent" d="M23 69c8 2 16 3 25 3s17-1 25-3" />
      </svg>
    </span>
  );
}
