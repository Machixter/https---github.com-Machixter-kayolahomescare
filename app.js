const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const closeMenu = () => {
  siteNav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  siteNav?.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const finderForm = document.querySelector('#finder-form');
const finderNote = document.querySelector('#finder-note');
finderForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(finderForm);
  const need = data.get('need');
  const location = data.get('location');
  finderNote.textContent = `Thanks — we’ll help you explore ${need} in ${location}. Continue below to send an enquiry.`;
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const contactForm = document.querySelector('#contact-form');
const contactNote = document.querySelector('#contact-note');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(contactForm).get('name')?.toString().trim();
  contactNote.textContent = `Thanks${name ? `, ${name}` : ''} — your enquiry is ready to be connected to Kayolla Homes Care.`;
  contactForm.reset();
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
