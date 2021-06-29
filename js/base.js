var viewWidth = (window.innerWidth || document.documentElement.clientWidth);
smallWidthLogo = "/media/lapt_logo.svg";

if (viewWidth <= 320){
    //Change Logo
    document.querySelector("#logo").src=smallWidthLogo;
}
// Quick Action PopUp Styling and Functionality
var quickAction = document.getElementById("quickAction");
var quickActionBar = document.getElementById("quickActionBar");
// Detect mobile browsing
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    console.log("Switching dropdown to link only")
    dropdownMenu=document.querySelectorAll(".dis-block");
    linkOnly=document.querySelectorAll(".dis-none");
    dropdownMenu.forEach(element => {
        element.classList.remove("dis-block");
        element.classList.add("dis-none");
    });
    linkOnly.forEach(element => {
        element.classList.remove("dis-none");
        element.classList.add("dis-block");
    });
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