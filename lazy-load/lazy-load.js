function lazyLoad() {
    var imgs = document.querySelectorAll(".lazy");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (isShow(img) && isLoaded(img)) {
            loadImg(img);
        } else if (!isLoaded(img)) {
            img.classList.remove("lazy");
        }
    }
}

function isShow(img) {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    return img.offsetTop < scrollTop + windowHeight;
}

function isLoaded(img) {
    return img.getAttribute("data-src") && img.classList.contains("lazy");
}

function loadImg(img) {
    img.src = img.getAttribute("data-src");
    img.removeAttribute("data-src");
}