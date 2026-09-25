/* Togedab site behaviour
   1. Mobile navigation
   2. Footer year
   3. Enquiry form: validation, submit, status messages
   -------------------------------------------------------------- */

(function () {
  'use strict';

  /* ---------- 1. Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close the menu after following a link on small screens
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Escape closes it
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- 2. Footer year ---------- */
  var yearEls = document.querySelectorAll('[data-year]');
  for (var i = 0; i < yearEls.length; i++) {
    yearEls[i].textContent = String(new Date().getFullYear());
  }

  /* ---------- 3. Enquiry form ---------- */
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  // Web3Forms endpoint and access key (https://web3forms.com)
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var ACCESS_KEY = '';

  function show(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-err');
  }

  function isValidEmail(value) {
    return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var email = form.email.value.trim();
    var service = form.service.value;

    if (!name) { show('Enter your name so we know who is writing.', false); form.name.focus(); return; }
    if (!phone) { show('Enter a phone number so we can call you back.', false); form.phone.focus(); return; }
    if (!isValidEmail(email)) { show('That email address does not look right. Check it and try again.', false); form.email.focus(); return; }
    if (!service) { show('Choose the service you need.', false); form.service.focus(); return; }

    var button = form.querySelector('button[type="submit"]');
    var original = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    show('Sending your enquiry…', true);

    // Without a key configured, fall back to the visitor's email client
    // so the form still works on day one.
    if (!ACCESS_KEY) {
      var body =
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + (email || 'Not given') + '\n' +
        'Service: ' + service + '\n\n' +
        form.message.value.trim();
      window.location.href =
        'mailto:togedabtea@gmail.com' +
        '?subject=' + encodeURIComponent('Website enquiry: ' + service) +
        '&body=' + encodeURIComponent(body);
      button.disabled = false;
      button.textContent = original;
      show('Opening your email app to send the enquiry.', true);
      return;
    }

    var payload = {
      access_key: ACCESS_KEY,
      subject: 'Website enquiry: ' + service,
      from_name: 'Togedab website',
      name: name,
      phone: phone,
      email: email,
      service: service,
      message: form.message.value.trim()
    };

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.success) {
          form.reset();
          show('Thank you, your enquiry has been sent. We will be in touch shortly.', true);
        } else {
          show('That did not send. Please call +234 808 866 6565 or message us on WhatsApp.', false);
        }
      })
      .catch(function () {
        show('That did not send. Please call +234 808 866 6565 or message us on WhatsApp.', false);
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = original;
      });
  });
})();
