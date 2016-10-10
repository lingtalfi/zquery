/**
 * Simple store implementation.
 * You could use any property, but the advantage of getData/setData is that all
 * the properties are namespaced within the zStore keyword.
 */
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