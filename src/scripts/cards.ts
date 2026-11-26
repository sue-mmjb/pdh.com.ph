// Card motion for every page and every width: cards fade in as they enter the screen and drift
// gently with the scroll, and the photo inside a card pans a little against the card for depth.
// Never under reduced motion. Homepage cards with a GSAP reveal (.cp-reveal) are handled there.
const PHOTO = '.svc-card_photo, .spec-card_photo, .program_photo, .room-photo-main, .pkg-cutout, .doctor-card img, .cp-entry_art';
export function cardMotion(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.card:not(.cp-reveal), .svc-card:not(.cp-reveal)'));
  if (!cards.length) return;
  document.documentElement.classList.add('cards-motion');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  cards.forEach((c) => io.observe(c));
  const photos = cards.map((c) => c.querySelector<HTMLElement>(PHOTO));
  const wide = window.matchMedia('(min-width: 900px)').matches;
  const drift = wide ? 22 : 16, pan = wide ? 14 : 10;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      if (r.bottom < -160 || r.top > vh + 160) return;
      const off = (r.top + r.height / 2 - vh / 2) / vh;      // -0.5 at the top edge, +0.5 at the bottom
      c.style.setProperty('--py', `${(-off * drift).toFixed(1)}px`);
      const ph = photos[i]; if (ph) ph.style.setProperty('--px', `${(off * pan).toFixed(1)}px`);
    });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
}
