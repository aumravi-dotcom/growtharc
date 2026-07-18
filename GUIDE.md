# Growth Arc — Setup & How-To Guide

Everything you need to take this from files to a live site. Work top to bottom.

---

## 1. What's in the folder

```
growth-arc/
├── index.html        ← the main landing page
├── privacy.html      ← Privacy Policy (template — fill the [brackets])
├── terms.html        ← Terms, Refund & Disclaimer (template — fill the [brackets])
├── google-apps-script.gs  ← paste into Google Sheets to receive form leads
├── blog/
│   ├── index.html    ← blog listing
│   └── how-to-get-quality-leads-from-instagram.html  ← sample post = your template
└── assets/
    ├── logo-dark.svg / .png    ← logo for dark backgrounds (Growth = cream, Arc = gold)
    ├── logo-light.svg / .png   ← logo for light backgrounds (Growth = navy, Arc = gold)
    ├── logo-mark.png           ← just the arc + node mark
    ├── favicon.svg, favicon-32.png, favicon-64.png
    ├── apple-touch-icon.png    ← 180px, for iPhone home screen
    └── icon-512.png            ← large app icon
```

---

## 2. Placeholder checklist (replace before going live)

- [ ] **Your photo** — About section in `index.html` (search "Your photo here").
- [ ] **Contact details** — footer: email `hello@growtharc.com`, phone `+91 00000 00000`, and the address line.
- [ ] **Domain** — in `blog/` files and policy pages, replace `https://your-domain.com` everywhere.
- [ ] **Legal pages** — fill every `[bracket]` in `privacy.html` and `terms.html`, then have a professional review them.
- [ ] **Calendly** — see section 4.
- [ ] **Form endpoint** — see section 3.
- [ ] **Pricing** — confirm the two suggested tier prices (₹50,000 and ₹1,25,000) or change them.
- [ ] **Tagline / About copy** — final About text once you answer the questions.

---

## 3. Connect the form to a Google Sheet (receive leads)

1. Create a new Google Sheet.
2. In it: **Extensions → Apps Script**. Delete the placeholder code, paste **all** of `google-apps-script.gs`, save.
3. **Deploy → New deployment → Web app.** Execute as **Me**; Who has access **Anyone**. Deploy, authorise, and **copy the Web app URL**.
4. Open `index.html`, find this line (near the bottom):
   ```js
   const SHEET_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   Paste your URL inside the quotes.
5. Submit a test. A row should appear with **date & time in IST** and exactly your form columns.

> The form already validates required fields and shows the booking step after a successful send. If you ever add/remove form fields, update `HEADERS` and `FIELDS` in the script to match.

---

## 4. Add your Calendly

In `index.html`, find the `cal-placeholder` block (the dashed box in the booking step). Two options:

- **Simple:** change the `#calBtn` link to your Calendly URL and remove the placeholder `alert(...)` line in the script.
- **Embedded (better):** replace the whole `cal-placeholder` div with Calendly's inline embed snippet (from Calendly → Share → Add to website → Inline). It will render right inside the card.

---

## 5. Deploy on Vercel

Vercel serves static HTML out of the box — no build step needed.

1. Put the `growth-arc` folder in a **GitHub** repo (or drag-and-drop the folder in the Vercel dashboard).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Settings that matter:
   - **Framework Preset:** Other
   - **Build Command:** *(leave empty)*
   - **Output Directory:** `.` (the folder with `index.html`)
   - **Root Directory:** the `growth-arc` folder if your repo has it nested.
4. Deploy. You'll get a `*.vercel.app` URL instantly.
5. **Custom domain:** Project → Settings → Domains → add `growtharc.com` and follow the DNS steps.

URLs will be clean: `your-domain.com/`, `/blog/`, `/privacy.html`, etc. After deploying, update the `https://your-domain.com` placeholders so SEO tags and the `og:image` point at the real site, then redeploy.

---

## 6. Writing new blog posts (SEO + AEO + GEO)

**The fastest way:** duplicate `blog/how-to-get-quality-leads-from-instagram.html`, rename it (use hyphens, e.g. `cost-per-lead-explained.html`), and replace the content. It already has the full structure baked in. Then add a card linking to it on `blog/index.html`.

Here's what each term means and exactly what to do for it.

### SEO — being found in classic Google search
- **One primary keyword per post**, placed in the `<title>`, the `<h1>`, the URL, and naturally in the first paragraph. (e.g. "quality leads from Instagram").
- **Meta description** (~150 chars) that reads like an ad, not a summary.
- **One `<h1>`**, then logical `<h2>`/`<h3>` headings.
- **Internal links** to your homepage and other posts; link back to `#apply`.
- **`<link rel="canonical">`** set to the post's real URL (avoids duplicate-content issues).
- **Descriptive image alt text** when you add images.
- **Fast & mobile-friendly** — this template already is.

### AEO — Answer Engine Optimization (Google's AI answers, featured snippets, voice)
- **Lead with the answer.** The "Short answer" box at the top of the sample post exists so a machine can lift a clean, direct answer. Keep it to 2–4 sentences.
- **Phrase headings as real questions** people ask ("Why don't my Instagram likes turn into customers?").
- **Answer immediately under each question** in 1–3 tight sentences before expanding.
- **FAQ schema** — the sample has a `FAQPage` JSON-LD block. Update its questions/answers to match the post. This is what can earn the expandable FAQ result in Google.

### GEO — Generative Engine Optimization (ChatGPT, Perplexity, Gemini, etc.)
GEO is about being **quotable by AI assistants** when someone asks them a question in your niche.
- **Be specific and factual.** AI models prefer concrete claims, numbers, and clear definitions over fluff. (e.g. "A quality lead matches four criteria: fit, need, budget, and a deliberate action.")
- **Define your terms** plainly — models love a crisp definition they can reuse.
- **Use structured data** (Article + FAQ JSON-LD, already included). It helps machines understand who said what.
- **Establish authorship & authority** — the `author` and `publisher` fields in the JSON-LD, plus your real bio on the site, signal credibility.
- **Self-contained sections.** Write each section so it makes sense lifted out on its own; that's how it ends up quoted.
- **Keep it updated** — refresh `dateModified` when you revise; recency helps.

### A quick pre-publish checklist
- [ ] Primary keyword in title, H1, URL, first paragraph
- [ ] "Short answer" box at the top
- [ ] Question-style H2s with immediate answers
- [ ] FAQ JSON-LD updated to this post
- [ ] `BlogPosting` JSON-LD: headline, author, dates, canonical updated
- [ ] Canonical + OG tags point to the real URL
- [ ] A link to `#apply`
- [ ] Added a card on `blog/index.html`

---

## 7. Using your logo

- On dark backgrounds (your site, social headers): `logo-dark.svg/.png`.
- On light backgrounds (invoices, letterhead, light decks): `logo-light.svg/.png`.
- App icon / favicon: already wired into every page via `assets/favicon.svg` and the PNGs.
- The SVGs are vector and outlined — they scale to any size with no font needed, so they'll stay crisp on billboards or business cards.

---

Questions or changes — just ask. Two things still need your input: your **About** story (a few questions waiting for you) and **confirming the pricing tiers**.
