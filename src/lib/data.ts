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
export const packages = packagesData.packages;
export const packagesAreSample = packagesData.sample;

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
