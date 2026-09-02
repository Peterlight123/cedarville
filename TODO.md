# Cedarville Private Schools - TODO & Update Guide

This file lists everything you need to update to make the website fully yours.
Open each file mentioned and look for the `TODO:` comments inside.

---

## FILES CREATED

| File | Purpose |
|------|---------|
| index.html | Homepage |
| about.html | About the school |
| admissions.html | Enrollment information and fees |
| academics.html | Programs: Creche, Nursery, Kindergarten |
| gallery.html | Photo gallery with lightbox |
| blog.html | Blog posts |
| contact.html | Contact form and school info |
| css/style.css | All styling (colors, layout, components) |
| js/chatbot.js | Rule-based chatbot (no API) |
| js/main.js | Global JS: counters, gallery filter, form |
| TODO.md | This file |

---

## PRIORITY UPDATES (Do These First)

### 1. Logo
- **Where:** All 7 HTML files, in the `<nav>` section
- **What to do:** Replace the `<i class="fas fa-school"></i>` icon with your school logo image
- **Example:**
  ```html
  <!-- Replace this line: -->
  <i class="fas fa-school" style="font-size:1.6rem;"></i>

  <!-- With this: -->
  <img src="images/logo.png" alt="Cedarville Logo" style="width:44px;height:44px;">
  ```
- **Save your logo** as `images/logo.png`

### 2. Favicon
- **Where:** All 7 HTML files, inside `<head>`
- **What to do:** Save your school logo as `images/favicon.png`
- The favicon is already linked: `<link rel="icon" href="images/favicon.png">`

### 3. WhatsApp Number
- **Where:** All 7 HTML files
- **Current number:** +234 803 939 4759
- **Find and replace:** `2348039394759` with your actual number (no spaces, no + sign)

### 4. Phone Number
- **Where:** contact.html, all footers, js/chatbot.js
- **Current:** +234 803 939 4759

### 5. Email Address
- **Where:** contact.html, all footers, js/chatbot.js
- **Current:** info@cedarvilleschools.com

### 6. School Address
- **Where:** contact.html, all footers, js/chatbot.js
- **Current:** Aguda, Surulere, Lagos

---

## IMAGES TO REPLACE

All images currently use free placeholder photos from Unsplash.
Replace them with actual photos of your school.

### How to Replace an Image:
1. Save your photo in the `/images` folder (e.g. `images/classroom.jpg`)
2. Find the `<img>` tag with `images.unsplash.com` in the `src`
3. Replace the src: `src="images/classroom.jpg"`
4. Update the `alt` attribute to describe the photo

### Images to Replace by Page:

**index.html:**
- Hero background photo (school exterior)
- Welcome section photo (children learning)
- 3 blog preview images

**about.html:**
- Our Story section photo (school history image)
- 4 team member photos (save as `images/staff-name.jpg`)

**admissions.html:**
- Admission intro section photo

**academics.html:**
- Creche section photo
- Nursery section photo
- Kindergarten section photo

**gallery.html:**
- All 9 gallery photos (replace with actual school photos)

**blog.html:**
- All 6 blog post images

---

## CONTENT TO UPDATE

### index.html
- Hero tagline and subtitle
- Stats numbers (students, staff count)
- Testimonials (replace with real parent quotes)
- Blog preview posts

### about.html
- Mission statement (currently placeholder)
- Vision statement (currently placeholder)
- School history/story paragraphs
- Team member names and titles

### admissions.html
- Admission requirements list
- Fee amounts (if changed)
- FAQ questions and answers

### academics.html
- Program descriptions (Creche, Nursery, Kindergarten)
- Fee amounts (if changed)
- Facilities list

### gallery.html
- All photos - see "Images to Replace" section above
- Photo categories (add/remove filter buttons as needed)

### blog.html
- All 6 blog post titles, excerpts, and dates
- Blog post images
- Add more posts by duplicating the template block (see instructions in blog.html)

### contact.html
- Phone, email, address
- Google Maps embed (see TODO comment in contact.html)
- Social media links (Facebook, Instagram, Twitter, YouTube)

---

## CHATBOT (js/chatbot.js)

The chatbot uses a simple keyword-matching system. No internet required.

### To Add a New Response:
1. Open `js/chatbot.js`
2. Find the `responses` object
3. Add a new key:
   ```javascript
   myNewTopic: "Your response text here",
   ```
4. Find the `keywords` object and add matching words:
   ```javascript
   myNewTopic: ["keyword1", "keyword2", "keyword3"],
   ```

### To Update Existing Responses:
- All responses are plain text strings inside the `responses` object
- Just edit the text between the quotes

---

## SOCIAL MEDIA LINKS

**Where:** All 7 footers and contact.html

```html
<!-- Replace # with your actual profile URLs -->
<a href="#" aria-label="Facebook">       <!-- TODO: Add your Facebook page URL -->
<a href="#" aria-label="Instagram">      <!-- TODO: Add your Instagram profile URL -->
<a href="#" aria-label="Twitter">        <!-- TODO: Add your Twitter profile URL -->
<a href="#" aria-label="YouTube">        <!-- TODO: Add your YouTube channel URL -->
```

---

## CONTACT FORM (contact.html)

The form currently shows a success message but does NOT actually send emails.

To make it send real emails, use one of these free services:

**Option A: Formspree (Recommended)**
1. Go to https://formspree.io
2. Create a free account
3. Create a new form and get your endpoint URL
4. Update the form tag: `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
5. Remove the `novalidate` attribute and the form's JavaScript submit handler

**Option B: EmailJS**
1. Go to https://www.emailjs.com
2. Follow their setup guide for HTML forms

---

## GOOGLE MAPS (contact.html)

1. Go to https://maps.google.com
2. Search for your school address
3. Click **Share** > **Embed a map**
4. Copy the `<iframe>` code
5. In `contact.html`, find the map placeholder section and replace it with your iframe

---

## COLORS (css/style.css)

The primary colors are defined at the top of `css/style.css`:

```css
:root {
  --primary: #1a56db;        /* Main blue - TODO: Change to your preferred blue */
  --primary-dark: #1245b8;   /* Darker blue for hover effects */
  --primary-light: #e8f0fe;  /* Very light blue for backgrounds */
}
```

To change the color scheme, update these three values.

---

## PROGRAMS.HTML (Old Page)

The old `programs.html` has been replaced by `academics.html`.
All program information (Creche, Nursery, Kindergarten) is now in `academics.html`.

---

## NOTES

- The website is fully static - no database required
- All pages work offline once the Bootstrap/Font Awesome CDN files are cached
- The chatbot works completely offline
- Test all pages on mobile to ensure responsiveness
- Check all links work before going live
