/* ============================================================
   Cedarville Schools - Global JavaScript
   (Gallery/blog rendering + filtering lives in js/cms.js since
   that content is now CMS-driven from /data/*.json)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ----- Splash Screen -----
  const splash = document.getElementById('splash-screen');
  if (splash) {
    const alreadyShown = sessionStorage.getItem('cedarville_splash_shown');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyShown) {
      splash.remove();
    } else {
      const hide = () => {
        splash.classList.add('splash-hide');
        sessionStorage.setItem('cedarville_splash_shown', '1');
        setTimeout(() => splash.remove(), prefersReduced ? 0 : 500);
      };
      if (prefersReduced) {
        hide();
      } else {
        // Hide once the page has fully loaded, with a minimum display time so it doesn't just flash,
        // and a hard maximum timeout so a slow connection never traps the user behind the splash.
        const minTimer = new Promise((resolve) => setTimeout(resolve, 900));
        const pageLoaded = document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
        Promise.race([
          Promise.all([minTimer, pageLoaded]),
          new Promise((resolve) => setTimeout(resolve, 3000))
        ]).then(hide);
      }
    }
  }

  // ----- Button ripple effect -----
  document.querySelectorAll('.btn-blue, .btn-outline-blue, .btn-white, .btn-enroll').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ----- Back to Top Button -----
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----- Contact Form: client-side validation + AJAX submit to Formspree -----
  // NOTE: previously this form called e.preventDefault() unconditionally and only ever
  // displayed a fake success message — messages were never actually sent anywhere, even
  // though a real Formspree endpoint was configured in the form's action attribute.
  // This now genuinely submits to Formspree via fetch and reports the real outcome.
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const msg = this.querySelector('#message').value.trim();
      const feedback = document.getElementById('form-feedback');
      const submitBtn = this.querySelector('button[type="submit"]');

      if (!name || !email || !msg) {
        if (feedback) { feedback.textContent = 'Please fill in all required fields.'; feedback.className = 'text-danger mt-2'; }
        return;
      }

      if (feedback) { feedback.textContent = 'Sending your message...'; feedback.className = 'text-muted mt-2'; }
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch(this.action, {
          method: 'POST',
          body: new FormData(this),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          if (feedback) { feedback.textContent = 'Thank you! Your message has been sent. We will be in touch shortly.'; feedback.className = 'text-success mt-2'; }
          this.reset();
        } else {
          throw new Error('Form service returned an error');
        }
      } catch (err) {
        if (feedback) {
          feedback.textContent = 'Something went wrong sending your message. Please try again, or reach us directly on WhatsApp / phone.';
          feedback.className = 'text-danger mt-2';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

});
