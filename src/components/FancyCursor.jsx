import { useEffect, useRef } from "react";

const TRAIL_COLORS = [
  "#78a7ff",
  "#63e6be",
  "#38bdf8",
  "#1d4ed8",
  "#0f3b70",
  "#9ad8ff",
  "#8ef4d2",
  "#5aa7ff",
];

const TRAIL_SIZES = [10, 9, 8, 7, 6, 5, 4, 3];
const TRAIL_OPACITIES = [0.55, 0.48, 0.4, 0.32, 0.24, 0.17, 0.11, 0.06];
const TRAIL_LERP = [0.42, 0.34, 0.28, 0.23, 0.19, 0.16, 0.13, 0.11];

const LERP_DOT = 0.5;
const IDLE_MS = 1800;

export function FancyCursor() {
  const dotRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches);
    if (isTouch) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const trailEls = trailRefs.current.filter(Boolean);
    if (!dot) return undefined;

    trailEls.forEach((el, i) => {
      const size = TRAIL_SIZES[i];
      const color = TRAIL_COLORS[i];
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.marginLeft = `${-size / 2}px`;
      el.style.marginTop = `${-size / 2}px`;
      el.style.background = color;
      el.style.opacity = String(TRAIL_OPACITIES[i]);
      el.style.boxShadow = `0 0 ${4 + i}px ${color}`;
    });

    let raf = 0;
    let idleTimer = null;
    let pulseTimeout = null;
    let hasEntered = false;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pointer };
    const trailPos = trailEls.map(() => ({ ...pointer }));

    const interactiveSelector = [
      "a",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "[role='button']",
      "[data-cursor='interactive']",
      ".primary-button",
      ".secondary-button",
      ".icon-button",
      ".feature-button",
      ".career-path-card",
      ".simulation-step-card",
      ".challenge-step",
      ".skill-item",
      ".constellation-node",
      ".answer-option",
      ".cell-button",
      ".beacon-brand--button"
    ].join(", ");

    function clearIdle() {
      document.body.classList.remove("cursor-idle");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        document.body.classList.add("cursor-idle");
      }, IDLE_MS);
    }

    function onMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!hasEntered) {
        hasEntered = true;
        document.body.classList.add("has-fancy-cursor");
        dotPos.x = pointer.x;
        dotPos.y = pointer.y;
        trailPos.forEach((pos) => {
          pos.x = pointer.x;
          pos.y = pointer.y;
        });
      }

      clearIdle();
    }

    function onLeave() {
      document.body.classList.remove("has-fancy-cursor", "cursor-interactive");
    }

    function onEnter() {
      if (hasEntered) document.body.classList.add("has-fancy-cursor");
    }

    function onOver(event) {
      if (event.target.closest?.(interactiveSelector)) {
        document.body.classList.add("cursor-interactive");
      }
    }

    function onOut(event) {
      const related = event.relatedTarget;
      if (!related?.closest?.(interactiveSelector)) {
        document.body.classList.remove("cursor-interactive");
      }
    }

    function onDown() {
      document.body.classList.add("cursor-click");
      if (pulseTimeout) clearTimeout(pulseTimeout);
      pulseTimeout = setTimeout(() => {
        document.body.classList.remove("cursor-click");
      }, 260);
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function tick() {
      if (prefersReducedMotion) {
        dotPos.x = pointer.x;
        dotPos.y = pointer.y;
        dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
        raf = requestAnimationFrame(tick);
        return;
      }

      dotPos.x = lerp(dotPos.x, pointer.x, LERP_DOT);
      dotPos.y = lerp(dotPos.y, pointer.y, LERP_DOT);
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      let leaderX = dotPos.x;
      let leaderY = dotPos.y;
      trailEls.forEach((el, i) => {
        const pos = trailPos[i];
        const t = TRAIL_LERP[i] ?? 0.1;
        pos.x = lerp(pos.x, leaderX, t);
        pos.y = lerp(pos.y, leaderY, t);
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        leaderX = pos.x;
        leaderY = pos.y;
      });

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
      if (pulseTimeout) clearTimeout(pulseTimeout);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove(
        "has-fancy-cursor",
        "cursor-interactive",
        "cursor-idle",
        "cursor-click"
      );
    };
  }, []);

  return (
    <>
      {TRAIL_COLORS.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="fancy-cursor-trail-dot"
          aria-hidden="true"
        />
      ))}
      <div ref={dotRef} className="fancy-cursor" aria-hidden="true" />
    </>
  );
}
