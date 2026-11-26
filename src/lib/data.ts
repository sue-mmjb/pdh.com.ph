// Typed access to the hospital data files. Pages never hard-code hospital facts;
// they read them from here so swapping src/data/*.json produces another hospital's site.
import site from '../data/site.json';
import servicesData from '../data/services.json';
import doctorsData from '../data/doctors.json';
import hmo from '../data/hmo.json';
import packagesData from '../data/packages.json';
import rooms from '../data/rooms.json';
import news from '../data/news.json';
import careers from '../data/careers.json';

export type Doctor = (typeof doctorsData)[number];
export type Service = (typeof servicesData.services)[number];

export { site, hmo, rooms, news, careers };
export const services: Service[] = servicesData.services;
export const specialtyGroups = servicesData.specialtyGroups;
export const namedOnlyOnSite = servicesData.namedOnlyOnSite;
export const doctors: Doctor[] = doctorsData;
export { packagesData };
export const packages = packagesData.packages;
export const packagesAreSample = packagesData.sample;
export const featuredPackages = packages.filter((p) => p.featured);

export const departments = [...new Set(doctors.map((d) => d.department))].sort();
export const specializations = [...new Set(doctors.map((d) => d.specialization))].sort();

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function doctorsForService(service: Service): Doctor[] {
  const { departments: deps, specializations: specs } = service.doctorMatch;
  if (!deps.length && !specs.length) return [];
  return doctors.filter(
    (d) => deps.includes(d.department) || specs.some((s) => d.specialization.toLowerCase().includes(s.toLowerCase())),
  );
}

export function doctorsForDepartments(deps: string[]): Doctor[] {
  return doctors.filter((d) => deps.includes(d.department));
}

export function initials(name: string) {
  // Names are "Last, First Middle" on the current site.
  const [last = '', first = ''] = name.split(',').map((s) => s.trim());
  const a = first.charAt(0) || last.charAt(0);
  const b = last.charAt(0);
  return (a + b).toUpperCase();
}

