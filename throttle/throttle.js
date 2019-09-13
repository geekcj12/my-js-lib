function throttle(func, delay) {
    var valid = true;
    return function() {
        if (!valid) {   // 非工作状态，不执行操作
            return false;
        }
        // 执行函数，在间隔期把状态设为无效
        valid = false;
        setTimeout(function() {
            func();
            valid = true;
        }, delay);
    }
}