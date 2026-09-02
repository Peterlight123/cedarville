# Changelog — Cedarville Schools Website Upgrade

## Bugs Fixed

1. **Contact form never actually sent messages.** JS called `preventDefault()`
   unconditionally and just showed a fake success message, even though a real
   Formspree endpoint was configured. Also, none of the form fields had `name`
   attributes, which Formspree requires to capture data. Both fixed: the form
   now submits via `fetch()` to Formspree and shows a real success/error state.
2. **Three different phone/WhatsApp numbers** were scattered across the site
   (`813 745 1764`, `816 238 6265`, and a stale one in docs). Standardized on
   one number, now sourced from a single `data/site.json` file everywhere.
3. **Broken HTML in `gallery.html`**: a mismatched closing `</div>` cut the
   image grid short, orphaning one image and breaking the layout for anything
   after it. Rebuilt as a clean, CMS-driven grid.
4. **Broken HTML in `index.html`**: the blog preview section had a stray
   duplicate/nested `.row`, leaving invalid, unbalanced markup. Rebuilt.
5. **Broken HTML in `academics.html`**: several `.col-sm-6` columns in the
   Primary program section sat outside their parent `.row`, breaking the grid
   layout. Fixed by wrapping them correctly.
6. **Broken/missing content in `admissions.html`**: the entire tuition/fees
   column was commented out, leaving unbalanced markup and a missing section.
   Replaced with a working two-column layout (requirements + fee info).
7. **Empty fee placeholders** in `academics.html` (`<div class="fw-bold fs-5">`
   with no content) — replaced with a "Fees on request" badge everywhere,
   consistent with how the chatbot already answers fee questions.
8. **Missing images**: `class2.jpg`, `class_with_children2–5.jpg`, `sch_bed.jpg`
   and `sch_bed2.jpg` existed on disk but were never shown anywhere. Added to
   the gallery. `welcome-image.jpeg` was also unused and is now in the gallery
   and used as a blog post image.
9. **Unused staff photo**: `ojoro_olaide.jpeg` existed but wasn't used. Added
   a 4th team member card to the About page.
10. **Duplicate unused images** (`female-student.jpg`, `female2.jpg`,
    `primary-female2.jpeg`) removed — same-named files whose `.jpeg`/`.png`
    counterparts were already in use (~6.6MB saved).
11. **Stray third-party script** (`ninja-daytona-script.js`, a leftover from a
    website-builder tool) removed from `blog.html`'s `<head>`.
12. **Duplicated/dead chatbot data**: `chatbot.js` had its knowledge hardcoded
    inline while an separate, unused, less complete `chatbot-responses.json`
    sat dead in `/data`. Unified into one JSON file that `chatbot.js` now
    loads at runtime.
13. **Inconsistent founding-year copy** ("since 2022" in places, "2014" and "a
    decade" elsewhere). Standardized on 2014 as the founding year (with the
    2022 new-board relaunch still described in the About page story).
14. **Unnecessary Node dependencies**: `package.json` listed `bcryptjs`,
    `pg`, `connect-pg-simple` and `express-session`, none of which
    `server.js` (a plain static file server) actually uses. Trimmed to just
    `express`.
15. Placeholder `alt="TODO: Describe this blog post image"` and vague/generic
    gallery alt text replaced with real, descriptive alt text throughout.

## UI/UX & Animation

- New splash screen (logo, name, tagline, spinner) shown once per browser
  session, not on every page.
- Scroll-reveal animations on cards/sections via `IntersectionObserver`.
- Button ripple effect on all primary buttons.
- Chatbot typing indicator.
- Animated counters, extended to the stats-bar (previously only the hero
  numbers animated).
- All new animations respect `prefers-reduced-motion`.

## New Sections & Content

- **Upcoming Events** section added to the homepage (auto-hides past events).
- **9 new blog posts**, dated across August 2026, covering all requested
  topics (back-to-school tips, study habits, reading, new-term prep, healthy
  lunches, digital safety, learning at home, a school-news recap) plus an
  official **new branch announcement** post.
- 4th team member added to the About page leadership grid.
- 2 new facility cards (Sick Bay & Nurse, Meal Service) on the Academics page.

## CMS (see CMS-GUIDE.md for full details)

Converted the site to a lightweight, static-file CMS. `/data/*.json` now
drives: site-wide contact info & socials (site.json), testimonials, upcoming
events, the full gallery, all blog posts, the chatbot's knowledge base, and
FAQ content. `js/cms.js` renders all of it client-side. No backend required.

## Chatbot

Rewritten to load its knowledge base from JSON instead of hardcoded data.
Expanded to cover: school history, uniform policy, academic sessions/terms,
gallery, events, blog, general FAQ, and the new branch, on top of the
existing hours/fees/admissions/programs/facilities/teachers/location/contact
topics. Responses now vary (randomized among a few phrasings) to avoid
repetitiveness, and there's a typing-indicator delay for a more natural feel.

## SEO

- Canonical URLs, Open Graph and Twitter Card tags on every page.
- `PreschoolPrimarySchool` JSON-LD structured data.
- `robots.txt` added; `sitemap.xml` updated with `lastmod`/`changefreq`/`priority`.
- Descriptive, unique `alt` text on every image.
- `preconnect` hints for the CDN/analytics domains used.

## Accessibility

- Skip-to-content link on every page.
- `aria-hidden="true"` added to ~200 decorative icon elements site-wide.
- Visible `:focus-visible` outline styles for keyboard navigation.
- `aria-live="polite"` on the chatbot message log and form feedback.
- Screen-reader label added to the chatbot text input.

## Performance

- `loading="lazy"` + `decoding="async"` on all below-the-fold images (the
  hero image is `fetchpriority="high"` instead, since it's the LCP element).
- Scripts marked `defer`.
- Removed ~6.6MB of duplicate unused images.
- Removed the unnecessary third-party script tag.

## Cleanup

- Removed all dead/commented-out HTML blocks.
- Replaced ~15 instances of a repeated inline icon-badge style with a
  `.icon-circle` / `.icon-circle-lg` / `.step-circle` utility class.
- Removed all `TODO:` scaffold comments (each one has been resolved).
- Rewrote `TODO.md` → replaced with `CMS-GUIDE.md` (the old file described a
  pre-launch checklist that was entirely stale and, in places, actively wrong
  post-CMS, e.g. it told editors to change chatbot answers directly inside
  `chatbot.js`, which no longer holds any content).
