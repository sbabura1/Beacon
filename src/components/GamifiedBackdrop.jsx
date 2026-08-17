import { useEffect } from "react";

export function GamifiedBackdrop() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    let raf = 0;
    let targetX = 50;
    let targetY = 42;
    let currentX = targetX;
    let currentY = targetY;

    function onPointerMove(event) {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
    }

    function tick() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      document.documentElement.style.setProperty("--shine-pointer-x", `${currentX.toFixed(2)}%`);
      document.documentElement.style.setProperty("--shine-pointer-y", `${currentY.toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="gamified-backdrop" aria-hidden="true">
      <span className="gamified-backdrop__gas gamified-backdrop__gas--one" />
      <span className="gamified-backdrop__gas gamified-backdrop__gas--two" />
      <span className="gamified-backdrop__gas gamified-backdrop__gas--three" />
      <span className="gamified-backdrop__rails" />
      <span className="gamified-backdrop__beams gamified-backdrop__beams--left" />
      <span className="gamified-backdrop__beams gamified-backdrop__beams--right" />
      <span className="gamified-backdrop__hex" />
      <span className="gamified-backdrop__mesh" />
      <span className="gamified-backdrop__grid" />
    </div>
  );
}
