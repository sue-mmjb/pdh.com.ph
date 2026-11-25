// Phone card motion for every page: cards fade in as they enter the screen and drift gently
// with the scroll (a light parallax). Only on narrow screens, never under reduced motion.
// Homepage cards that already carry a GSAP reveal (.cp-reveal) are left to that script.
export function cardMotion(): void {
  if (!window.matchMedia('(max-width: 899px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.card:not(.cp-reveal)'));
  if (!cards.length) return;
  document.documentElement.classList.add('cards-motion');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  cards.forEach((c) => io.observe(c));
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.bottom < -120 || r.top > vh + 120) return;
      const off = (r.top + r.height / 2 - vh / 2) / vh;      // -0.5 at the top edge, +0.5 at the bottom
      c.style.setProperty('--py', `${(-off * 16).toFixed(1)}px`);
    });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }, { passive: true });
  update();
}
