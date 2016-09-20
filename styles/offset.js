    // basic offset function
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // if more precision is required, check out jquery's way: https://github.com/jquery/jquery/blob/master/src/offset.js line 106
    window.z.offset = function (el) {
        var rect = el.getBoundingClientRect(), // all(ie11+)
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    };