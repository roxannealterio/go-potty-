# GoPotty — Shopify Theme & Setup Guide

A complete brand-aware Shopify theme for **gopotty.au** with full SEO/structured data, animated UI, popup, and ready-to-publish legal pages aligned with Australian Consumer Law.

---

## 1. Install the theme

1. The folder `gopotty-theme.zip` contains the theme.
2. In Shopify admin: **Online Store → Themes → Add theme → Upload zip file**.
3. Once uploaded, click **Customize** to see it in the editor.
4. Click **Publish** to make it live.

> **Note:** the `legal-pages/` folder in the zip is NOT part of the theme — those are content templates you'll copy into Shopify Pages (see Step 3).

---

## 2. Contact info & social — already wired in

Your details are baked in as theme defaults:

| Setting | Value |
| --- | --- |
| Email | `contactus@gopotty.au` |
| Instagram | `https://instagram.com/gopotty.au` |
| Hours | Mon–Fri, 9am–5pm AEST |

These show up automatically in:
- Footer (with mailto and Instagram link)
- Contact page (with icon cards)
- JSON-LD structured data for Google
- Newsletter popup (returns email)

To change later: **Customize → Theme settings → Contact info / Social**.

---

## 3. Legal pages — copy & paste into Shopify

Four pre-written legal pages are in the `legal-pages/` folder. **These are templates, not legal advice — review carefully and have a lawyer check before publishing.**

For each file:

1. Open the `.html` file in any text editor
2. Find and replace `[YOUR REGISTERED BUSINESS NAME]` with your actual registered business name
3. Find and replace `[YOUR ABN]` with your ABN
4. Find and replace `[DATE — insert when publishing]` with today's date
5. Find and replace `[YOUR STATE — ...]` in the Terms with your business's state (e.g., `Queensland`)
6. In Shopify admin: **Online Store → Pages → Add page**
7. Paste the HTML into the `<>` source view (click "Show HTML" button in the editor)
8. Set the URL handle as shown below — these match the links already in the footer

| File | Title | URL handle |
| --- | --- | --- |
| `privacy-policy.html` | Privacy Policy | `privacy-policy` |
| `terms-of-service.html` | Terms of Service | `terms-of-service` |
| `refund-policy.html` | Refund & Returns Policy | `refund-policy` |
| `shipping-policy.html` | Shipping Policy | `shipping-policy` |
| `about.html` | About Us | `about` |

> **Tip:** Shopify can also auto-generate legal pages from **Settings → Policies**. If you've already done that, the footer will link to those instead — just update the footer menu links if needed.

---

## 4. SEO is fully wired

The theme includes comprehensive SEO out of the box. No setup required, but here's what's happening:

### Meta tags on every page
- Optimised title tag with brand name
- Page-specific meta description (auto-generated from content)
- `robots` tag set to allow indexing with max snippet/image previews
- Canonical URL

### Open Graph + Twitter Card
Every page has proper sharing tags so links posted on Facebook, Instagram, WhatsApp, X, etc. show a nice preview with title, description, and image.

### JSON-LD Structured Data (huge for Google rankings)
Five different schemas are output where relevant:

- **Organization** — brand info, logo, social links, email
- **WebSite** — site name + sitelinks search box
- **Product** — name, price, currency, availability, brand, aggregate rating (4.9 / 1,248 reviews) — these are the "rich snippets" you see in Google results with star ratings and prices
- **Article** — for blog posts (auto-included)
- **BreadcrumbList** — the breadcrumb path Google shows in search results

### Site verification
Add your Google Search Console / Bing Webmaster Tools verification codes in **Theme settings → SEO**. These are required to submit your sitemap and monitor SEO performance.

### Next steps for SEO
1. Submit your sitemap to Google Search Console at `https://gopotty.au/sitemap.xml`
2. Verify your business with Bing Webmaster Tools
3. In **Shopify Admin → Products / Pages / Collections**, fill in the SEO fields (title, meta description) for each — these override defaults
4. Add alt text to all product images
5. Connect Google Analytics 4 via Shopify Admin → Online Store → Preferences

---

## 5. Newsletter popup

Already configured to your spec:
- Appears once, 8 seconds after page load
- Remembered via localStorage (won't bug returning visitors)
- ESC to close, click backdrop to close
- Two-column branded design with email capture
- Tagged `newsletter, popup` in Shopify customers

Customize in **Customize → Newsletter popup**.

---

## 6. Announcement bar

Already configured to rotating mode with 3 messages cycling every 4 seconds:
1. FREE SHIPPING ON ALL ORDERS OVER $99
2. 30-DAY MONEY-BACK GUARANTEE
3. TRUSTED BY 1,248+ HAPPY PET PARENTS

Customize text or animation style in **Customize → Header → Announcement bar**.

---

## 7. Final pre-launch checklist

- [ ] Replace `[YOUR REGISTERED BUSINESS NAME]` and `[YOUR ABN]` in all 4 legal files
- [ ] Set the publish date in each legal file
- [ ] Have a lawyer review the legal pages (especially Terms and Privacy)
- [ ] Create the GoPotty product in Shopify Admin → Products with images and price in AUD
- [ ] Make sure the product handle is `gopotty` (matches the header CTA link)
- [ ] Set up payments in **Settings → Payments** (Shopify Payments for AU + Afterpay recommended)
- [ ] Set tax settings in **Settings → Taxes and duties** (GST for Australia)
- [ ] Add Google Search Console verification code in theme settings → SEO
- [ ] Submit sitemap to Google Search Console: `https://gopotty.au/sitemap.xml`
- [ ] Test the contact form by submitting a test message
- [ ] Test the newsletter popup
- [ ] Test the checkout flow with Shopify's Bogus Gateway
- [ ] Connect your domain `gopotty.au` in **Settings → Domains**
- [ ] Add favicon and social share image in **Theme settings → Branding**

---

## 8. File structure

```
gopotty-theme/
├── assets/           CSS, JS, logo SVGs
├── config/           settings_schema, settings_data (with your details)
├── layout/           theme.liquid (with site verification)
├── legal-pages/      HTML templates → copy into Shopify Pages
├── locales/          en.default.json
├── sections/         All 17 sections incl. main-contact, newsletter-popup
├── snippets/         logo, meta-tags (SEO), announcement-icon
└── templates/        All page templates incl. page.contact.json
```

---

## Support

Built by Claude. If you need theme tweaks, just describe what you want changed.
