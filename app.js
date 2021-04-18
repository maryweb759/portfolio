
          /*******    bargure menu      ****** */ 
          /*
var navbar_list = document.getElementById("list");
var  toggle_menu = document.getElementById("toggle-menu");
toggle_menu.addEventListener("click", function() {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  } 
});  

function scrollTop() {
let header = document.getElementById("top-content"); 
let ops = window.pageYOffset; 
if(ops > 290) { 
  header.style.padding = "0.3rem 0.6rem";
} else { 
  header.style.padding = "0.6rem ";
}
} **/
/***********    page loader */
window.addEventListener("load", function() {
  const loader = document.querySelector(".page-loader");
  loader.className += "hidden";
});

// burger-menu 
var burgerMenu = document.getElementById("burger-menu"); 
var overly = document.getElementById("list"); 
var navbar_list_A = document.querySelectorAll(".list a"); 
navbar_list_A.forEach(elem => 
elem.addEventListener("click", navbarLinkClick)); 
function navbarLinkClick(event) { 
    smothScroll(event) // call the "smooth" function
   if (overly.classList.contains("overly")) { 
    burgerMenu.click();
   }
};

burgerMenu.addEventListener('click', function() { 
    this.classList.toggle("close"); 
    overly.classList.toggle("overly");
}); 


// Approach 3 
function smothScroll(event) {
event.preventDefault();
const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
const targetPosition = document.querySelector(targetId).offsetTop;
const startPosition = window.pageYOffset;
const distance = targetPosition - startPosition;
const duration = 1000;
let start = null;

window.requestAnimationFrame(step);

function step(timestamp) {
if (!start) start = timestamp;
const progress = timestamp - start;
// window.scrollTo(0, distance*(progress/duration) + startPosition);
window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
if (progress < duration) window.requestAnimationFrame(step);
}
}

// Easing Functions

function easeInOutQuad(t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

/***************** 
window.addEventListener("scroll", scrollTop);
*/
function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling")
}
/***********   
  portfolio filter and popup
**************** */ 
(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
  portfolioItemsContainer = document.querySelector(".portfolio-items"),
  portfolioItems = document.querySelectorAll(".portofolio-item"),
  popup = document.querySelector(".portfolio-popup"),
  prevBtn = popup.querySelector(".pp-prev"),
  nextBtn = popup.querySelector(".pp-next"),
  closeBtn = popup.querySelector(".pp-close"),
  projectDetailsContainer = popup.querySelector(".pp-details"),
  projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;
 /***************      filter portfolio items    ************/ 
 filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item") && 
     !event.target.classList.contains("active")) {
        // desactive existing active 'filter item' 
        filterContainer.querySelector(".active").classList.remove("active");
        // activate new 'filter item'
        event.target.classList.add("active");
        const target = event.target.getAttribute("data-target");
        console.log(target);
        portfolioItems.forEach((item) => {
            if (target === item.getAttribute("data-category") || target === 'all') {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        })
     } 
 })
 
 /********************      show poop up model                ******************/ 
 portfolioItemsContainer.addEventListener("click", (event)=> {
     if (event.target.closest(".portofolio-item-inner")) {
         const portfolioItem = event.target.closest(".portofolio-item-inner").parentElement;
         // get the portfolio item index
         itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
         screenshots = portfolioItems[itemIndex].querySelector(".portofolio-item-img img")
         .getAttribute("data-screenshots");
         // convert screenshots into array 
         screenshots = screenshots.split(",") 
         if (screenshots.length === 1) {
             prevBtn.style.display = "none";
             nextBtn.style.display = "none";
         } else {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
         }
        slideIndex = 0;
        popupToggle();
        popupSlideShow(); 
        popupDetails();
     }
 }) 
 closeBtn.addEventListener("click", ()=> {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
        popupDetailsToggle()
    }
 }) 

 function popupToggle() {
   popup.classList.toggle("open");
   bodyScrollingToggle()
 } 
 
 function popupSlideShow() {
  const imgSrc = screenshots[slideIndex];
  const popupImg = popup.querySelector(".pp-img"); 
  /* activate an loader till the image popup loaded */ 
  popup.querySelector(".pp-preloader").classList.add("active")
  popupImg.src=imgSrc; 
  popupImg.onload = () => {
      // desactive loader after the popupImg loaded 
      popup.querySelector(".pp-preloader").classList.remove("active")

  } 
  popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) +  " of " + screenshots.length ;
 } 
 // next slide 
 nextBtn.addEventListener("click", () => {
     if (slideIndex === screenshots.length-1) {
         slideIndex = 0 
     } else {
         slideIndex++;
     } 
     popupSlideShow(); 
    });
 // prev botton 
 prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
        slideIndex = screenshots.length-1;
    } else {
        slideIndex--;
    } 
    popupSlideShow(); 
   }); 

   function popupDetails() {
      // if project details doesnt exist 
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
        projectDetailsBtn.style.display = "none"; 
        return ; // end function execution
    }
    projectDetailsBtn.style.display = "block";
       // get the project details 
       const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
       // set the project details
       popup.querySelector(".pp-project-details").innerHTML = details; 
        // get the project details title
       const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
         // set the project details title
       popup.querySelector(".pp-title h2").innerHTML = title; 
               // get the project details category
       const category = portfolioItems[itemIndex].getAttribute("data-category");
               // set the project details category
      popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
   }
   projectDetailsBtn.addEventListener("click", (event) => {
       popupDetailsToggle()
   })
   function popupDetailsToggle() { 
      if (projectDetailsContainer.classList.contains("active")) { 
        projectDetailsBtn.querySelector("strong").classList.add("minus");
         projectDetailsBtn.querySelector("span").classList.remove("plus");
         projectDetailsContainer.classList.remove("active");
         projectDetailsContainer.style.maxHeight = 0 + "px";
      } else {
          projectDetailsBtn.querySelector("span").classList.add("plus");
          projectDetailsBtn.querySelector("strong").classList.remove("minus");
          projectDetailsContainer.classList.add("active");
          projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px"; 
          popup.scrollTo(0, projectDetailsContainer.offsetTop)
      }
      console.log("hi");
   }
})();

/*         
scollto top button
****/ 
const btnScrollToTop = document.querySelector("#scrollBtn");
btnScrollToTop.addEventListener("click", function() {
  window.scrollTo({
    top:0,
    left:0,
    behavior: "smooth"
  })
});
/********
 * wow js
 */ 
 

 