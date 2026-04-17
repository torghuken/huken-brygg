# Huken BRYGG — Hjemmeside for publikum

> Denne filen leses av Claude ved oppstart av hver sesjon for å opprettholde kontekst.

---

## Prosjektoversikt

**Produkt:** Publikumsrettet hjemmeside for Huken BRYGG (bar/restaurant/klubb)
**URL (live):** https://hukenbrygg.no
**GitHub:** https://github.com/torghuken/huken-brygg
**Vercel:** Importert under torghukens-projects
**Supabase:** https://supabase.com/dashboard/project/shlkqnemrnvdbdqebdzw (prosjektnavn: hukenbrygg.no)

**Lokalt prosjekt:** `~/Documents/Claude/Projects/huken-brygg`

---

## Tech Stack

| Hva | Valg |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Animasjoner | Framer Motion |
| Database | Supabase (eget prosjekt, SEPARAT fra SKINS) |
| SMS | Twilio (delt konto med SKINS, men egne env vars) |
| Hosting | Vercel → hukenbrygg.no |
| Fonter | Instrument Serif, Lora, Cormorant, Bebas Neue |

---

## ⚠️ KRITISK: Prosjektseparasjon

**Huken BRYGG og SKINS VIP er HELT SEPARATE prosjekter.**
- Egne Supabase-prosjekter (aldri del tabeller/data)
- Egne Vercel-prosjekter
- Egne env vars (SUPABASE_URL, SUPABASE_ANON_KEY, MANAGER_PHONE)
- Twilio-konto kan deles, men telefonnummer til daglig leder er konfigurerbart per prosjekt

---

## Supabase

**Project ref:** `shlkqnemrnvdbdqebdzw`
**URL:** `https://shlkqnemrnvdbdqebdzw.supabase.co`
**Anon key:** `eyJhbGci...2ls61T-wTXtwqNiUfvrzYKAaGBdlAI4rKX_AYCF4W8A` (se .env.local for full key)

### Planlagte tabeller
| Tabell | Beskrivelse | Status |
|---|---|---|
| `bookings` | Bordbookinger fra gjester | Opprettet |
| `events` | Kommende events (The Underground) | Opprettet |
| `settings` | Åpningstider, meny-URL, etc. | TODO |

---

## Konsept: "Tre plakater fra tre verdener"

Vertikal scroll med scroll-snap. Mobil-first. Hver etasje er et eget visuelt univers med hard cut mellom seksjonene (ingen smooth transitions).

| Seksjon | Navn | Vibe | Font | Farger |
|---|---|---|---|---|
| Hero | HUKEN BRYGG | Mørk, rå | Instrument Serif | Svart, gull (#c8a44e) |
| 1. etasje | The Gastro Bar | Varm, analog, filmkorn | Lora (italic) | Brent umber, kobber, krem |
| 2. etasje | The Cocktail Lounge | Elegant, silk, dempet | Cormorant (light) | Smaragd, gull, svart |
| Kjelleren | The Underground | Mørk, mystisk, glitch | Bebas Neue | Svart, blodrødt, neon |
| Footer | Info | Nøytral | Cormorant | Svart |

### Tekst-tone: Kort og mystisk
- Hero: "Three floors. Three worlds. One night."
- Gastro Bar: "Where fire meets flavor."
- Cocktail Lounge: "Sip slow. Stay late."
- Underground: "You weren't supposed to find this place."

---

## Sidestruktur

```
hukenbrygg.no
├── /           → Landing page (5 seksjoner: hero, gastro, lounge, underground, footer)
├── /book       → Booking-side (velg etasje, dato, antall, SMS-varsling)
├── /events     → Kommende events
└── /admin      → Admin (events + bookinger + innstillinger)
```

---

## Viktige filer

| Fil | Beskrivelse |
|---|---|
| `src/app/page.tsx` | Landing page — 5 scroll-snap seksjoner |
| `src/app/globals.css` | Alt av styling, CSS vars, overlays, grain |
| `src/app/layout.tsx` | Root layout med Google Fonts |
| `src/app/book/page.tsx` | Booking-skjema (koblet til API) |
| `src/app/api/book/route.ts` | POST API: lagre booking i Supabase + SMS til daglig leder |
| `src/lib/supabase.ts` | Supabase client (anon key) |
| `src/app/events/page.tsx` | Events-side (grunnstruktur) |
| `src/app/admin/page.tsx` | Admin-side (grunnstruktur) |
| `public/logo.png` | Huken BRYGG logo |
| `public/images/gastro.jpg` | Bilde 1. etasje |
| `public/images/lounge.jpg` | Bilde 2. etasje |
| `public/images/underground.jpg` | Bilde kjelleren |
| `public/video/hero.mp4` | Hero-video (fasade/stemning) |

---

## Booking-flyt (planlagt)

1. Gjest klikker "Book bord" → `/book?floor=gastro|lounge|underground`
2. Fyller ut: etasje, dato, tid, antall, navn, telefon, e-post, notat
3. Lagres i Supabase `bookings`-tabell
4. SMS sendes til daglig leder via Twilio
5. Leder godkjenner/avviser (via SMS-lenke eller admin-side)
6. SMS-bekreftelse til gjest

---

## Språk

Tospråklig NO/EN med toggle (fixed øverst til høyre). Alle tekster ligger i `texts`-objektet i hver page.tsx.

---

## DNS-oppsett (ferdig)

| Type | Navn | Verdi |
|---|---|---|
| A | hukenbrygg.no | 76.76.21.21 (Vercel) |
| CNAME | www.hukenbrygg.no | cname.vercel-dns.com |

Registrar: domene.no (cPanel for DNS Zone Editor)

---

## Hva som fungerer ✅

- Landing page med 5 scroll-snap seksjoner (hero + 3 etasjer + footer)
- Hero-video, bilder for alle etasjer
- NO/EN språktoggle
- Animasjoner (Framer Motion fade-up)
- Booking-skjema UI (uten backend)
- Events-side (grunnstruktur)
- Admin-side (grunnstruktur)
- GitHub repo pushet
- Vercel deploy med custom domain hukenbrygg.no
- DNS konfigurert

## Hva som mangler / TODO

- [x] Supabase: hent anon key og sett opp env vars
- [x] Supabase: opprett bookings-tabell (med RLS)
- [x] Supabase: opprett events-tabell (med RLS)
- [x] Booking-side: koble til Supabase via API
- [x] API: SMS-varsling til daglig leder (Twilio) — klar, trenger env vars
- [ ] API: SMS-bekreftelse til gjest
- [ ] Events-side: koble til Supabase
- [ ] Admin-side: CRUD for events + booking-oversikt
- [ ] Instagram-embed i footer
- [ ] Åpningstider/meny-URL konfigurerbart

---

## Git

**Branch:** main
**Remote:** origin → github.com/torghuken/huken-brygg
