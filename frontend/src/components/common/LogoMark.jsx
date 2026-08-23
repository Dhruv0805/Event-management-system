import { useEffect, useRef } from 'react';
import anime from 'animejs';

// Anime.js: a small idle "breathing" loop on the brand mark — a gentle
// natural detail rather than a triggered interaction, distinct from the
// event-driven motion/react animations used on hover/tap elsewhere.
const LogoMark = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const animation = anime({
      targets: el,
      rotate: [0, -8, 8, 0],
      scale: [1, 1.06, 1],
      duration: 3200,
      easing: 'easeInOutSine',
      loop: true,
      delay: 800,
    });

    return () => animation.pause();
  }, []);

  return (
    <span
      ref={ref}
      className="grid h-8 w-8 place-items-center rounded-md bg-gradient-primary text-sm"
      aria-hidden="true"
    >
      🎟️
    </span>
  );
};

export default LogoMark;
