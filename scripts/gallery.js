// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", function () {
  if (!mainNav) return;

  mainNav.classList.toggle("active");
}); 

let slideIdx = 1;

showSlide(slideIdx);

function prevSlide(n) {
  showSlide((slideIdx += n));
}

function currThumbNail(n) {
  showSlide((slideIdx = n));
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const thumb = document.getElementsByClassName("currImg");

  if (n > slides.length) slideIdx = 1;
  if (n < 1) slideIdx = slides.length;

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove active class from thumbnails
  for (i = 0; i < thumb.length; i++) {
    thumb[i].classList.remove("active");
  }

  // Show active slide
  slides[slideIdx - 1].style.display = "block";

  // Highlight active thumbnail
  thumb[slideIdx - 1].classList.add("active");

  // 🎬 PLAY / PAUSE VIDEO LOGIC HERE
  for (let i = 0; i < slides.length; i++) {
    const video = slides[i].querySelector("video");

    if (video) {
      if (i === slideIdx - 1) {
        video.play(); // play active slide video
      } else {
        video.pause(); // pause inactive videos
        video.currentTime = 0;
      }
    }
  }
}
