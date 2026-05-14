# Nexa — Umbrella Public Website Product Specification

**Document type:** Product specification (TestSprite / QA)  
**Product:** `nexa_web_public` — Nexa ecosystem marketing & waitlist site  
**Version:** 1.0  
**Last updated:** May 2026

---

## 1. Product overview

### 1.1 What this product is

**Nexa** is the **umbrella brand** for a Morocco-focused “super-app” roadmap: payments (**Nexa Pay**), mobility (**Nexa Go**), stays, marketplace, groceries, jobs, and related services. The **`nexa_web_public`** project is **not** any of the individual product apps. It is the **main public landing** on **joinnexa.ma** that:

- Presents the **end-to-end ecosystem story** in a long-scrolling experience.
- Links out to **live or future product sites** (e.g. `nexapay.ma`, `nexago.ma`, `nexastays.ma`) where applicable.
- Collects **waitlist** sign-ups for early access to the broader Nexa platform.
- Supports **English, French, and Arabic** with **RTL** for Arabic.
- Ships **static “What is Nexa?”** article pages for SEO in three languages.

### 1.2 Purpose of this website

| Goal | Description |
|------|-------------|
| **Positioning** | Explain “one ecosystem” value: one identity, wallet, and connected services. |
| **Discovery** | Surface each vertical (Pay, Go, Stays, Market, Fresh, Jobs) with copy and optional external links. |
| **Conversion** | **Join the Waitlist** form (`#waitlist`) with lead fields and `source: "nexa_web_public"`. |
| **Trust & brand** | Security, investors, careers, “news” updates, footer contacts and Instagram property links. |
| **SEO** | Root `index.html` metadata + JSON-LD; `public/sitemap.xml` and `robots.txt`; static `/about-nexa/` pages. |

### 1.3 How it should work (high level)

1. User loads **`/`** — React app (`App.tsx`) renders sections in order: header, hero, trust bar, what-is-Nexa, services grid, detailed services, why-Nexa, experience, vision, security, investors, careers, news, final CTA / waitlist, footer.
2. **Header** provides smooth scroll to anchor IDs; labels map to sections (e.g. “Trust” → `#blog` for the news block).
3. **Theme:** light/dark toggled from the header; `document.documentElement.classList` uses Tailwind **`dark`** mode; preference stored as **`nexa-public-theme`**.
4. **Locale:** dropdown sets **`nexa-public-locale`** (`en` \| `fr` \| `ar`), updates `lang` and **`dir`** (`rtl` for Arabic).
5. **Waitlist:** `POST` to **`{VITE_API_BASE_URL}/api/v1/waitlist`** with ecosystem waitlist payload (see §5).
6. **`/about-nexa/`**, **`/fr/about-nexa/`**, **`/ar/about-nexa/`** are **static HTML** under `public/` (not React routes).

---

## 2. Technical context

| Item | Detail |
|------|--------|
| **Stack** | Vite 6, React 18, TypeScript, Tailwind CSS 4, Motion (`motion/react`), large shared UI kit under `src/app/components/ui/` |
| **Routing** | SPA: `vercel.json` rewrites `/(.*)` → `/index.html`. About URLs are real files in `public/`. |
| **Dev server** | `npm run dev` → Vite default (**typically port 5173** unless configured). |
| **Production canonical** | `https://joinnexa.ma/` (see `index.html`, sitemap). |
| **API base (client)** | `import.meta.env.VITE_API_BASE_URL` or **`http://localhost:3000`** — point at the Nexa backend when testing the waitlist. |

---

## 3. Information architecture & URLs

| Path | Behavior |
|------|----------|
| `/` | Full React landing (all sections + `#waitlist`). |
| `/about-nexa/` | Static English article (“What is Nexa?”). |
| `/fr/about-nexa/` | Static French article. |
| `/ar/about-nexa/` | Static Arabic article. |
| `/sitemap.xml` | Lists home + three about URLs (`joinnexa.ma`). |
| `/robots.txt` | Crawler rules + sitemap reference. |

---

## 4. Page structure & section IDs (for testing)

Sections appear **top to bottom** as composed in `src/app/App.tsx`. Important **`id` anchors**:

| `id` | Section (purpose) |
|------|-------------------|
| *(hero has no id)* | Hero — primary CTA `#waitlist`, secondary scroll to `#services`. |
| `about` | What is Nexa — ecosystem overview (`what-is-nexa.tsx`). |
| `services` | Service grid — Nexa Pay / Go / Stays / Market / Fresh / Jobs (`services-section.tsx`). Pay & Go link to live sites when “Visit website” is shown. |
| `detailed-services` | Deep-dive cards per vertical (`detailed-services-section.tsx`). |
| *(why / experience / vision / security)* | No separate ids in grep beyond detailed-services; investors/careers/news follow. |
| `investors` | Investor / partner story (`investor-section.tsx`). Nav label **“How It Works”** scrolls here. |
| `careers` | Careers teaser (`careers-section.tsx`). |
| `blog` | “Latest updates” / news list (`news-section.tsx`). Nav label **“Trust”** scrolls here (marketing label ≠ DOM id). |
| `waitlist` | Final CTA + waitlist form (`final-cta.tsx`). Nav **“Contact”** targets here. |
| `footer-contact` | Footer (`footer.tsx`). |

