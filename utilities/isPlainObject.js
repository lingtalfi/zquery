window.z.isPlainObject = function(mixed){
    // http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
    return ('[object Object]' === Object.prototype.toString.call(mixed));
};