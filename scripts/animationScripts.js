var tl = gsap.timeline(); // everything execute in sync
// repeat:-1 => for looping and yoyo: => for alternative
tl.from(".site-logo" ,{
    y:-20,
    opacity:0,
    duration:1,
    delay:0.5,
}) 
gsap.from("#about h2",{  
    x:500,
    scale:1.03,
    duration:2, 
    textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
    scrollTrigger:{
        trigger:"#about h2",
        scroller:'body',
        start:'top 85%', 
    } 
})
gsap.from("#programs h2",{  
    x:-500,
    scale:1.03,
    duration:2, 
    textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
    scrollTrigger:{
        trigger:"#programs h2",
        scroller:'body',
        start:'top 85%', 
    } 
})
gsap.from("#team h2",{  
    x:500,
    scale:1.03,
    duration:2, 
    textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
    scrollTrigger:{
        trigger:"#team h2",
        scroller:'body',
        start:'top 85%', 
    } 
})
gsap.from("#contact h2",{  
    x:-500,
    scale:1.03,
    duration:2, 
    textShadow:"0 2px 14px hsla(0, 95%, 15%, 0.45)",
    scrollTrigger:{
        trigger:"#contact h2",
        scroller:'body',
        start:'top 85%', 
    } 
})

// scroll trigger
gsap.from("#about" ,{
    opacity:0,
    y:100,
    duration:2, 
    scrollTrigger:{
        trigger:"#about",
        scroller:"body", 
        start:'top 85%', 
        end:"top 45%",
        scrub:2,
    }
}) 
gsap.from("#programs" ,{
    opacity:0,
    y:100,
    duration:2, 
    scrollTrigger:{
        trigger:"#programs",
        scroller:"body", 
        start:'top 85%', 
    }
})
gsap.from("#team" ,{
    opacity:0,
    y:100,
    duration:2, 
    scrollTrigger:{
        trigger:"#team",
        scroller:"body", 
        start:'top 85%', 
    }
})
gsap.from("#contact" ,{
    opacity:0,
    y:100,
    duration:2, 
    scrollTrigger:{
        trigger:"#contact",
        scroller:"body", 
        start:'top 85%', 
    }
})
