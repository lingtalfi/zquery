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
    // AJAX
    //------------------------------------------------------------------------------/
    // https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
    window.z.ajaxGet = function (url, success) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    };

    
    //------------------------------------------------------------------------------/
    // ATTRIBUTES
    //------------------------------------------------------------------------------/
    (function () {
        var cpt = 0;
        window.z.id = function (el) {
            var id = el.getAttribute('id');
            if (id) {
                return id;
            }
            id = "z-uid-" + cpt++;
            el.setAttribute('id', id);
            return id;
        };
    })();

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
            Object.prototype.trigger = function (eventName) {
                if (eventName in this.listeners) {
                    var args = [].slice.call(arguments, 1);
                    for (var i in this.listeners[eventName]) {
                        this.listeners[eventName][i].apply(this, args);
                    }
                }
            };
        }
    };


    // KEYBOARD EVENT KEY POLYFILL 
    if ('KeyboardEvent' in window && false === ('key' in KeyboardEvent.prototype)) {

        var keys = {
            8: 'Backspace',
            9: 'Tab',
            13: 'Enter',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown'
        };

        // Printable ASCII characters.
        var letter = '';
        var i;
        for (i = 65; i < 91; i++) {
            letter = String.fromCharCode(i);
            keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
        }

        var proto = {
            get: function (x) {
                var key = keys[this.which || this.keyCode] || "Unidentified";
                if (Array.isArray(key)) {
                    key = key[+this.shiftKey];
                }
                return key;
            }
        };
        Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    }

    //------------------------------------------------------------------------------/
    // MANIPULATION
    //------------------------------------------------------------------------------/
    (function () {

        /**
         * Only ie11 (from zquery supported browser's list) doesn't support the template tag.
         */
        var hasTemplate = ("content" in document.createElement("template"));


        // set display none for ie11
        // or comment this block of code and add a css rule if you prefer...
        if (false === hasTemplate) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = 'template { display: none; }';
            document.getElementsByTagName('head')[0].appendChild(style);
        }


        window.z.template = function (template) {
            if (true === hasTemplate) {
                return document.importNode(template.content, true);
            } else {
                var fragment = document.createDocumentFragment();
                var children = template.childNodes;
                for (i = 0; i < children.length; i++) {
                    fragment.appendChild(children[i].cloneNode(true));
                }
                return fragment;
            }
        }
    })();


    //------------------------------------------------------------------------------/
    // STYLES
    //------------------------------------------------------------------------------/
    window.z.getBcr = function (el, dynamic) {
        var bcr = z.getData(el, 'bcr', false);
        if (false === bcr || true === dynamic) {
            bcr = el.getBoundingClientRect();
            z.setData(el, 'bcr', bcr);
        }
        return bcr;
    };
    
    
    // basic offset function
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // if more precision is required, check out jquery's way: https://github.com/jquery/jquery/blob/master/src/offset.js line 106
    window.z.offset = function (el) {
        var rect = el.getBoundingClientRect(), // all(ie11+)
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    };

    window.z.position = function (el) {
        return {top: el.offsetTop, left: el.offsetLeft}
    };

    window.z.viewportWidth = function () {
        return document.documentElement.clientWidth;
        // return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };
    window.z.viewportHeight = function () {
        return document.documentElement.clientHeight;
        // return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    };

    //------------------------------------------------------------------------------/
    // TRAVERSING
    //------------------------------------------------------------------------------/    
    // closest, the code below is for ie (other modern browsers have native closest implementation)
    // https://plainjs.com/javascript/traversing/get-closest-element-by-selector-39/       
    (function () {
        // matches polyfill
        this.Element && function (ElementPrototype) {
            ElementPrototype.matches = ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                    var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
                    while (nodes[++i] && nodes[i] != node);
                    return !!nodes[i];
                }
        }(Element.prototype);

        // closest polyfill
        this.Element && function (ElementPrototype) {
            ElementPrototype.closest = ElementPrototype.closest ||
                function (selector) {
                    var el = this;
                    while (el.matches && !el.matches(selector)) el = el.parentNode;
                    return el.matches ? el : null;
                }
        }(Element.prototype);
    })();


    //------------------------------------------------------------------------------/
    // UTILITIES
    //------------------------------------------------------------------------------/
    /**
     * Note: this method works for the most basic cases, but might have issues if you are trying
     * to clone a Date object.
     * http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
     */
    window.z.clone = function (obj) {
        if (obj == null || typeof(obj) != 'object') {
            return obj;
        }
        var temp = new obj.constructor();
        for (var key in obj) {
            temp[key] = z.clone(obj[key]);
        }
        return temp;
    };


    (function () {
        function zStorify(el) {
            if ("undefined" === typeof el.zStore) {
                el.zStore = {};
            }
        }

        window.z.getData = function (el, key, defaultVal) {
            zStorify(el);
            if ('undefined' !== typeof el.zStore[key]) {
                return el.zStore[key];
            }
            return defaultVal;
        };

        window.z.setData = function (el, key, value) {
            zStorify(el);
            el.zStore[key] = value;
        };
    })();
    
    
    
    window.z.isFunction = function (mixed) {
        return ("function" === typeof mixed);
    };

    window.z.isPlainObject = function (mixed) {
        // http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
        return ('[object Object]' === Object.prototype.toString.call(mixed));
    };


    window.z.random = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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