**Navigation naming caveat:** Header/footer labels do not always match section semantics (e.g. **Trust** → `#blog`). Tests should assert **scroll target elements exist**, not only label text.

---

## 5. Waitlist feature (critical path)

### 5.1 Form fields (browser)

| Field | Required | Sent to API | Notes |
|-------|----------|-------------|--------|
| Full name | Yes | `full_name` | Text |
| Phone | Yes | `phone_number` | Tel |
| Email | Yes | `email` | Email |
| I am joining as | Yes | `user_type` | Dropdown values in UI: **`investor`**, **`rider`**, **`driver_courier`**, **`merchant_partner`** |
| City | Yes | `city` | Morocco city list (values like `Casablanca`; labels localized). |
| Usage | No | `how_will_use_nexa` | Optional; mapped from internal `usage_note`. |
| — | — | **`source`** | Fixed string **`nexa_web_public`**. |

The client may also include **`usage_note`** in the JSON body via spread; backends typically persist **`how_will_use_nexa`** per DTO.

### 5.2 API — `POST /api/v1/waitlist`

**URL:** `{VITE_API_BASE_URL}/api/v1/waitlist`  
**Headers:** `Content-Type: application/json`

**Example body:**

```json
{
  "full_name": "Test User",
  "phone_number": "+212612345678",
  "email": "test@example.com",
  "city": "Casablanca",
  "user_type": "rider",
  "how_will_use_nexa": "Try Pay and Go together",
  "source": "nexa_web_public"
}
```

**Backend alignment:** Nexa backend accepts **`user_type`** among: `consumer`, `merchant`, `investor`, `rider`, `driver_courier`, `merchant_partner`. This site’s dropdown uses the **four mobility/ecosystem-oriented** values plus **investor**.

### 5.3 UI expectations

- Loading state on submit; no double submit while submitting.
- Success: localized success message; form cleared.
- Error: show API `message` when present, else generic localized error.

---

## 6. Ecosystem links & external surfaces

- **Services grid** links out where `website` is set: e.g. **https://nexapay.ma**, **https://nexago.ma**, **https://nexastays.ma** (when “Visit website” / equivalent is offered in UI).
- **Footer** Instagram links: `@joinnexa`, **nexago.ma**, **nexapay.ma**, **nexastays.ma** handles on Instagram.
- **Contact:** `mailto:` for `contact@joinnexa.ma`, `partnerships@joinnexa.ma`, `support@joinnexa.ma`.

---

## 7. Internationalization & theme

- **Locales:** `en`, `fr`, `ar` — strings from `src/app/i18n.tsx`.
- **Storage:** `nexa-public-locale`; initial value from storage or `navigator.languages`.
- **RTL:** Arabic sets `document.documentElement.dir` to `rtl`.
- **Theme:** `nexa-public-theme` (`light` / `dark`); root toggles `class="dark"` on `<html>` for Tailwind dark mode.

---

## 8. SEO & static assets

- **`index.html`:** Title, description, canonical **`https://joinnexa.ma/`**, Open Graph, Twitter, JSON-LD (`Organization` + `WebSite`).
- **`public/sitemap.xml`:** Home + three about URLs.
- **About pages:** Per-language meta, `hreflang`, JSON-LD where included in static HTML.

---

## 9. Out of scope for this website

- Logging into Nexa products, wallet balance, booking rides, or completing payments (handled in apps / other domains).
- Full careers ATS or investor dataroom (marketing CTAs only unless wired elsewhere).

---

## 10. Suggested TestSprite / E2E scenarios (summary)

1. Load `/` — hero, services, waitlist card, footer render; no uncaught console errors.
2. Toggle **dark** mode — `html.dark` present; preference survives reload.
3. Switch **FR** / **AR** — copy updates; **AR** is RTL.
4. Exercise header/footer scroll actions — target sections (`about`, `services`, `investors`, `blog`, `waitlist`, `careers`) exist and scroll completes.
5. Visit **`/about-nexa/`** and switch language via static nav links.
6. Submit waitlist with **valid** data (API reachable) — success.
7. Submit with **invalid** email / missing required fields — validation or API error messaging.
8. `GET /sitemap.xml` and `GET /robots.txt` — expected URLs.
9. Optional: click **Visit website** on Pay/Go/Stays cards — external URLs open (new tab behavior per implementation).

---

## 11. Document control

| Field | Value |
|-------|--------|
| **Repository path** | `nexa_web_public/` |
| **Shell / SEO** | `index.html` |
| **App root** | `src/app/App.tsx`, `src/main.tsx` |
| **Waitlist UI** | `src/app/components/final-cta.tsx` |
| **i18n** | `src/app/i18n.tsx` |
| **Static about** | `public/about-nexa/`, `public/fr/about-nexa/`, `public/ar/about-nexa/` |
| **Deploy** | `vercel.json` SPA fallback |

---

*Upload this file as the Product Specification when configuring Nexa umbrella web tests in TestSprite.*