export function displayName(name: string) {
  // "Castell, Maria May" -> "Dr. Maria May Castell"
  if (!name.includes(',')) return name.startsWith('Dr') ? name : `Dr. ${name}`;
  const [last, first] = name.split(',').map((s) => s.trim());
  return `Dr. ${first} ${last}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const featuredServices = services.filter((s) => s.featured);

/** Floor order for grouping services, as PDH labels them. */
export const FLOOR_ORDER = ['Ground Floor', '2nd Floor', '3rd Floor', '3rd to 6th Floor', '4th Floor', '5th Floor', '7th Floor', 'Basement Parking and Allocated Parking Space for Patients and Visitors'];
export function groupByFloor(list: Service[]) {
  const groups = new Map<string, Service[]>();
  for (const s of list) {
    const key = s.location ?? 'Location on request';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }
  const order = (k: string) => { const i = FLOOR_ORDER.indexOf(k); return i === -1 ? 99 : i; };
  return [...groups.entries()].sort((a, b) => order(a[0]) - order(b[0]));
}
/** Short hours label for cards. */
export function shortHours(s: Service) {
  if (!s.hours) return 'Call for schedule';
  if (s.hours === 'Open 24/7') return 'Open 24/7';
  if (/^By appointment$/i.test(s.hours)) return 'By appointment';
  return s.hours.length > 26 ? 'See hours' : s.hours;
}

export type ScheduleRow = { days: string; time: string };

const DAY_WORDS: [RegExp, string][] = [
  [/Monday to Friday/i, 'Mon – Fri'], [/Monday to Saturday/i, 'Mon – Sat'], [/Monday to Sunday/i, 'Mon – Sun'],
  [/Saturdays? & Sundays? including Holidays/i, 'Sat, Sun & holidays'], [/Sunday and Holidays/i, 'Sun & holidays'],
  [/Monday, Wednesday, Friday/i, 'Mon, Wed, Fri'], [/Tuesday, Thursday, Saturday/i, 'Tue, Thu, Sat'],
  [/Mon–Fri/g, 'Mon – Fri'], [/Sat–Sun/g, 'Sat – Sun'], [/Saturday/i, 'Sat'], [/Sunday/i, 'Sun'],
];
const shortDays = (d: string) => DAY_WORDS.reduce((acc, [re, to]) => acc.replace(re, to), d.trim());
const tidyTime = (t: string) => t.replace(/\s*-\s*/g, ' – ').replace(/\s+to\s+/i, ' – ').replace(/(\d)(am|pm)/gi, (_m, n, ap) => `${n} ${ap.toUpperCase()}`).replace(/\b(am|pm)\b/g, (m) => m.toUpperCase()).trim();

/** Turn a service's published hours string into per-day rows. Falls back to the string itself. */
export function serviceScheduleRows(hours: string | null | undefined): ScheduleRow[] {
  if (!hours) return [{ days: '', time: 'Call for schedule' }];
  if (/^open 24\/7$/i.test(hours)) return [{ days: 'Every day', time: 'Open 24 hours' }];
  if (/^by appointment$/i.test(hours)) return [{ days: 'Any day', time: 'By appointment' }];
  // "Label: part, part. Label: part." (Multi-Diagnostic Center)
  if (/^[A-Z][\w ]+:\s/.test(hours) && hours.includes('. ')) {
    const rows: ScheduleRow[] = [];
    for (const chunk of hours.split(/\.\s+/).map((c) => c.replace(/\.$/, '').trim()).filter(Boolean)) {
      const [label, rest] = chunk.split(/:\s+/, 2);
      if (!rest) continue;
      for (const part of rest.split(/,\s+(?=[A-Z])/)) {
        const m = part.match(/^([A-Za-z –&]+?)\s+(\d.*)$/);
        if (m) rows.push({ days: `${label} · ${shortDays(m[1])}`, time: tidyTime(m[2]) });
        else { const [d, t] = part.split(/,\s*/, 2); rows.push({ days: `${label} · ${shortDays(d)}`, time: t ? t.charAt(0).toUpperCase() + t.slice(1) : 'See hours' }); }
      }
    }
    if (rows.length) return rows;
  }
  // "6 AM – 10 PM (Monday, Wednesday, Friday), 6 AM – 6 PM (Tuesday, Thursday, Saturday)"
  const parts = hours.split(/\),\s*/).map((p) => (p.endsWith(')') ? p : p + ')'));
  const rows: ScheduleRow[] = [];
  for (const p of parts) {
    const m = p.match(/^(.*?)\s*\((.*)\)$/);
    if (m) rows.push({ days: shortDays(m[2]), time: tidyTime(m[1]) });
  }
  if (rows.length) return rows;
  return [{ days: '', time: tidyTime(hours) }];
}

const DAY_CODE: Record<string, string> = { TH: 'Thu', SU: 'Sun', M: 'Mon', T: 'Tue', W: 'Wed', F: 'Fri', S: 'Sat' };
/** "TTHS" -> ["Tue","Thu","Sat"]; null when the code is not recognised. */
export function expandDayCode(code: string): string[] | null {
  const out: string[] = []; let c = code.toUpperCase();
  while (c.length) {
    const k = c.startsWith('TH') ? 'TH' : c.startsWith('SU') ? 'SU' : c[0];
    if (!DAY_CODE[k]) return null;
    out.push(DAY_CODE[k]); c = c.slice(k.length);
  }
  return out;
}
/** Doctor clinic schedule as published ("TTHS 8:00am-10:00am/10:00-12:00pm") -> per-day rows. */
export function doctorScheduleRows(schedule: string | null | undefined): ScheduleRow[] {
  if (!schedule) return [{ days: '', time: 'Schedule not listed' }];
  const s = schedule.trim();
  if (/^on call$/i.test(s)) return [{ days: 'Any day', time: 'On call' }];
  if (/^by appointment$/i.test(s)) return [{ days: 'Any day', time: 'By appointment' }];
  const m = s.match(/^([MTWHFSU]+)\s+(.+)$/i);
  if (!m) return [{ days: '', time: s }];
  const days = expandDayCode(m[1]);
  if (!days) return [{ days: '', time: s }];
  const times = m[2].split('/').map((t) => tidyTime(t));
  return [{ days: days.join(', '), time: times.join(' and ') }];
}

/** schema.org Hospital using confirmed facts only. */
export function hospitalJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    description: site.description,
    foundingDate: '2007-05-08',
    telephone: site.phones.trunk.tel,
    email: site.emails.info,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.subdivision}`,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    memberOf: { '@type': 'Organization', name: site.network.name },
    sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin, site.links.currentSite],
    availableService: services
      .filter((s) => s.hours)
      .map((s) => ({ '@type': 'MedicalProcedure', name: s.name })),
  };
}
