# PDH Website Prototype — Claude Code Brief

Source of truth for the build. Prepared 25 Nov 2026 from the PDH build spec and a scrape of the current PDH homepage (pdh.com.ph).

## Goal

Build a working website for Parañaque Doctors Hospital (PDH) with a Kriss.ai assistant slot, in one to three design directions. Iozera presents it as finished at the first meeting instead of submitting a proposal. PDH is comparing several vendors, and the decision goes to its head office (Metro Pacific Health). The live link must work on its own so PDH can forward it.

## Sir Tim's parameters

- Deliver, don't propose: the first contact is a working site.
- Everything works: real menus, real pages, not mockups.
- One to three design options with the same content; colors and photos easy to swap.
- Build it as a reusable template: swapping the data should produce another hospital's site.

## Site map

| Page | Must include |
| --- | --- |
| Header (every page) | Tap-to-call Emergency, main line, Messenger, Book; always visible on mobile |
| Homepage | Find a doctor, services, HMO help, ER contact, stats, Metro Pacific Health network, pillars, patient stories, news |
| Services index + one page per service | What it is, doctors, floor and location, hours, HMOs accepted, preparation, next-step button |
| Doctors index (search/filter) + one profile per doctor | Specialty, clinic schedule, location, how to book |
| HMO and PhilHealth | Accepted HMOs as a text list, HMO Hub location and hours, step-by-step process |
| Packages | Health packages from the current site |
| Rooms and facilities | From the current site |
| Book an appointment | Request form (see guardrails) |
| Contact and directions | Address, phone lines, map, parking, visiting hours |
| About | From the current site |
| Footer | Address, phones, emails, Online Lab Results, Privacy Policy, Careers |

## Kriss.ai

Placeholder slot only in this prototype; the live widget comes from the Kriss team later.

- Small greeting bubble, bottom-right; never covers the page or blocks a call, booking or the ER.
- Panel labeled "Kriss.ai assistant — live demo connects here" with quick links: Find a doctor, HMO help, Book, Emergency.
- Emergency always shows the ER number, location and directions first.
- The live version will never diagnose, triage, give medication advice, or ask for symptoms.

## Confirmed facts (current homepage, pdh.com.ph)

- Name: **Parañaque Doctors Hospital** (no apostrophe)
- Address: 175 Doña Soledad Ave., Better Living Subdivision, Parañaque, 1711 Metro Manila
- Member of Metro Pacific Health (MPH), described on the site as the largest private hospital group in the country: 27 hospitals (including Makati Medical Center, Cardinal Santos Medical Center, Asian Hospital and Medical Center, Riverside Medical Center, Davao Doctors Hospital), 33 outpatient care centers, 6 cancer centers, 2 allied health colleges, a centralized laboratory and pharmacies
- Stats: 94 beds, 320 doctors, 410 employees
- Pillars: Patient Safety; Compassion & Medical Expertise; Cutting-Edge Science & Innovation; Accessible & Inclusive Care; Community-Centered Service
- Care types named: Outpatient, Emergency, Inpatient, Urgent Care
- Emails: info@pdh.com.ph, marketing@pdh.com.ph
- Online Lab Results: https://lis.pdh.com.ph/
- Story series title: "Alagang PDH Ako Stories"
- Recent news (with URLs in the scrape file): Alagang PDH Ako Stories feature; Neuro Talk kick-off, Barangay Napindan (27 Mar 2025); IM Family Health Talk kick-off (24 Mar 2025); Cardiovascular Health Talk (20 Mar 2025)

## Inconsistent on the current site — mark [TO CONFIRM]

- Phone: the homepage shows "8776 0644/51 local 7000" and "8776 06 44 to local 7000", plus mobiles 0998 520 7295 and 0998 520 7286. Confirm the main line.
- ER number: not on the homepage. Placeholder until confirmed.
- Messenger / Facebook page link: not in the scrape.

## From earlier research — not yet seen on the site, mark [TO CONFIRM]

| Item | Detail |
| --- | --- |
| Open 24/7 | ER (ground floor), laboratory, radiology (X-ray, CT, ultrasound), pharmacy, admitting, OR, ICU, NICU, PICU |
| Nuclear Medicine | 7th floor, by appointment |
| Multi-Diagnostic Center | 2nd floor: ECG, echo, EEG; stress echo Saturdays, vascular studies weekdays, by appointment |
| Hemodialysis | 2nd floor; 6 AM–10 PM Mon/Wed/Fri; 6 AM–6 PM Tue/Thu/Sat |
| Outpatient clinics | 3rd–6th floors, by appointment |
| Eye Center | 10 AM–7 PM, Mon–Sat |
| Dental | 9 AM–5 PM, weekdays |
| HMO Hub | Ground floor; 6 AM–7 PM Mon–Sat; 6 AM–2 PM Sun |
| Trunk lines | 8776-0644 to 46; info desk 8776-0651 loc. 7000 |

## Missing — never invent

Doctor roster, accepted-HMO list (shown only as logos on the current site), full services list and details, packages, prices, room types, PhilHealth details, DOH hospital level. Use clearly labeled sample entries until the scrapes arrive.

## Guardrails (Data Privacy Act of 2012, RA 10173)

- No analytics, ad or tracking pixels, or third-party scripts in the prototype.
- Forms collect only name, contact details, preferred channel and service needed. No symptoms, medical history or free-text condition field.
- Forms send nothing; on submit show "Prototype: request not sent."
- ER contact visible on every page and in the Kriss panel.
- Real doctor names and photos only from PDH's own listing; no AI-generated photos of people.
- Placeholder content clearly labeled as sample.

## Weaknesses of the current site (the prototype should fix these)

- No ER number or Book button on the homepage; the only action is a "Have a question?" name/email/message form.
- HMO partners shown as logos only, unreadable to AI search and screen readers.
- No doctor search on the homepage despite 320 doctors.
- Newest dated news on the homepage is from March 2025.
