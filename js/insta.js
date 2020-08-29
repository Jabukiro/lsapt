! (function(d) {
    var minWidth = 300;
    var maxWidth = 500;
    var moving = false;
    var INTERVAL = 600;
    function setWidth() {
        var viewWidth = (window.innerWidth || document.documentElement.clientWidth);
        if ( viewWidth > maxWidth ) {
            frameWidth = maxWidth;
        } else if ( minWidth <= viewWidth ) {
            frameWidth = viewWidth;
        } else {
            frameWidth = minWidth;
        }
        document.getElementById("instagramSlider").style.width = String(frameWidth) + "px";
        document.getElementById("instagram-feed-1").style.width = String(frameWidth) + "px";
    } setWidth();
    function suspendInteraction (interval){
        moving = true;
        setTimeout( function (){
            moving=false;
        }, interval)
    }
    function slider(e) {
        if (!moving) {
            suspendInteraction(INTERVAL);
            instaSlide = document.getElementById("instagramSlider");
            instaSlideNext = document.getElementById("instagramSliderNext");
            instaSlidePrev = document.getElementById("instagramSliderPrev");
            console.log(e.target);
            if ( e.target.dataset.sliderButton == "instagramSliderNext") {
                newTransform = Number(instaSlide.dataset.currentTransform) - 100;
                instaSlide.style.transform = "translateX(" + String(newTransform) + "%)";
                instaSlide.dataset.currentTransform = newTransform;
            } else {
                newTransform = Number(instaSlide.dataset.currentTransform) + 100;
                instaSlide.style.transform = "translateX(" + String(newTransform) + "%)";
                instaSlide.dataset.currentTransform = newTransform;
            }
            console.log(instaSlide.style.transform);
        }
    }
    document.getElementById("instagramSlider").addEventListener("transitionend", (e) => {
        instaSlide = document.getElementById("instagramSlider");
        instaSlideNext = document.getElementById("instagramSliderNext");
        instaSlidePrev = document.getElementById("instagramSliderPrev");
        // Enable/Remove buttons to control allowed flow
        if ( Number(instaSlide.dataset.currentTransform) < 0 ) {
            instaSlidePrev.classList.add("instagram-slider-arrow-enabled");
        }
        if ( Number(instaSlide.dataset.currentTransform) == 0 ) {
            instaSlidePrev.classList.remove("instagram-slider-arrow-enabled");
        }
        if ( Number(instaSlide.dataset.currentTransform) == Number(instaSlide.dataset.maxTransform) ) {
            instaSlideNext.classList.remove("instagram-slider-arrow-enabled");
        }
        if ( Number(instaSlide.dataset.currentTransform) != Number(instaSlide.dataset.maxTransform) ) {
            instaSlideNext.classList.add("instagram-slider-arrow-enabled");
        }
    } )
    document.getElementById("instagramSliderNext").addEventListener("click", slider);
    document.getElementById("instagramSliderPrev").addEventListener("click", slider);
    document.addEventListener("resize", setWidth);
} (document));