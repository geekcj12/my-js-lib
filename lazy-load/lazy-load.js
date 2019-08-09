function LazyLoad(imgs, placeholder) {
    this.imgs = document.querySelectorAll(imgs);
    this.placeholder = placeholder;
}

LazyLoad.prototype.init = function() {
    var that = this;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    for (let i = 0; i < this.imgs.length; i++) {
        this.imgs[i].setAttribute("data-src", this.imgs[i].src);
        this.imgs[i].src = this.placeholder;
        if (this.imgs[i].offsetTop < scrollTop + windowHeight) {
            this.imgs[i].src = this.imgs[i].getAttribute("data-src");
            this.imgs[i].removeAttribute("data-src");
        }
    }
    window.onscroll = function() {
        that.load();
    }
}

LazyLoad.prototype.load = function() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    for (let i = 0; i < this.imgs.length; i++) {
        if (this.imgs[i].getAttribute("data-src") && this.imgs[i].offsetTop < scrollTop + windowHeight) {
            this.imgs[i].src = this.imgs[i].getAttribute("data-src");
            this.imgs[i].removeAttribute("data-src");
        }
    }
}
