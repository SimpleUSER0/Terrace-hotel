# TERRACE 17 — Boutique Hotel, Tbilisi

A complete, responsive one-page fictional hotel portfolio concept built with **HTML, CSS and Vanilla JavaScript**. There is no framework, build process, backend or runtime dependency. All photos and fonts are included locally. `index.html` is at the project root, and all asset paths are relative for GitHub Pages.

## Fictional demo disclaimer

**Fictional portfolio project — not a real hotel.**

The brand, room types, descriptions, prices, capacities, sizes, amenities, reviews, distances and contact details are illustrative. Photographs are licensed stock images of interiors and Tbilisi, not photographs of Terrace 17 or a single property. Images do not represent exact room layouts. Sources and licenses are documented in `CREDITS.md`.

Demo status appears in the hero, room specifications, availability search, reviews, location, contact section, forms and footer. A `noindex, nofollow` directive discourages search indexing; this does not make a published page private. Structured data describes a fictional creative website concept, not a real hotel listing or review score.

## Files

```text
index.html
css/style.css
js/script.js
assets/images/
assets/fonts/
README.md
CREDITS.md
QA.md
.nojekyll
```

## Run locally

1. Extract the ZIP archive.
2. Open `index.html` in a current browser.
3. Keep the `css`, `js` and `assets` folders alongside it.

No internet connection is needed to browse the website. The optional map link opens a Tbilisi city search in Google Maps.

For an optional local server, run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Python is not required for the deployed website.

## Deploy on GitHub Pages

1. Create a repository, for example `terrace-17`. Select **Public** for GitHub Free.
2. Choose **Add file → Upload files**. Upload the extracted **contents**, not the ZIP or its enclosing folder. `index.html` must be visible at the repository root.
3. Commit the files to `main`.
4. Open **Settings → Pages**.
5. Set **Source: Deploy from a branch**, **Branch: main**, folder **/(root)**, and **Save**.
6. Wait for publication and open the link shown on that page. The usual format is `https://YOUR-USERNAME.github.io/terrace-17/`.

The empty `.nojekyll` file bypasses Jekyll processing. There is no build command to configure. Relative paths also work when the repository name changes.

Official guidance: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### მოკლე ინსტრუქცია ქართულად

ამოარქივე ZIP და ახალ საცავში ატვირთე **შიგთავსი** — `index.html`, `css`, `js`, `assets` და დანარჩენი ფაილები. შემდეგ გახსენი **Settings → Pages → Deploy from a branch → main → /(root) → Save**. გამოქვეყნებული ბმული გამოჩნდება იმავე გვერდზე.

## Working interactions

- Sticky navigation, mobile hamburger menu, smooth anchors and visible keyboard focus.
- A quick availability search with check-in, check-out, guests and room preference. Its valid submission displays: **“Demo availability request — connect a booking system in the live version.”**
- An optional next step transfers the selected dates, guest count and room preference into the demo booking form. No availability is checked against a real system.
- Four room detail windows, each with multiple selectable photos, specifications, amenities, demo price and a **Book Room** action. Booking opens with the chosen room selected.
- A booking form with name, email, phone, check-in, check-out, guests, room type and special request.
- Validation checks required fields, whitespace-only names, sample email and phone formats, past arrivals, checkout after check-in and selected room capacity.
- Successful booking shows the requested demo confirmation and clears entered data. Closing a form also clears it.
- All WhatsApp buttons open the local demo booking form with a suggested message. They never open a live WhatsApp chat.
- Phone, email, Instagram and Booking.com actions explain their demo status. No call, email, social account or real property listing is opened.
- Nine gallery photos with lightbox, next/previous buttons, keyboard arrows, Escape, backdrop dismissal, swipe and focus restoration.
- Fixed mobile **Book Now** CTA, lazy-loaded images and scroll reveals that respect reduced-motion preferences.
- Without JavaScript, the sections, navigation, room images and gallery image links remain available. Demo modals require JavaScript.

## Privacy and demo behaviour

Use sample details only. The website makes no form requests and uses no trackers, cookies, localStorage or sessionStorage. Forms use `method="dialog"` as an additional safeguard against accidental native server submission. Data is kept only while interacting with a form, then cleared on success or dismissal.

The exact booking confirmation is:

> Thank you! This is a demo booking request. In a live website, this can be connected to email, WhatsApp or a booking system.

This does not reserve a room, confirm a price, check stock or send any message. Real hotel order handling would require a separately configured booking or communication service.

## Editing

- Change page copy, card prices, amenities and distances in `index.html`.
- Room modal details are in the `rooms` object in `js/script.js`. Keep those consistent with their corresponding HTML cards.
- Room `id` values must match card `data-room` attributes and form option values.
- Replace images in `assets/images/`, then update alt text and image dimensions as needed. Keep filenames or update every reference.
- Change colours and layout in `css/style.css`.
- The daily date limits use the visitor’s local calendar date.
- The map deliberately searches **Tbilisi city**, not a fictional street or hotel pin.
- The `.example` email and all-zero phone are intentionally non-working demo contacts.

For a real hotel, replace all fictional information with approved business details, configure live contact and booking actions, and obtain suitable property photography. Remove demo labels and indexing restrictions only when the website actually represents an approved real business. Add the final canonical and social image URLs after a deployment domain is known.

## SEO and accessibility

Includes the requested title and description, Open Graph metadata, English language declaration, a brand favicon, one main heading and descriptive image alternatives. Semantic sections, lists and definition lists describe rooms and amenities. Native dialogs support focus handling and keyboard dismissal. No hotel review score, rating, canonical domain or live business structured data is invented.

Browser verification and remaining testing limits are described in `QA.md`.
