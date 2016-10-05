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
    window.z = function (selector, context) {
        context = context || document;
        return Array.prototype.slice.call(context.querySelectorAll(selector));
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
    // EVENTS
    //------------------------------------------------------------------------------/
    window.z.debounce = function (func, wait) {
        var id = null;
        return function () {
            if (null !== id) {
                clearTimeout(id);
            }
            id = setTimeout(func, wait);
        };
    };


    window.z.dispatchify = function (obj, Object) {
        // https://github.com/lingtalfi/jsdispatchers/blob/master/simple_dispatcher.js
        if ('undefined' === typeof obj.listeners) {
            obj.listeners = {};
            obj.listenerIndex = 0;
        }

        if ('undefined' === typeof Object.prototype.on) {
            Object.prototype.on = function (eventName, fn) {
                if (false === (eventName in this.listeners)) {
                    this.listeners[eventName] = {};
                }
                this.listeners[eventName][this.listenerIndex++] = fn;
                return this;
            };
            Object.prototype.off = function (eventName, fn) {
                for (var i in this.listeners) {
                    for (var j in this.listeners[i]) {
                        if (this.listeners[i][j] === fn) {
                            delete this.listeners[i][j];
                        }
                    }
                }
            };
            Object.prototype.trigger = function (eventName, ...args) {
                if (eventName in this.listeners) {
                    for (var i in this.listeners[eventName]) {
                        this.listeners[eventName][i].call(this, ...args);
                    }
                }
            };
        }
    };

    //------------------------------------------------------------------------------/
    // PLUGINS CORE
    //------------------------------------------------------------------------------/
    // this method returns a ZquerySet object, which might only be convenient if chained to a plugin method.
    // See the ZquerySet object below for more information
    window.zz = function (selector, context) {
        context = context || document;
        return new ZquerySet(Array.prototype.slice.call(context.querySelectorAll(selector)));
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
    };

}



