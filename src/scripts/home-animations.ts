import gsap from 'gsap';

export function initAnimations(): void {
  const greeting = document.querySelector('[data-animate="greeting"]');
  const intro = document.querySelectorAll('[data-animate="intro"]');
  const social = document.querySelector('[data-animate="social"]');

  const targets = [
    ...(greeting ? [greeting] : []),
    ...Array.from(intro),
    ...(social ? [social] : []),
  ].filter(Boolean);

  if (targets.length === 0) return;

  gsap.set(targets, { opacity: 0, y: 16 });

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
}
