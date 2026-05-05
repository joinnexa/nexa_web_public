# Google Search Console — Nexa (`joinnexa.ma`)

Static assets in `public/`:

- **`/robots.txt`** → references `https://joinnexa.ma/sitemap.xml`
- **`/sitemap.xml`**
- **`/about-nexa/`**, **`/fr/about-nexa/`**, **`/ar/about-nexa/`** — multilingual “What is Nexa?” pages (`hreflang` + Organization / WebSite JSON-LD)

Root **`index.html`** carries default meta, canonical **`https://joinnexa.ma/`**, OG/Twitter tags, and JSON-LD.

## Verify & submit

1. Property: **`https://joinnexa.ma`**
2. Sitemap: **`https://joinnexa.ma/sitemap.xml`**
3. Request indexing:
   - `https://joinnexa.ma/`
   - About cluster URLs listed in `public/sitemap.xml`

See [`SEO_BACKLINKS.md`](SEO_BACKLINKS.md), [`SEO_MONITORING.md`](SEO_MONITORING.md).
