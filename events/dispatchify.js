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