# Cedarville Schools — CMS Guide

This site now has a **lightweight, static-file CMS**. You don't need to touch any HTML
to update most content, everyday changes (fees, contact info, blog posts, gallery
photos, events, testimonials, chatbot answers) are made by editing plain JSON files
in the `/data` folder. No backend, no database, no build step required.

When you open any file in `/data`, the first line is `"_comment"` explaining what
that file controls. Just edit the JSON, save, and refresh the page.

---

## How it works

1. Every page loads `js/cms.js`.
2. On page load, `cms.js` fetches the relevant `/data/*.json` files.
3. It finds elements in the HTML tagged with `data-cms`, `data-cms-href`, or a
   container `id` (like `id="blogGrid"`), and fills them in with the JSON content.
4. If a fetch fails (e.g. you open the HTML file directly from your computer
   instead of through a real web server), the page still works, it just won't
   have the dynamic content. **Always test through `npm start` (or any local
   server), not by double-clicking the HTML file.**

---

## What's in `/data`

| File | Controls |
|---|---|
| `site.json` | Phone, WhatsApp, email, address, hours, map link, social media URLs, founding year, and the homepage/stats-bar numbers. **This is the most important file** — editing it updates the phone number, email, etc. everywhere on the site at once (nav, footer, hero, contact page). |
| `testimonials.json` | Parent testimonials shown on the homepage. Add/remove/edit freely. |
| `events.json` | "Upcoming Events" on the homepage. Only the next 3 events with a date today-or-later are shown, so just keep adding future events at the bottom, past ones are hidden automatically. |
| `gallery.json` | Every photo in the Gallery page: file path, category (`classrooms`, `events`, `playground`, `activities`, `facilities`), and alt text. Add a new photo by adding one object to the list. |
| `blog-posts.json` | Every blog post: title, excerpt, full content, author, date, category, image. Add a new post by copying an existing object and editing it. |
| `faq.json` | The Q&A pairs also used by the admissions FAQ accordion (in `admissions.html`) and referenced by the chatbot's FAQ topic. If you change an answer here, update the matching answer in `admissions.html` too (see note below). |
| `chatbot-responses.json` | Every topic the chatbot can answer, and the keywords that trigger it. |

### Adding a blog post
Open `data/blog-posts.json`, copy one object inside `"posts"`, paste it as a new
entry, and edit: `id` (unique, no spaces), `title`, `excerpt`, `content` (use `\n\n`
between paragraphs), `author`, `date` (`YYYY-MM-DD`), `category` (`parenting`,
`education`, `events`, or `news`), `readTime`, `image` (a path under `/images` or
a full `https://` URL), and `tags`. Save, it appears on both the homepage preview
(3 most recent posts) and the full Blog page immediately.

### Adding a gallery photo
1. Drop the image file into `/images/school gallery/` (or anywhere under `/images`).
2. Open `data/gallery.json` and add one object to `"photos"`: `src` (the path),
   `category`, and `alt` (a real description, for accessibility and SEO).

### Adding an event
Open `data/events.json`, add an object with `title`, `date` (`YYYY-MM-DD`), `time`,
`description`, and `category`. The homepage always shows the next 3 upcoming events
sorted by date.

### Editing the chatbot
Open `data/chatbot-responses.json`. There are two matching objects:
- `"responses"` — the answer text for a topic. Can be a single string, or an array
  of a few alternate phrasings (the bot picks one at random so it doesn't repeat
  itself).
- `"keywords"` — the words/phrases that trigger that topic.

To add a new topic, add a key to both objects with the same name, e.g.:
```json
"responses": { "transport": "We do not currently offer a school bus service." }
"keywords":  { "transport": ["bus", "transport", "pickup service"] }
```

---

## What's still hand-edited in HTML (and why)

A few things are intentionally **not** JSON-driven, either because search engines
need to see them directly in the page source, or because they're one-off page
copy rather than repeating list data:

- **Page headings, intro paragraphs, mission/vision text** (about.html,
  admissions.html, academics.html) — edit these directly in the HTML file.
- **Admissions FAQ accordion** (admissions.html) — kept as static HTML for
  accessibility/SEO reasons. `data/faq.json` mirrors the same content for the
  chatbot; keep both in sync if you change an answer.
- **Team member cards** (about.html) — add a new team member by duplicating one
  `<div class="card-cedarville ...">` block in the Team section and updating the
  photo, name and title.

---

## Contact form

The contact form on `contact.html` submits to Formspree
(`https://formspree.io/f/xnjraqzj`) via JavaScript (`js/main.js`), so the page
never navigates away, the visitor sees a real success or error message inline.
To point it at a different Formspree form (or your own endpoint), change the
form's `action=` attribute in `contact.html`.

**Important:** previously the form's fields had no `name` attributes, which meant
Formspree received empty submissions even though the page showed "message sent."
This has been fixed, every field now has a matching `name` attribute required
for the submission to actually contain your data.

---

## Splash screen & animations

- The splash screen (`#splash-screen` in each page, styled in `css/style.css`,
  controlled by `js/main.js`) shows once per browser session (via
  `sessionStorage`), not on every single page navigation.
- Scroll-reveal animations are applied via the `.reveal` class + `js/cms.js`'s
  `IntersectionObserver`. To make a new section fade in on scroll, just add
  `class="reveal"` to it.
- All animations respect `prefers-reduced-motion` and disable themselves for
  visitors who have that setting on.

---

## Preparing for the future Django backend

This frontend is already structured to make that migration straightforward:

- All list-style content (blog posts, gallery, events, testimonials, FAQ, chatbot
  knowledge) is in structured JSON, shaped like what a Django REST Framework API
  would return. Swapping `fetch('data/blog-posts.json')` for
  `fetch('/api/blog-posts/')` in `js/cms.js` is close to a drop-in replacement.
- The contact form already posts as `FormData` to an external endpoint; pointing
  it at a Django endpoint instead of Formspree is a one-line change.
- Nothing reads or writes browser storage for content, so there's no client-side
  state to migrate.

### Suggested next steps once the Django backend exists
- Replace the JSON files with real API endpoints (blog posts, gallery, events)
  so non-technical staff can edit content through the Django admin instead of
  editing JSON by hand.
- Add a real admissions/enquiry form endpoint (currently Formspree) so
  submissions land in your own database and can trigger email notifications to
  staff.
- Add authentication for a staff-only "add event / add blog post" screen.
- Consider server-rendering the CMS content (or pre-rendering at deploy time) so
  it's present in the initial HTML for search engines, rather than fetched by
  JavaScript after load.
