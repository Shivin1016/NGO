// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", function () {
  if (!mainNav) return;

  mainNav.classList.toggle("active");
});

// slide show
let slideIdx = 1;

showSlide(slideIdx);

function prevSlide(n){
    showSlide(slideIdx += n)
}

function currThumbNail(n){
    showSlide(slideIdx = n)
}
 
function showSlide(n){
    let i;
    const slide = document.getElementsByClassName("slide");
    const thumb = document.getElementsByClassName("currImg");

    // console.log(slide);
    // console.log(thumb);

    if(n > slide.length) slideIdx = 1;
    if(n < 1) slideIdx = slide.length;

    for(i = 0 ; i < slide.length ; i++){
        slide[i].style.display = 'none';
    }
    for(i = 0 ; i < thumb.length ; i++){
        thumb[i].className = thumb[i].className.replace(" active" , "");
    }
    slide[slideIdx - 1].style.display = 'block';
    thumb[slideIdx - 1].className += " active";
}
 


