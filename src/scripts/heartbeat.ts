// Heading rule drawn as a signature: a line as wide as the heading's text that loops into a
// small heart on its way, written from left to right once it scrolls into view.
// Under reduced motion the line is simply shown.
let seq = 0;

function textWidth(heading: Element | null): number {
  if (!heading) return 0;
  const range = document.createRange();
  range.selectNodeContents(heading);
  const box = range.getBoundingClientRect();
  return box.width;
}

export function heartbeatRule(rule: HTMLElement, heading: Element | null): void {
  const id = `hb${++seq}`;
  const draw = () => {
    const fallback = rule.parentElement ? rule.parentElement.clientWidth : 240;
    const w = Math.max(96, Math.round(textWidth(heading) || fallback));
    const h = 34, mid = 13;
    const sx = Math.round(w * 0.62);
    // the heart: its top notch sits on the line, lobes rise above it, the tip dips below
    const d = `M0 ${mid} H${sx} c-4 -12 -18 -12 -14 0 c2 6 8 9 14 16 c6 -7 12 -10 14 -16 c4 -12 -10 -12 -14 0 H${w}`;
    rule.style.width = `${w}px`;
    rule.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" focusable="false">` +
      `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe8e6"/><stop offset="0.45" stop-color="#7fd3cf"/><stop offset="1" stop-color="#ff7402"/></linearGradient></defs>` +
      `<path class="hb-base" d="${d}" stroke="url(#${id})"/><path class="hb-sweep" d="${d}" stroke="url(#${id})"/></svg>`;
    const sweep = rule.querySelector('.hb-sweep') as SVGPathElement | null;
    if (!sweep) return;
    const len = sweep.getTotalLength();
    sweep.style.strokeDasharray = `${len}`;
    sweep.style.setProperty('--hb-len', `${len}`);
  };
  draw();
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { rule.classList.add('is-on'); io.disconnect(); } });
    }, { threshold: 0.6 });
    io.observe(rule);
  } else {
    rule.classList.add('is-on');
  }
  let t = 0;
  window.addEventListener('resize', () => { window.clearTimeout(t); t = window.setTimeout(draw, 150); });
}

export function heartbeatAll(selector: string, root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(selector).forEach((rule) => {
    const prev = rule.previousElementSibling;
    heartbeatRule(rule, prev && /^H[1-6]$/.test(prev.tagName) ? prev : null);
  });
}
