# CONFIRM.md — items PDH must confirm before launch

Every item here shows a visible `[TO CONFIRM]` or `Sample` marker on the prototype. Nothing below was invented; where a value is shown, it comes from the current pdh.com.ph (crawled 25 Nov 2026) but has not been verified by PDH.

## Contact numbers

| Item | What the prototype shows | Where it came from | Status |
| --- | --- | --- | --- |
| Emergency (ER) line | 8776 0645 local 8106; mobile 0921 572 0589 | Contact page on current site | [TO CONFIRM] — shown on every page per the brief |
| Main information line | (02) 8776 0644, 46 to 51 local 7000; mobiles 0998 520 7286 / 7295 | Homepage slides print this consistently; the footer prints two other spellings | [TO CONFIRM] |
| Messenger link | Facebook page URL used instead | No m.me link in the scrape | [TO CONFIRM] |
| Visiting hours | "Not published" | Not on the current site | [TO CONFIRM] |

## Lists the current site shows only as images or not at all

| Item | What the prototype shows | Status |
| --- | --- | --- |
| Accepted HMOs (hospital-wide) | 32 partners with PDH's own logo files | Validated 25 Nov 2026 against the logo strips Sue supplied; marker removed |
| Per-doctor accredited HMOs | As listed on each doctor's page; 113 doctors show "TBD" or nothing | [TO CONFIRM] for those doctors |
| Packages | 12 packages/promos with prices, transcribed from the homepage carousel slides (Nov 2026) | Published by PDH — confirm promo validity dates and the Sunday Ultrasound discount amount |
| Room rates | Not shown | [TO CONFIRM] |
| PhilHealth process | 3 sample steps | Sample — PDH to supply |
| HMO approval steps | 4 sample steps | Sample — PDH to supply |
| "How to prepare" per service | Sample text on 16 services | Sample — PDH to supply |
| Multi-Diagnostic Center hours | Our Services page: Echo Mon–Fri 7–5, Sat–Sun 7–4; homepage slide: Echo Mon–Sun 6 AM–7 PM, Vascular Mon–Sat 8–5 | [TO CONFIRM] — two schedules published |
| Doctor schedule codes | Our reading: M T W TH F S; TTHS = Tue/Thu/Sat | [TO CONFIRM] — PDH does not define the codes |
| How to book (doctor profiles) | 3 generic steps | Sample |
| Per-service HMO coverage | Points to HMO Hub | [TO CONFIRM] |

## Services listed on the current site without details

| Service | Missing on current site |
| --- | --- |
| Animal Bite Center | Location and schedule (TBD) |
| Chemo Infusion Center | Location and schedule (TBD) |
| Patient Experience Department | Location and schedule (TBD) |
| Neurology Center, Women's Health Center, Cardiac Rehabilitation Facility | Named only; no description, floor or hours |

## Doctor data

| Item | Detail |
| --- | --- |
| Roster | 288 doctors extracted from the site's own listing (`npm run extract`); site claims 320 doctors |
| One page with no data | `/doctor/dr-michael-john-pabalate/` on the current site is empty; skipped |
| Schedules | 3 doctors have no schedule on the site |
| Photos | 89 doctors have a photo on pdh.com.ph; those are used. The other 199 show initials. |

## Assets

| Item | Detail |
| --- | --- |
| Logo | PDH's horizontal lockup (2048 px, from the current site) in the header; official square logo for favicon and social image |
| Photos | 42 of PDH's own images from pdh.com.ph now used (façade, lobby, pillars, rooms, news, MPH map, NPC seal, 19 promo slides); placeholders remain on 14 service pages with no PDH photo |
| Room photos | 20 photos of the Ward, Semi-private, Private, Suite and Isolation rooms, cropped from screenshots of PDH's current site (low resolution). PDH to confirm use and supply originals |
| Premium Labor Room | Marked "Soon to open" with PDH's own banner, as on the current site. PDH to confirm opening status |
| Domain | `astro.config.mjs` uses the Vercel address `https://pdhcomph.vercel.app` until PDH chooses a domain |

