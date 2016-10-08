/**
 * http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
 * Currently, I return the fastest viewport dimensions;
 * I also included the cross (old) browser compatible version below in comments.
 * 
 * Note that I tested document.body.clientWidth in Chrome, and it is shrinked with margins,
 * and therefore is not correct.
 * 
 * 
 * Test 2016-10-08: is document.documentElement.clientWidth representative of the viewport width?
 * (my test code had a margin: 16px on the body, which would make document.body.clientWidth give
 * undesired results at least in chrome53)
 * 
 * - chrome53: yes
 * - ffox49: yes
 * - safari9: yes
 * - opera40: yes
 * - edge13: yes
 * - ie11: yes
 * 
 */
window.z.viewportWidth = function () {
    return document.documentElement.clientWidth;
    // return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};
window.z.viewportHeight = function () {
    return document.documentElement.clientHeight;
    // return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};