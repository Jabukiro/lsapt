//
let videoPlay = document.querySelector('#loaderVideo').play();

if (videoPlay !== undefined) {
    videoPlay.then(() => { 
        document.querySelector('#loaderVideo').addEventListener('ended', function(){
            if (document.querySelector("#background_vid").readyState >= 3){
                load();
            } else {
                document.querySelector('#loaderVideo').addEventListener('ended', function(){load()});
                /*var b = setInterval(()=>{
                    if(document.querySelector("#background_vid").readyState >= 3){
                        load();
                        clearInterval(b);
                    }                   
                },500);*/
            }
        });
  }).catch(error => {
      //No autoplay allowed
      console.log(error);
      const loaderBackground=document.getElementById("loaderBackground");
      document.getElementById("loadedContent").style.display="block";
      //var loadedContent=document.getElementById("loadedContent");
      loaderBackground.style.opacity="0";
      loaderBackground.style.zIndex=0;
      const load1 = document.querySelector("#load1");
      load1.style.paddingTop="0";
      load1.style.opacity="1";
  });
}
var instaBodyTopPadding = 28;
var minWidth = 300;
var maxWidth = 500;
var viewHeight = (window.innerHeight || document.documentElement.clientHeight);
var viewWidth = (window.innerWidth || document.documentElement.clientWidth);

function load(){
    const loaderBackground=document.getElementById("loaderBackground");
    document.getElementById("loadedContent").style.display="block";
    //var loadedContent=document.getElementById("loadedContent");
    loaderBackground.style.opacity="0";
    loadContent(loaderBackground);
}
function loadContent(loaderBackground){
    const video = document.querySelector("#background_vid");
    video.play();
    loaderBackground.style.zIndex=0;
    setTimeout(()=>{
        const load1 = document.querySelector("#load1");
        load1.style.paddingTop="0";
        load1.style.opacity="1";
    }, 3000);
}
// Set playback to 0.8
document.querySelector("#background_vid").playbackRate=0.8;
// Get the header
var header = document.getElementById("topNavBar");
// Get the offset position of the navbar
var sticky = header.offsetTop;
function stickyNav() {
    //Viewwidth as stickynav needed for viewwidth that are less than 576.
    if ( window.pageYOffset > sticky || viewWidth < 576 ) {
        header.classList.add("top-nav-collapse");
    } else {
        header.classList.remove("top-nav-collapse");
    }
}stickyNav();
document.addEventListener("scroll", stickyNav);
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
function popScroll() {
    // Icons will have a transition when they are in the viewport.
    var bulletIcons = document.getElementsByClassName("big-bullet-icon");
  
    for ( i = bulletIcons.length; i--; ){
      var bulletIcon = bulletIcons[i],
          pos= bulletIcon.getBoundingClientRect(),
          bottomPerc = pos.bottom    / viewHeight * 100;
      if ( bottomPerc < 100 ){
        bulletIcon.classList.add("pop-scroll");
      }
    }
}popScroll();//Run in case starting viewPort is long enough to contain the bulet-icons.
document.addEventListener("scroll", popScroll);
/*
["click", "touchend"].forEach( (eventType) => {
    addEventListener(eventType, (e) => {
        navbar=document.querySelector("#navbarsExample03");
        menuBtn=navbar.previousElementSibling;
        navbarStyle=getComputedStyle(navbar);
        menuBtnStyle=getComputedStyle(menuBtn);
        if ( navbarStyle.display != "none" && menuBtnStyle.display != "none" ) {
            menuBtn.click();
            console.log("Just closed menu.")
            /*
                menuBtn.classList.add("collapsed")
                navbar.classList.remove("show");
        }
    });
});
*/
window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 100);
});