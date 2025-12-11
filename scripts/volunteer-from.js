// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", function () {
  if (!mainNav) return;

  mainNav.classList.toggle("active");
});