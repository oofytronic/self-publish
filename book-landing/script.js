(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  // Header gains a parchment backdrop after scrolling
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Gentle fade-in as sections enter view
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Newsletter: validates, then either submits to a real form action or shows a thank-you.
  var form = document.getElementById('signup');
  var msg = document.getElementById('form-msg');
  form.addEventListener('submit', function (e) {
    var email = form.elements.email;
    if (!email.checkValidity() || !email.value.trim()) {
      e.preventDefault();
      msg.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }
    // Until a provider URL is set as the form action ("#"), keep the page in place.
    if (form.getAttribute('action') === '#') {
      e.preventDefault();
      msg.textContent = 'Thank you. Your first letter will arrive soon.';
      form.reset();
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
