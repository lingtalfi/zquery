    // basic offset function
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // if more precision is required, check out jquery's way: https://github.com/jquery/jquery/blob/master/src/offset.js line 106
    /**
     * Note: as of 2016-10-09, there is a problem with getBoundingClientRect and all related properties.
     * https://github.com/lingtalfi/browsers-behaviours/blob/master/get-bounding-client-rect/bcr-icon.md
     * 
     * The code below hopes that the problem will be fixed.
     * If not, you might want to make sure to add a delay before using getBoundingClientRect,
     * at least in certain cases like an icon inside a button (your mileage may vary).
     * 
     */
    window.z.offset = function (el) {
        var rect = el.getBoundingClientRect(), // all(ie11+)
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    };