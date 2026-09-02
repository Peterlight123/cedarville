# Cedarville Private Schools Website

## Overview
Fully static school website for Cedarville Private Schools in Aguda, Surulere, Lagos (founded 2014). Built with Bootstrap 5, vanilla JavaScript, and a lightweight JSON-based CMS. No database required. See **CMS-GUIDE.md** for how to edit content.

## Pages
- index.html - Homepage (hero, programs, testimonials, upcoming events, blog preview)
- about.html - About the school, mission/vision, leadership team
- admissions.html - Enrollment process, requirements, fees, FAQ
- academics.html - Programs (Creche, Nursery, Primary) & facilities
- gallery.html - Photo gallery with lightbox and category filter (CMS-driven)
- blog.html - Blog posts with category filter and modal reader (CMS-driven)
- contact.html - Contact form (Formspree), map, socials

## Technology Stack
- **Frontend**: HTML5, Bootstrap 5.3.3, CSS3, Vanilla JavaScript (no build step, no frameworks)
- **Backend**: Node.js + Express.js (serves static files only)
- **CMS**: Static JSON files in /data, rendered client-side by js/cms.js
- **Chatbot**: Rule-based keyword matching, knowledge loaded from data/chatbot-responses.json (works offline)
- **Forms**: Formspree (https://formspree.io/f/xnjraqzj)
- **CDN**: Bootstrap, Font Awesome 6.5.1

## Key Files
- css/style.css - All styles (blue and white theme, CSS variables, animations)
- js/cms.js - Loads /data/*.json and renders dynamic content (nav/footer info, testimonials, events, blog, gallery, counters)
- js/chatbot.js - Rule-based chatbot, loads its knowledge base from data/chatbot-responses.json
- js/main.js - Splash screen, back-to-top, button ripple effect, contact form submission
- CMS-GUIDE.md - How to edit every piece of content on the site

## Running the Site
```bash
npm start
```
Site runs on port 5000.

## School Info (single source of truth: data/site.json)
- Name: Cedarville Private Schools
- Location: 12 Ogunda Street, off Nuru Oniwo, Aguda, Surulere, Lagos
- Phone / WhatsApp: +234 813 745 1764
- Email: cedarvilleprivate@gmail.com
- Founded: 2014 (new board/vision from 2022)
- Programs: Creche (6mo-2yrs), Nursery (2-5yrs), Primary (6-11yrs)

## Content Updates
See **CMS-GUIDE.md** for the full list of what lives in /data vs what's hand-edited in HTML, and how to add blog posts, gallery photos, events, testimonials and chatbot answers.
