function waterFall(container, gap) {
    var container = document.getElementById(container);
    var items = container.children;
    var pageWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    var itemWidth = items[0].offsetWidth;
    var gap = gap || 10;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = [];

    for (var i = 0; i < items.length; i++) {
        if (i < columns) {  // 确认第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);
            console.log(arr);
        } else {    // 其它行
            // 找出数组中最小高度和它的索引值
            var minHeight = arr[0];
            var index = 0;
            for(var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 设置下一行第一个的位置
            // top值为最小列的高度加边距
            items[i].style.top = arr[index] + gap + 'px';
            // left值为最小列
            items[i].style.left = items[index].offsetLeft + 'px';
            // 修改最小列高度
            // 最小列高度 = 当前自己高度 + 拼接过来的高度 + 边距
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
    console.log(arr);
}