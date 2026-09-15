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

const sampleListings = [
  {
    type: 'Example rental',
    status: 'Coastal living',
    location: 'Nyali · Mombasa',
    title: 'Two-bedroom coastal apartment',
    description: 'A bright, easy-going home for someone who wants the city close and the coast nearby.',
    features: ['2 bedrooms', '2 bathrooms', 'Furnished'],
    price: 'KSh 45,000 / month',
    theme: 'sea',
  },
  {
    type: 'Example sale',
    status: 'Family home',
    location: 'Bamburi · Mombasa',
    title: 'Three-bedroom family home',
    description: 'A comfortable example of the kind of space that can support a growing household and daily life.',
    features: ['3 bedrooms', 'Private garden', 'Gated setting'],
    price: 'KSh 8.5M guide',
    theme: 'sunset',
  },
  {
    type: 'Example opportunity',
    status: 'Room to grow',
    location: 'Mariakani · Coast region',
    title: 'Quarter-acre development plot',
    description: 'An example land opportunity for a buyer thinking about a future home, investment or small project.',
    features: ['¼ acre', 'Road access', 'Growing area'],
    price: 'KSh 2.4M guide',
    theme: 'land',
  },
];

const listingGrid = document.querySelector('[data-listings]');
if (listingGrid) {
  listingGrid.innerHTML = sampleListings.map((listing, index) => `
    <article class="listing-card reveal ${index ? 'reveal-delay' : ''}">
      <div class="listing-visual listing-visual-${listing.theme}" aria-hidden="true">
        <span class="listing-orbit"></span>
        <span class="listing-sun"></span>
        <span class="listing-land"></span>
        <span class="listing-home"></span>
      </div>
      <div class="listing-content">
        <div class="listing-meta"><span>${listing.type}</span><strong>${listing.status}</strong></div>
        <p class="listing-location">${listing.location}</p>
        <h3>${listing.title}</h3>
        <p class="listing-description">${listing.description}</p>
        <ul class="listing-features">${listing.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
        <div class="listing-footer">
          <strong>${listing.price}</strong>
          <a class="listing-link" href="#contact" data-property="${listing.title}">Ask about this <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  `).join('');
}

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

document.querySelectorAll('[data-property]').forEach((link) => {
  link.addEventListener('click', () => {
    const message = document.querySelector('#message');
    const property = link.getAttribute('data-property');
    if (message && property && !message.value) {
      message.value = `I would like to know more about the sample listing: ${property}.`;
    }
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
