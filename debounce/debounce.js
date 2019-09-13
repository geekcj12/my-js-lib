function debounce(func, delay) {
    var timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(func, delay);
    };
}