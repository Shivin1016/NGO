// scripts.js - mobile menu, simple reveal, form validation, footer year
document.addEventListener('DOMContentLoaded', function () {
  // footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // mobile nav toggle
  // const navToggle = document.getElementById('navToggle');
 // const mainNav = document.querySelector('.nav');
 // if (navToggle && mainNav) {
 //   navToggle.addEventListener('click', function () {
   //   if (mainNav.style.display === 'flex') {
     //   mainNav.style.display = '';
      //} else {
     //   mainNav.style.display = 'flex';
       // mainNav.style.flexDirection = 'column';
        //mainNav.style.gap = '12px';
 //       mainNav.style.position = 'absolute';
   //     mainNav.style.right = '16px';
     //   mainNav.style.top = '70px';
       // mainNav.style.background = 'rgba(255,255,255,0.98)';
        //mainNav.style.padding = '10px';
  //      mainNav.style.borderRadius = '8px';
   //     mainNav.style.boxShadow = '0 12px 30px rgba(10,20,10,0.08)';
   //   }
   // });
  //}
  // mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.nav');

navToggle.addEventListener('click', function () {
  if (!mainNav) return;

  // toggle class
  mainNav.classList.toggle('open');

  if (mainNav.classList.contains('open')) {
    mainNav.style.display = 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.gap = '12px';
    mainNav.style.position = 'absolute';

    // header ke neeche exact placement
    const headerHeight = document
      .querySelector('.site-header')
      .getBoundingClientRect().height;

    mainNav.style.top = headerHeight + 10 + 'px';
    mainNav.style.right = '16px';

    mainNav.style.background = 'rgba(255,255,255,0.98)';
    mainNav.style.padding = '12px';
    mainNav.style.borderRadius = '10px';
    mainNav.style.boxShadow =
      '0 12px 28px rgba(0,0,0,0.12)';
    mainNav.style.zIndex = '999';
  } else {
    // reset on close
    mainNav.style.display = '';
    mainNav.style.position = '';
    mainNav.style.background = '';
    mainNav.style.padding = '';
    mainNav.style.borderRadius = '';
    mainNav.style.boxShadow = '';
    mainNav.style.top = '';
    mainNav.style.right = '';
  }
});


  // reveal animations for elements with class .reveal
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => obs.observe(el));

  // basic form validation
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      const name = document.getElementById('vname').value.trim();
      const phone = document.getElementById('vphone').value.trim();
      const email = document.getElementById('vemail').value.trim();
      const msg = document.getElementById('vmsg').value.trim();

      if (!name || !phone || !email || !msg) {
        status.style.color = 'crimson';
        status.textContent = 'Please Fill the Form.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.style.color = 'crimson';
        status.textContent = 'Please Fill the Correct Email Address.';
        return;
      }
      // Demo success message (replace with API integration)
      status.style.color = 'green';
      status.textContent = 'Thank you! We will contact you soon.';
      form.reset();
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

   
});


