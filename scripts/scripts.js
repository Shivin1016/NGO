// scripts.js - mobile menu, simple reveal, form validation, footer year

document.addEventListener("DOMContentLoaded", function () {
  // footer year
  const year = document.getElementById("year");
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
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", function () {
    if (!mainNav) return;

    mainNav.classList.toggle("active");
  });
  // Close menu when clicking a link
  document.querySelectorAll(".navItem").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mainNav").classList.remove("active");
    });
  });

  // basic form validation
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      const name = document.getElementById("vname").value.trim();
      const phone = document.getElementById("vphone").value.trim();
      const email = document.getElementById("vemail").value.trim();
      const msg = document.getElementById("vmsg").value.trim();

      if (!name || !phone || !email || !msg) {
        status.style.color = "crimson";
        status.textContent = "Please Fill the Form.";
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.style.color = "crimson";
        status.textContent = "Please Fill the Correct Email Address.";
        return;
      }
      // Demo success message (replace with API integration)
      status.style.color = "green";
      status.textContent = "Thank you! We will contact you soon.";
      form.reset();
    });
  }

  // smooth scroll for internal links
  // document.querySelectorAll('a[href^="#"]').forEach((a) => {
  //   a.addEventListener("click", function (e) {
  //     const target = document.querySelector(this.getAttribute("href"));
  //     if (target) {
  //       e.preventDefault();
  //       target.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }
  //   });
  // });
});

// back to top btn(not working properly)
const backToTopBtn = document.getElementById("backToTopBtn");
// For scrolling inside a div, not window
const myDiv = document.getElementById("bodyTab");

bodyTab.addEventListener("scroll", () => {
  const scrollPosition = bodyTab.scrollTop; // Current scroll position  

  // Show button when scrolled 100px or 20% down 
  if (scrollPosition > 200) { 
    backToTopBtn.classList.add("showBtn");
  } else {
    backToTopBtn.classList.remove("showBtn");
  }
});
backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  bodyTab.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// slide-show for hero-right-card
const slides = document.querySelectorAll(".slide");
const container = document.getElementById("slideshow");

let index = 0;
let interval;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("show");
    if (idx === i) slide.classList.add("show");
  });
}

function startAutoPlay() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 2500);
}

function stopAutoPlay() {
  clearInterval(interval);
}

/* Start autoplay */
startAutoPlay();

/* Pause on hover */
container.addEventListener("mouseenter", stopAutoPlay);
container.addEventListener("mouseleave", startAutoPlay);

/* Initial slide */
showSlide(index);
