/**
 * Note: this method works for the most basic cases, but might have issues if you are trying
 * to clone a Date object.
 * http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
 */
window.z.clone = function(obj) {
    if (obj == null || typeof(obj) != 'object') {
        return obj;
    }
    var temp = new obj.constructor();
    for (var key in obj) {
        temp[key] = z.clone(obj[key]);
    }
    return temp;
};