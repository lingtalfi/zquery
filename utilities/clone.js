window.z.clone = function (mixed) {
    if (Array.isArray(mixed)) {
        var out = [];
        var len = mixed.length;
        for (var i = 0; i < len; i++) {
            out[i] = z.clone(mixed[i]);
        }
        return out;
    }
    else if (z.isPlainObject(mixed)) {
        var out = {};
        for (var i in mixed) {
            out[i] = z.clone(mixed[i]);
        }
        return out;
    }
    return mixed;
};