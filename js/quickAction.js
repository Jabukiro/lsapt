// Quick Action PopUp Styling and Functionality
var quickAction = document.getElementById("quickAction");
var quickActionBar = document.getElementById("quickActionBar")
// Detect mobile browsing
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    dropdownMenu=document.querySelector(".nav-item.dropdown");
    trainLink=document.querySelector("#training-link");
    dropdownMenu.style.display = "none";
    trainLink.style.display = "block";
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