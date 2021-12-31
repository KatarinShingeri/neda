var slideIndex = 0;
showSlides(slideIndex);
var interval = 0;
var targetxcurrent = 0;
var targetxlast = 0;
var currentxcurrent = 0;
var currentxlast = 0;
var slides;
var lastslide = 0;
moving = false;

function inter() 
{
	var diflast = (targetxlast - currentxlast)/6
	var difcurrent = (targetxcurrent - currentxcurrent)/6                      

	currentxlast += diflast
	currentxcurrent += difcurrent

	slides[slideIndex].style.left = currentxcurrent + "%"
	slides[lastslide].style.left = currentxlast + "%"
	if(Math.abs(difcurrent) < 5){
		moving = false
		var prikol = document.querySelectorAll(".slider-dots_item")
		prikol.forEach(
			(el) => {
				el.classList.remove("active")
				
			}
		)
		prikol[slideIndex].classList.add("active")
	}
	
	
}
debug = setInterval(inter, 30)
function plusSlide() 
{
	if(!moving){
		
		moving = true
		targetxlast = -100
		targetxcurrent = 0

		currentxcurrent = 100
		currentxlast = 0

		lastslide = slideIndex	
		slideIndex = mod(slideIndex+1, slides.length)
		
		slides.forEach(                                                             
			(slide,index) => {                                                      
				slide.style.zIndex = 3                     
			}                                                                    
		) 
		
		slides[slideIndex].style.zIndex = 5
		slides[lastslide].style.zIndex = 5
	}
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function minusSlide() {
	if(!moving){
		moving = true
		targetxlast = 100
		targetxcurrent = 0

		currentxcurrent = -100
		currentxlast = 0

		lastslide = slideIndex	
		slideIndex = mod(slideIndex-1, slides.length)
		
		slides.forEach(                                                             
			(slide,index) => {                                                      
				slide.style.zIndex = 3                     
			}                                                                    
		) 
		
		slides[slideIndex].style.zIndex = 5
		slides[lastslide].style.zIndex = 5
	}
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function setSlide(n) {
	
}

function dotClick(e){
	if(!moving){
		var targetSlide = Number(e.target.dataset.index)
		var direction = Math.sign(targetSlide - slideIndex)
		moving = true
		targetxlast = -100 * direction
		targetxcurrent = 0 

		currentxcurrent = 100 * direction
		currentxlast = 0 

		lastslide = slideIndex	
		slideIndex = targetSlide
		
		slides.forEach(                                                             
			(slide,index) => {                                                      
				slide.style.zIndex = 3                     
			}                                                                    
		) 
		
		
		slides[slideIndex].style.zIndex = 5
		slides[lastslide].style.zIndex = 5
	}
}

function showSlides(n) {
    slides = document.querySelectorAll(".item");                               
    dotContainer = document.getElementById("dots");
    slides.forEach(                                                           
        (slide,index) => {                                                    
            slide.style.zIndex = slides.length - index 
			newDot = document.createElement("div")
			newDot.classList.add("slider-dots_item")
			newDot.dataset.index = index
			newDot.addEventListener("click",dotClick)
			dotContainer.appendChild(newDot)
        }                                                                     
    )                                                                          
	
}