## Not confirmed but shown as published (verify at sign-off)

- DOH level: PDH's About page says "Level 2", but the site does not state it (removed 25 Nov 2026 at Sue's request) until PDH confirms the classification
- Founded May 8, 2007; MPH member since 2024 (About page)
- Stats 94 beds / 320 doctors / 410 employees (homepage)
- Floors and hours for every service (Our Services page)
- Leadership team names and roles (About page)
- Data Privacy Notice text and date 10/8/2026 (Privacy Policy page)

## Decisions to mention at the demo

- The homepage motion uses GSAP, self-hosted and bundled at build time. The site makes no calls to any outside server, loads no fonts, analytics or widgets from third parties. Say this in one line so nobody reads "GSAP" as an external dependency.

## Sourced from the homepage carousel slides (screenshots, 25 Nov 2026)

- Hero copy: "PDH is a pillar of Trust" and its paragraph are PDH's own words and now replace our paraphrased headlines on all three options.
- Rehabilitation: Laser Therapy, Cryotherapy, Shockwave, sports injury, pain management, strength and conditioning, assistive device training; laser and shockwave condition lists; appointments local 8211.
- Hemodialysis: "for as low as Php 6,700.00, inclusive of PhilHealth".
- Diagnostic prices: 2D Echo 3,959; CT scan 7,220; whole abdomen ultrasound 4,261; ECG 623; chest X-ray (PA) 515.
- Payment methods: cash, GCash, credit card, debit card; HMO accepted. TikTok handle paranaquedoctorshospital.
- Legal name on signage and the official logo: UHBI-Parañaque Doctors Hospital, Inc. (the site uses "Parañaque Doctors Hospital").

## Photo mapping to confirm with PDH

- Room photos: PDH's room-gallery images are assigned to Ward, Semi-private, Private, Suite, Isolation (anteroom) and Premium Labor Room by what each picture shows. PDH should confirm which photo belongs to which room type.
- News photos: the cardiovascular-talk photo is certain; the photos on the IM Family Health Talk and Barangay Partnership items are PDH event photos matched by content and should be confirmed.
- Essential Lab Package (Promo 9), PHP 1,500, was added from a slide that is in PDH's site files but not in the live carousel we screenshotted; confirm it is current.

## PDH feedback round 1 (25 Nov 2026)

| Item | What the prototype shows | Status |
| --- | --- | --- |
| Package prices | 13 packages and promos as published on the homepage slides, Nov 2026 | [TO CONFIRM] prices and validity dates |
| Statistics | 94 beds, 320 doctors, 32 HMO partners, 27 MPH hospitals | [TO CONFIRM] against PDH's current figures |
| Contact numbers | As listed in "Contact numbers" above | [TO CONFIRM] |
| Doctor schedules | 288 doctors, clinic days spelled out from PDH's day codes; no time range failed a start-before-end check | [TO CONFIRM] the day-code reading (TTHS etc.) |
| Preparation instructions | Sample text on 16 services | Sample, PDH to supply |
| Appointment request form | Removed; /book/ lists PDH's channels | Scope to be agreed with PDH |
| Chatbot | Launcher and panel are a labelled placeholder; the working demo is a separate link | Done |
| Hero and people photos | PDH doctors' published photos; staff and patient photos cropped from PDH's own slides | [TO CONFIRM] PDH approves these for the homepage |
| Loading performance | Images re-encoded (cut-outs 2.2 MB to 0.2 MB); not yet measured on a slow connection | Test pending |
| Department photos | Real photos on 11 service cards (ER building, Laboratory, Multi-Diagnostic, Hemodialysis, Rehabilitation, ICU, Outpatient, Admitting, Patient Experience, OB Ultrasound, Pulmonary); the other 12 keep illustrations | PDH to supply approved department photos for the rest |
