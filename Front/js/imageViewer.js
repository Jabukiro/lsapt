/*Image Viewer */
document.querySelectorAll(".image-box").forEach((imageBox) => {
    imageBox.addEventListener('click', (e) => {
        document.getElementById("full-image").setAttribute("src", e.target.getAttribute("data-image-src"));
        document.getElementById("image-viewer").classList.add("show");//Open image viewer
    })
})
document.querySelectorAll(".closeImageViewer").forEach((closer) => {
    closer.addEventListener("click", (e) => {
        document.getElementById("image-viewer").classList.remove("show");//close image viewer
    })
});