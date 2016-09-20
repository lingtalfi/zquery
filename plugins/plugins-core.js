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