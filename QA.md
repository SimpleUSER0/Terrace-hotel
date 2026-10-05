# Browser verification

Prepared: 2026-10-05.

**91 automated browser checks passed. No console, JavaScript, HTTP or asset-loading errors were recorded.**

Verification used Chromium through Playwright against a local server under the `/terrace-17/` repository prefix, plus direct `file://` opening. Screenshots were visually reviewed for desktop, mobile, room details and the gallery.

## Verified

- All seven navigation anchors and in-page destinations exist and work.
- Responsive widths: 320, 360, 390, 600, 768, 900, 1024, 1180, 1200, 1280, 1440 and 1920 px, without horizontal overflow.
- Text enlarged to 200% fits the mobile width.
- Sticky navigation, hamburger, mobile link closure, Escape and focus restoration.
- Fixed mobile booking CTA.
- All four room modals, multiple selectable photos, amenities, correct room preselection and restoration of focus after the room-to-booking flow.
- Quick availability validation, room capacity checks and the exact demo response. Dates and room preference transfer to booking correctly.
- Booking required fields, whitespace names, email, telephone, past arrivals, checkout after checkin and guest capacity.
- Valid booking shows the required confirmation and clears personal details. Cancellation clears details too.
- Demo WhatsApp, phone, email, Instagram, Booking.com and photography information actions.
- All nine gallery photos, keyboard wrapping, next/previous buttons, swipe, backdrop closure and focus restoration.
- No form network requests, POST actions, third-party resource requests, cookies or browser storage.
- Local image and font loading under a GitHub Pages style repository subpath and when opening `index.html` directly.
- No-JavaScript navigation and direct room/gallery image fallback.
- Requested metadata, favicon, one h1, explicit demo labels and structured data limited to a fictional creative website concept.

## Limits

Mobile layouts were emulated in Chromium; a physical iOS/Android device and Safari/Firefox were not independently tested. GitHub Pages itself was not deployed in this task. Repository-subpath compatibility and ZIP paths were verified locally. There is no live booking, email or WhatsApp integration to test.
