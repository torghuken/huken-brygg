# Meta App Setup — Facebook Events + Instagram Feed

Denne guiden kobler Facebook Events og Instagram-poster til hukenbrygg.no automatisk.

---

## Steg 1: Lag Meta App

1. Gå til **https://developers.facebook.com**
2. Klikk **"Create App"**
3. Velg **"Other"** → **"Business"**
4. Gi appen et navn, f.eks. `Huken BRYGG Website`
5. Velg Business Portfolio: **Huken BRYGG**

## Steg 2: Legg til produkter

I app-dashboardet:
1. Klikk **"Add Product"**
2. Legg til **"Facebook Login for Business"**

## Steg 3: Generer Page Access Token

1. Gå til **https://developers.facebook.com/tools/explorer/**
2. Velg din app (Huken BRYGG Website) øverst
3. Under **"User or Page"** → velg **"Huken BRYGG"** (Page token)
4. Klikk **"Add a Permission"** og legg til:
   - `pages_read_engagement`
   - `pages_show_list`
   - `instagram_basic`
5. Klikk **"Generate Access Token"**
6. Godkjenn tillatelsene i popup-vinduet
7. Kopier tokenet

## Steg 4: Bytt til permanent token

Det tokenet du fikk varer bare 1 time. For å gjøre det permanent:

### 4a: Bytt til long-lived user token
Åpne denne URLen i nettleseren (bytt ut verdiene):

```
https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=DIN_APP_ID&client_secret=DIN_APP_SECRET&fb_exchange_token=DET_KORTE_TOKENET
```

- `DIN_APP_ID` → finnes i App Dashboard → Settings → Basic
- `DIN_APP_SECRET` → finnes samme sted
- `DET_KORTE_TOKENET` → det du kopierte fra Graph Explorer

Du får tilbake et `access_token` som varer 60 dager.

### 4b: Hent permanent Page Access Token
Med det long-lived tokenet, åpne:

```
https://graph.facebook.com/v21.0/me/accounts?access_token=LONG_LIVED_TOKEN
```

I responsen finner du `access_token` for Huken BRYGG-pagen. **Denne utløper aldri** (så lenge du ikke endrer passord eller fjerner appen).

## Steg 5: Finn Instagram User ID

Med Page Access Token, åpne:

```
https://graph.facebook.com/v21.0/me?fields=instagram_business_account&access_token=PAGE_ACCESS_TOKEN
```

Du får tilbake `instagram_business_account.id` — dette er din Instagram User ID.

## Steg 6: Finn Facebook Page ID

Du finner Page ID i Business Suite, eller åpne:

```
https://graph.facebook.com/v21.0/me?access_token=PAGE_ACCESS_TOKEN
```

`id`-feltet er din Page ID.

## Steg 7: Legg inn i Vercel

Gå til **Vercel → huken-brygg → Settings → Environment Variables** og legg til:

| Variable | Verdi |
|---|---|
| `META_PAGE_ACCESS_TOKEN` | Det permanente Page Access Token fra steg 4b |
| `META_PAGE_ID` | Facebook Page ID fra steg 6 |
| `META_INSTAGRAM_USER_ID` | Instagram User ID fra steg 5 |
| `CRON_SECRET` | En tilfeldig streng (f.eks. `openssl rand -hex 32` i terminalen) |

Legg også til `CRON_SECRET` i `.env.local` lokalt for testing.

## Steg 8: Kjør SQL i Supabase

Gå til **Supabase → SQL Editor** og kjør innholdet i `supabase-social.sql`.

## Steg 9: Test

Etter deploy til Vercel, test manuelt:

```bash
# Test Facebook sync
curl https://hukenbrygg.no/api/sync-facebook \
  -H "Authorization: Bearer DIN_CRON_SECRET"

# Test Instagram sync
curl https://hukenbrygg.no/api/sync-instagram \
  -H "Authorization: Bearer DIN_CRON_SECRET"
```

Begge bør returnere `{"success": true, "fetched": ..., "upserted": ...}`.

## Steg 10: Verifiser cron

Vercel cron kjører automatisk:
- **Facebook events:** Hver hele time (xx:00)
- **Instagram posts:** Hver halvtime (xx:30)

Sjekk Vercel Dashboard → Cron Jobs for å se kjørelogg.

---

## Oppsummering

```
Facebook Page ──→ Graph API ──→ /api/sync-facebook ──→ Supabase events ──→ /events + landing page
Instagram ──────→ Graph API ──→ /api/sync-instagram ──→ Supabase instagram_posts ──→ footer
                                     ↑
                              Vercel Cron (hver time)
```

Når alt er satt opp: **lag event på Facebook → det dukker opp på hukenbrygg.no innen 1 time**. Post på Instagram → vises i footeren innen 30 min.
