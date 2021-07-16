var viewWidth = (window.innerWidth || document.documentElement.clientWidth);
smallWidthLogo = "/media/lapt_logo.svg";

if (viewWidth <= 320) {
    //Change Logo
    document.querySelector("#logo").src = smallWidthLogo;
}
//Fetch and attach token response to form before submitting
var contactForm = document.getElementById("contact-form"); contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("SubmitBtn").disabled = true;
    document.getElementById("SubmitBtnSpinner").style.display = "inline-block";
    console.log(`contact-form submit-eventListener called with: ${e}`);
    grecaptcha.enterprise.ready(function () {
        grecaptcha.enterprise.execute('6LcVmn8bAAAAAAbCHhXQzz9uiQ8S8IrHZKABfnZE', { action: 'contact' }).then(function (token) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', "g-recaptcha-response");
            input.setAttribute('value', token);
            contactForm.appendChild(input);
            contactForm.submit();
            //HTMLFormElement.prototype.submit.call(contactForm);
        }).catch((reason) => {
            console.log(`grecaptcha.enterprise.execute failed with reason ${reason}`);
            document.getElementById("SubmitBtn").disabled = false;
            document.getElementById("SubmitBtnSpinner").style.display = "none";
        });
    });
});
// Quick Action PopUp Styling and Functionality
var quickAction = document.getElementById("quickAction");
var quickActionBar = document.getElementById("quickActionBar");
// Detect mobile browsing
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    console.log("Switching dropdown to link only")
    dropdownMenu = document.querySelectorAll(".dis-block");
    linkOnly = document.querySelectorAll(".dis-none");
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
    quickAction.addEventListener("click", function () {
        if (quickAction.dataset.isOpen == "false") {
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