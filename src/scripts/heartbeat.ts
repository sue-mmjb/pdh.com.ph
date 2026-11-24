// Heading rule drawn as a heartbeat line: a flat trace with one ECG spike, as wide as the
// heading's text, with a sweep that travels along it. Under reduced motion the line is static.
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
    const h = 22, mid = 15;
    const sx = Math.round(w * 0.6);
    const d = `M0 ${mid} H${sx} l5 -4 l5 8 l5 -19 l6 26 l5 -11 l4 0 H${w}`;
    rule.style.width = `${w}px`;
    rule.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" focusable="false">` +
      `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe8e6"/><stop offset="0.45" stop-color="#7fd3cf"/><stop offset="1" stop-color="#ff7402"/></linearGradient></defs>` +
      `<path class="hb-base" d="${d}" stroke="url(#${id})"/><path class="hb-sweep" d="${d}" stroke="url(#${id})"/></svg>`;
    const sweep = rule.querySelector('.hb-sweep') as SVGPathElement | null;
    if (!sweep) return;
    const len = sweep.getTotalLength();
    const dash = Math.min(len * 0.38, 170);
    sweep.style.strokeDasharray = `${dash} ${len + dash}`;
    sweep.style.setProperty('--hb-dash', `${dash}`);
    sweep.style.setProperty('--hb-end', `${-(len + dash)}`);
  };
  draw();
  let t = 0;
  window.addEventListener('resize', () => { window.clearTimeout(t); t = window.setTimeout(draw, 150); });
}

export function heartbeatAll(selector: string, root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(selector).forEach((rule) => {
    const prev = rule.previousElementSibling;
    heartbeatRule(rule, prev && /^H[1-6]$/.test(prev.tagName) ? prev : null);
  });
}
