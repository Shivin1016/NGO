// var tl = gsap.timeline(); // everything execute in sync
// // repeat:-1 => for looping and yoyo: => for alternative
// tl.from(".site-logo" ,{
//     y:-20,
//     opacity:0,
//     duration:1,
//     delay:0.5,
// })
// gsap.from("#about h2",{
//     x:500,
//     scale:1.03,
//     duration:2,
//     textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
//     scrollTrigger:{
//         trigger:"#about h2",
//         scroller:'body',
//         start:'top 85%',
//     }
// })
// gsap.from("#achievement h2",{
//     x:-500,
//     scale:1.03,
//     duration:2,
//     textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
//     scrollTrigger:{
//         trigger:"#achievement h2",
//         scroller:'body',
//         start:'top 85%',
//     }
// })
// gsap.from("#programs h2",{
//     x:500,
//     scale:1.03,
//     duration:2,
//     textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
//     scrollTrigger:{
//         trigger:"#programs h2",
//         scroller:'body',
//         start:'top 85%',
//     }
// })
// gsap.from("#team h2",{
//     x:-500,
//     scale:1.03,
//     duration:2,
//     textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
//     scrollTrigger:{
//         trigger:"#team h2",
//         scroller:'body',
//         start:'top 85%',
//     }
// })
// gsap.from("#contact h2",{
//     x:500,
//     scale:1.03,
//     duration:2,
//     textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
//     scrollTrigger:{
//         trigger:"#contact h2",
//         scroller:'body',
//         start:'top 85%',
//     }
// })

// // scroll trigger
// gsap.from("#about" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:"#about",
//         scroller:"body",
//         start:'top 85%',
//         end:"top 45%",
//     }
// })
// gsap.from("#achievement" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:"#achievement",
//         scroller:"body",
//         start:'top 85%',
//         end:"top 45%",
//     }
// })
// gsap.from(".achieve-box" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:".achieve-box",
//         scroller:"body",
//         start:'top 85%',
//         end:"top 45%",
//     }
// })
// gsap.from("#programs" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:"#programs",
//         scroller:"body",
//         start:'top 85%',
//     }
// })
// gsap.from("#team" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:"#team",
//         scroller:"body",
//         start:'top 85%',
//     }
// })
// gsap.from("#contact" ,{
//     opacity:0,
//     y:100,
//     duration:2,
//     scrollTrigger:{
//         trigger:"#contact",
//         scroller:"body",
//         start:'top 85%',
//     }
// })

gsap.registerPlugin(ScrollTrigger);

// refresh after load (important for mobile viewport)
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// Responsive configs
let mm = gsap.matchMedia();

// DESKTOP
mm.add("(min-width: 768px)", () => {
  // headings
  let headings = [
    { sel: "#about h2", x: 500 },
    { sel: "#achievement h2", x: -500 },
    { sel: "#programs h2", x: 500 },
    { sel: "#team h2", x: -500 },
    { sel: "#contact h2", x: 500 },
  ];

  headings.forEach((item) => {
    gsap.from(item.sel, {
      x: item.x,
      opacity: 0,
      duration: 1.8,
      scrollTrigger: {
        trigger: item.sel,
        start: "top 80%",
      },
    });
  });

  // sections
  gsap.utils
    .toArray([
      "#about",
      "#achievement",
      ".achieve-box",
      "#programs",
      "#team",
      "#contact",
    ])
    .forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1.8,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });
    });
});

// MOBILE
mm.add("(max-width: 767px)", () => {
  // smaller slide-in and easier triggers
  gsap.utils
    .toArray([
      "#about h2",
      "#achievement h2",
      "#programs h2",
      "#team h2",
      "#contact h2",
    ])
    .forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      });
    });

  // basic fade-in for sections
  gsap.utils
    .toArray([
      "#about",
      "#achievement",
      ".achieve-box",
      "#programs",
      "#team",
      "#contact",
    ])
    .forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
        },
      });
    });
});
