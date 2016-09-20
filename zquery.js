//------------------------------------------------------------------------------/
// z: a customized javascript library for your projects
//------------------------------------------------------------------------------/
// by lingtalfi, created 2016-09-20
/**
 * This is a collection of some useful functions that help you with your js projects.
 *
 *
 * All the functions used in this file are supported by modern browsers: ie11+ and other browsers.
 *
 *
 *
 * THIS IS DEVELOPMENT FILE, DON'T USE IN PRODUCTION !!
 * ---------------------------------------------------------
 * This is the development file containing all the functions (convenient while developing).
 * I recommend that for your project, you create a new zquery.js file, and you add ONLY the functions
 * that you need as you need them.
 * This helps keeping your assets weight to the minimum required.
 *
 */
if (!window.z) {
    //------------------------------------------------------------------------------/
    // CORE
    //------------------------------------------------------------------------------/
    // This method is only useful if you intend to loop over a collection of elements.
    // If you target a single element, you should use methods like document.getElementById 
    // or document.querySelector. 
    window.z = function (selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }; 
    //------------------------------------------------------------------------------/
    // STYLES
    //------------------------------------------------------------------------------/
    // basic offset function
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // if more precision is required, check out jquery's way: https://github.com/jquery/jquery/blob/master/src/offset.js line 106
    window.z.offset = function (el) {
        var rect = el.getBoundingClientRect(), // all(ie11+)
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    };

    //------------------------------------------------------------------------------/
    // PLUGINS CORE
    //------------------------------------------------------------------------------/
    // this method returns a ZquerySet object, which might only be convenient if chained to a plugin method.
    // See the ZquerySet object below for more information
    window.zz = function (selector) {
        return new ZquerySet(Array.prototype.slice.call(document.querySelectorAll(selector)));
    };
    /**
     * The Zquery set allows us to apply methods on a collection of dom element (a simple js array actually).
     * It was created so that plugins could use it.
     * For instance, a plugin named ripple could extend the prototype and provide a method ripple that we could 
     * use like this:
     *          zz(".ripple").ripple();
     * 
     */
    window.ZquerySet = function (els) {
        this.els = els;
    };
    window.ZquerySet.prototype = {
        each: function (callback) {
            this.els.forEach(callback);
        }
    }
}



