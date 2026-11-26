// Builds src/data/doctors.json from the crawled doctor pages in context/full-site-crawl/pages.
// Source: pdh.com.ph/doctor/<slug>/ pages scraped on 25 Nov 2026. Nothing here is invented;
// fields that the source leaves empty or "TBD" are written as null.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PAGES = join(process.cwd(), 'context', 'full-site-crawl', 'pages');
const OUT = join(process.cwd(), 'src', 'data', 'doctors.json');
// Photos PDH publishes on its own doctor pages, keyed by slug (see scripts/fetch-doctor-photos note in CLAUDE.md).
const PHOTOS = JSON.parse(readFileSync(join(process.cwd(), 'src', 'data', 'doctor-photos.json'), 'utf8'));

const SPECIALTY_FIX = {
  'Infectious': 'Infectious Diseases',
  'Allergology, Immunology': 'Allergology & Immunology',
  'Neuro Surgery': 'Neurosurgery',
};

const files = readdirSync(PAGES).filter((f) => f.startsWith('doctor__') && !f.startsWith('doctor__page__'));
const doctors = [];
const skipped = [];

for (const file of files) {
  const text = readFileSync(join(PAGES, file), 'utf8');
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const url = (lines.find((l) => l.startsWith('URL:')) || '').replace('URL:', '').trim();
  const slug = url.replace(/\/$/, '').split('/').pop();
  const dept = lines.find((l) => l.startsWith('Department:'));
  if (!dept) { skipped.push(slug); continue; }

  const get = (label) => {
    const l = lines.find((x) => x.startsWith(label));
    return l ? l.slice(label.length).trim() : null;
  };
  // Name: the line right before "Department:"
  const idx = lines.indexOf(dept);
  const name = lines[idx - 1];
  const specializationRaw = get('Specialization:');
  const specialization = SPECIALTY_FIX[specializationRaw] || specializationRaw;

  const hmoIdx = lines.findIndex((l) => l.startsWith('Accredited HMO:'));
  let hmos = [];
  let hmoNote = null;
  if (hmoIdx >= 0) {
    const next = lines[hmoIdx + 1] || '';
    if (/^TBD$/i.test(next) || next === 'Our Doctors' || next === '') {
      hmoNote = 'Not listed on the current site';
    } else if (/^By Appointment$/i.test(next)) {
      hmoNote = 'Listed as "By Appointment" on the current site';
    } else {
      hmos = next.split(',').map((s) => s.trim()).filter((s) => s && !/^TBA$/i.test(s)).map((s) => (s.toLowerCase() === 'cooperative health' ? 'Cooperative Health' : s));
    }
  }

  // Two pages print the schedule as a bare "- <days> <hours>" line with no "Schedule:" label.
  const sIdx = lines.findIndex((l) => l.startsWith('Specialization:'));
  const afterSpec = sIdx >= 0 ? lines[sIdx + 1] || '' : '';
  const unlabeledSchedule = /^- (?!Schedule:|Room Number:|Contact Number:)\S/.test(afterSpec) ? afterSpec.slice(2).trim() : null;

  const clean = (v) => (v && !/^TBD$/i.test(v) ? v : null);
  doctors.push({
    slug,
    name,
    department: dept.replace('Department:', '').trim(),
    specialization,
    schedule: clean(get('- Schedule:')) || unlabeledSchedule,
    room: clean(get('- Room Number:')),
    contact: clean(get('- Contact Number:')),
    hmos,
    hmoNote,
    photo: PHOTOS[slug] ?? null,
    source: url,
  });
}

doctors.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(OUT, JSON.stringify(doctors, null, 2) + '\n');
console.log(`wrote ${doctors.length} doctors to ${OUT}`);
if (skipped.length) console.log(`skipped (no data on page): ${skipped.join(', ')}`);
