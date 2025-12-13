// Mark JS as active (prevents blank content if JS fails)
document.documentElement.classList.add("js");

// Intersection Observer
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  }
);

// Sections
document
  .querySelectorAll(
    "#about, #achievement, .achieve-box, #programs, #team, #contact"
  )
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

// Headings
document
  .querySelectorAll("#about h2, #programs h2, #contact h2")
  .forEach((h) => {
    h.classList.add("reveal-right");
    observer.observe(h);
  });

document.querySelectorAll("#achievement h2, #team h2").forEach((h) => {
  h.classList.add("reveal-left");
  observer.observe(h);
});
