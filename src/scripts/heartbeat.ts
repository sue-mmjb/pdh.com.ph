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
    const h = 48, y = 34;                     // baseline; the heart rises above it
    const cx = Math.round(w * 0.6);           // where the stroke loops into the heart
    const f = (v: number) => Math.round(v * 10) / 10;
    // One calligraphic stroke: a swell, a dip, up into the right lobe, over the notch and the
    // left lobe, down to the tip, across the crossing and out into a closing wave.
    const d = [
      `M0 ${y}`,
      `C${f(w * 0.10)} ${y - 16} ${f(w * 0.20)} ${y - 14} ${f(w * 0.32)} ${y - 2}`,
      `C${f(w * 0.40)} ${y + 6} ${f(w * 0.47)} ${y + 10} ${cx - 16} ${y + 6}`,
      `C${cx - 4} ${y - 4} ${cx + 4} ${y - 30} ${cx + 18} ${y - 31}`,
      `C${cx + 32} ${y - 32} ${cx + 32} ${y - 14} ${cx + 10} ${y - 10}`,
      `C${cx + 4} ${y - 24} ${cx - 10} ${y - 36} ${cx - 22} ${y - 26}`,
      `C${cx - 34} ${y - 16} ${cx - 18} ${y + 2} ${cx - 2} ${y + 10}`,
      `C${cx + 6} ${y + 4} ${cx + 10} ${y - 2} ${cx + 22} ${y - 2}`,
      `C${f(w * 0.74)} ${y - 12} ${f(w * 0.86)} ${y + 8} ${w} ${y}`,
    ].join(' ');
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
