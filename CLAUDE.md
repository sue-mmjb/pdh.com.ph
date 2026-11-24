# PDH Website Prototype — project rules

Website prototype for **Parañaque Doctors Hospital (PDH)**, a private hospital in Parañaque City, Philippines, and a member of Metro Pacific Health. Iozera delivers a working site at the first meeting instead of a proposal. The site must look finished, work on a phone first, and be reusable as a template for other hospitals.

Source of truth: `context/PDH_Claude_Code_Brief.md`. Supporting material: `context/PDH_Website_Text_Only.txt` (homepage scrape) and `context/full-site-crawl/` (413-page crawl of pdh.com.ph, 25 Nov 2026, including 288 doctor pages).

## Hard rules

- **NEVER invent facts.** No made-up doctor names, HMOs, prices, hours, phone numbers or services. Use only what the context files state. Where something is missing or inconsistent, render the `<ToConfirm />` marker on the page and log it in `CONFIRM.md`.
- **The ER number is not confirmed.** The Emergency button must appear on every page (header, mobile bottom bar, Kriss panel, footer) with a `[TO CONFIRM]` marker next to the number.
- Spell the name **"Parañaque Doctors Hospital"** — no apostrophe.
- Do not state a DOH hospital level anywhere on the site (Sue, 25 Nov 2026) until PDH confirms it; `site.dohLevel` is null on purpose.
- **No analytics, tracking pixels, cookies or third-party scripts.** The only scripts are small inline first-party ones (menu toggle, Kriss panel toggle, doctor filter, form stub, theme memory) and GSAP, which is installed from npm and bundled into the site at build time — never loaded from a CDN, never phoning home. Google Fonts are not used either; fonts are system stacks. Animations are skipped when the visitor prefers reduced motion. Decision confirmed by Sue on 25 Nov 2026: keep GSAP bundled locally; do not replace it with CSS-only motion unless PDH rules out libraries.
- **Forms** collect only name, contact details, preferred channel and service needed. No symptoms, medical history or free-text condition field. Forms send nothing; on submit they show "Prototype: request not sent."
- **Kriss.ai is a placeholder slot only** (`src/components/Kriss.astro`). Do not build or fake an AI chatbot.
- **No AI-generated photos of doctors or people.** Use only images PDH supplies in `assets/`; otherwise the labeled `<Placeholder />` component.
- **Do not hotlink** images or files from pdh.com.ph. Links to article pages on pdh.com.ph are fine.
- Build only what is listed in the brief. No CMS, login, dark mode or extra features.
- Ask before deleting files, installing global packages, or doing anything outside this folder. **Never deploy.**

## Facts policy

- Every hospital fact lives in `src/data/*.json`, never in page markup. Swapping the data files produces another hospital's site.
- Each data file has a `_note` saying where its content came from. Values the current site does not confirm carry `confirmed: false` or `sample: true`.
- Content the current site lacks (packages, preparation notes, HMO process steps, PhilHealth steps) is a labeled sample: wrap it with `<Sample />` on the page.
- `src/data/doctors.json` is generated: run `npm run extract` to rebuild it from the crawl. Do not hand-edit it.
- When PDH confirms an item, update the JSON, remove the marker, and tick it off in `CONFIRM.md`.

## Stack

- Astro 5, static output (`astro build` → `dist/`), no client-side framework. Sitemap via `@astrojs/sitemap`.
- One design, "Calm Platform" (direction taken from terminal-industries.com: look only — floating pill nav, light grey bands, large calm type, rounded cards, black primary and PDH orange accent; no frame-sequence hero, scroll hijack or trackers). Tokens live in `:root` in `src/styles/global.css`; the homepage is `src/components/home/Home.astro`. The earlier three-option prototype (A Minimal Editorial / PDH brand, B Warm Care, C Bold Modern) was retired on 25 Nov 2026 at Sue's request.
- Commands: `npm run dev` (http://localhost:4321), `npm run build`, `npm run preview`, `npm run extract`.
- Site URL in `astro.config.mjs` is a placeholder until PDH chooses a domain.

## Quality bar

WCAG 2.2 AA contrast, keyboard navigation, alt text (placeholders carry `aria-label`), 44px minimum tap targets, semantic HTML, one URL per service and per doctor, schema.org `Hospital` JSON-LD on every page using confirmed facts only, `Physician` JSON-LD on doctor profiles. Check pages at 375px and 1440px.
