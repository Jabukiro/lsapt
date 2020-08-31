//
var instaBodyTopPadding = 28;
var minWidth = 300;
var maxWidth = 500;
var viewHeight = (window.innerHeight || document.documentElement.clientHeight);
// Frame Width size calculation. To call on first load and resize as well.
function getWidth(element){
    stringTarget = getComputedStyle(element).width;
    //Very Lazy match
    match = stringTarget.match(/^[0-9]*/)[0];
    return Number(match);
}
function sizeInstaFrame () {
    var containerWidth = getWidth(document.getElementById("instaFrameContainer"));

    if ( containerWidth > maxWidth ) {
        frameWidth = maxWidth + ( instaBodyTopPadding * 2);
    } else if ( minWidth <= containerWidth ) {
        frameWidth = containerWidth + ( instaBodyTopPadding * 2);
    } else {
        frameWidth = minWidth + ( instaBodyTopPadding * 2);
    }
    document.getElementById("instaFrame").style.height = String(frameWidth) + "px";
} sizeInstaFrame();
document.addEventListener("resize", sizeInstaFrame);
// Quick Action PopUp Styling and Functionality
var quickAction = document.getElementById("quickAction");
var quickActionBar = document.getElementById("quickActionBar")
// Detect mobile browsing
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    quickAction.style.display = "block";
    // Open and Close handle of quick action
    quickAction.addEventListener("click", function() {
        if ( quickAction.dataset.isOpen == "false" ) {
            quickAction.classList.remove("quickActionClosed");
            quickActionBar.style.display = "block";
            quickAction.dataset.isOpen = "true";
        } else {
            quickAction.classList.add("quickActionClosed");
            quickActionBar.style.display = "none";
            quickAction.dataset.isOpen = "false";
        }
    });
}
//End Quick Action
function popScroll() {
    // Icons will have a transition when they are in the viewport.
    var bulletIcons = document.getElementsByClassName("big-bullet-icon");
  
    for ( i = bulletIcons.length; i--; ){
      var bulletIcon = bulletIcons[i],
          pos= bulletIcon.getBoundingClientRect(),
          bottomPerc = pos.bottom    / viewHeight * 100;
      if ( bottomPerc < 90 ){
        bulletIcon.classList.add("pop-scroll");
      }
    }
}popScroll();//Run in case starting viewPort is long enough to contain the bulet-icons.
document.addEventListener("scroll", popScroll);