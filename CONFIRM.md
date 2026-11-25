# CONFIRM.md — items PDH must confirm before launch

Every item here shows a visible `[TO CONFIRM]` or `Sample` marker on the prototype. Nothing below was invented; where a value is shown, it comes from the current pdh.com.ph (crawled 25 Nov 2026) but has not been verified by PDH.

## Contact numbers

| Item | What the prototype shows | Where it came from | Status |
| --- | --- | --- | --- |
| Emergency (ER) line | 8776 0645 local 8106; mobile 0921 572 0589 | Contact page on current site | [TO CONFIRM] — shown on every page per the brief |
| Main information line | 8776 0644 local 7000; mobiles 0998 520 7295 and 0998 520 7286 | Current site spells it three ways: "8776 0644/51 local 7000" (footer), "8776 06 44 to local 7000" (homepage), "(02) 8776 0644, 46 to 51 local 7000" (package banner) | [TO CONFIRM] |
| Messenger link | Facebook page URL used instead | No m.me link in the scrape | [TO CONFIRM] |
| Visiting hours | "Not published" | Not on the current site | [TO CONFIRM] |

## Lists the current site shows only as images or not at all

| Item | What the prototype shows | Status |
| --- | --- | --- |
| Accepted HMOs (hospital-wide) | 32 names read from logo alt text on the homepage | [TO CONFIRM] — official list needed. The logo wall on the live Contact page appears to show 33 logos, including "Pacific Cross" (we list "Pacific"), "HPPI Hive Health" (we list "HPPI") and "AsianLife" (not in our list). List left unchanged until PDH sends it |
| Data breach reporting form | DPO email shown instead | [TO CONFIRM] — the live Privacy page gives the form only as a QR image; PDH to supply the URL |
| Per-doctor accredited HMOs | As listed on each doctor's page; 113 doctors show "TBD" or nothing | [TO CONFIRM] for those doctors |
| Female Executive Package | PHP 5,780.00 with 12 inclusions, "Inclusive of Pap smear kit and Doctors PF" | [TO CONFIRM] — transcribed from the homepage banner (screenshot, 24 Nov 2026); confirm price and that the promo is current |
| Other packages | 6 sample packages, no prices | Sample — the current site shows packages only as banner images; PDH to supply the full list and prices |
| Room rates | Not shown | [TO CONFIRM] |
| PhilHealth process | 3 sample steps | Sample — PDH to supply |
| HMO approval steps | 4 sample steps | Sample — PDH to supply |
| "How to prepare" per service | Sample text on 16 services | Sample — PDH to supply |
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
| Schedules | 1 doctor (Abuel, Butch Joseph) has an empty schedule on his profile page; the site's listing shows "On call" |
| Duplicate profile | "Evangelista, Charina Nancy" has two pages on the current site (General Medicine MWF 6–8pm; Family Medicine MF 6–8pm). Both are shown; PDH to say which is correct |
| Photos | None used. The current site has portraits for roughly a third of the doctors; PDH to supply the files (not hotlinked) |

## Assets

| Item | Detail |
| --- | --- |
| Logo | Official lockup in `assets/` is used in the header and footer |
| Room photos | 20 photos of the Ward, Semi-private, Private, Suite and Isolation rooms, cropped from screenshots of PDH's current site (low resolution). PDH to confirm use and supply originals |
| Premium Labor Room | Marked "Soon to open", as on the current site; no photo. PDH to confirm opening status |
| Other photos | None supplied; labeled placeholders on every other image slot |
| Domain | `astro.config.mjs` uses the Vercel address `https://pdhcomph.vercel.app` until PDH chooses a domain |

## Not confirmed but shown as published (verify at sign-off)

- DOH level: "Level 2" (About page)
- Founded May 8, 2007; MPH member since 2024 (About page)
- Stats 94 beds / 320 doctors / 410 employees (homepage)
- Floors and hours for every service (Our Services page)
- Leadership team names and roles (About page)
- Data Privacy Notice text and date 10/8/2026 (Privacy Policy page)
- "PDH is DPO/DPS registered at NPC, valid until June 30, 2027" (Privacy Policy page; from the notice pop-up on the current site)
- Online lab results: mobile number + case number, OTP, 15 days of online viewing (Services page; from lis.pdh.com.ph)

## Decisions to mention at the demo

- The homepage motion uses GSAP, self-hosted and bundled at build time. The site makes no calls to any outside server, loads no fonts, analytics or widgets from third parties. Say this in one line so nobody reads "GSAP" as an external dependency.
