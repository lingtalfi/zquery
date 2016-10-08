/**
 * According to mdn: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft,
 * accessing the coordinates of an element relative to its closest positioned parent
 * should be given by the offsetTop/offsetLeft properties of the element.
 * 
 * However, out of curiosity I checked out jquery's source code which is a little
 * bit more involved: http://james.padolsey.com/jquery/#v=git&fn=jQuery.fn.position
 * 
 * Therefore, to ensure consistency between my apps, I prefer to wrap this technique
 * into the position method.
 * 
 * As for now, I'll go with native offsetTop/offsetLeft, but this might evolve
 * if I see particular cases where this doesn't work.
 * 
 */
window.z.position = function (el) {
    return {top: el.offsetTop, left: el.offsetLeft}
};