# GoPotty — Shopify Theme

A landing-page-style Shopify theme built for a self-cleaning dog potty product (or any single-hero pet product). Cream-toned, editorial typography, modular sections — all editable from the Shopify theme editor.

## What's inside

```
gopotty-theme/
├── assets/         base.css, theme.css, theme.js
├── config/         settings_schema.json, settings_data.json
├── layout/         theme.liquid
├── locales/        en.default.json
├── sections/       hero, trust-band, how-it-works, feature-breakdown,
│                   reviews, faq, newsletter, footer, header,
│                   announcement-bar, benefits-bar, main-product, etc.
├── snippets/       meta-tags
└── templates/      index.json, product.json, collection.json,
                    cart.json, page.json, blog.json, article.json,
                    404.json, search.json, password.liquid,
                    customers/ (login, register, account, etc.)
```

## Install

1. Zip the `gopotty-theme` folder (the ZIP must contain the folders directly at root — `assets/`, `config/`, `layout/`, etc., NOT a wrapping `gopotty-theme/` folder).
2. In Shopify admin go to **Online Store → Themes → Add theme → Upload zip file**.
3. Once uploaded, click **Customize**.
4. Create a product named "GoPotty" and assign at least one image and a price; the product page template will pick it up automatically.
5. Update the **Header** section's "Shop now" button link to point to your GoPotty product.

## Customize in the theme editor

Every section on the homepage is editable:

- **Hero** — eyebrow text, headline, subhead, image, CTA, 4 feature pills (icon + label)
- **Trust band** — 4 icon/title/text items
- **How It Works** — 3 numbered steps with images
- **Feature breakdown** — product diagram with left/right callouts
- **Reviews** — customer testimonials with name, avatar, and quote
- **FAQ** — accordion items
- **Newsletter, Benefits bar, Footer** — all editable

Colors and fonts live under **Theme settings → Colors / Typography**.

## Replacing the design with your real assets

The mockup uses a placeholder product image. To match the original look:

1. Upload your hero photo (the dog + potty) in **Hero → Hero image**.
2. Upload the three step photos in **How It Works → each step → Image**.
3. Upload the exploded product diagram in **Feature breakdown → Product image**.
4. Upload customer avatars in **Reviews → each review → Avatar**.

## Product copy

The product page uses Shopify's product description, so write your copy directly on the product in **Products → GoPotty**. The template adds the eyebrow, rating row, price + savings calculation, variant selector, quantity, add-to-cart, buy-it-now, and the trust benefits below.

## Notes

- Fonts: Fraunces (display) + Inter (body), loaded from Google Fonts.
- Icons are inline SVG — no external dependencies.
- JavaScript is vanilla and minimal: sticky header shadow, mobile drawer, FAQ accordion, variant picker, quantity input, thumbnail switcher, and scroll-reveal.
- Fully responsive; mobile-first.
