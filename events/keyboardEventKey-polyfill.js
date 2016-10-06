/**
 * Note: this is a very simple and not complete polyfill for the KeyboardEvent.key method.
 *
 * As the time of writing, most modern browsers (chrome53, ffox49, opera40, ie11, edge13) have a
 * native implementation of the KeyboardEvent.key method.
 * Only safari9 doesn't have one yet, but it's currently being resolved:
 * https://bugs.webkit.org/show_bug.cgi?id=36267
 *
 *
 * That's why this implementation is so simple: it does only fit my personal needs, knowing that
 * sooner or later Safari will have this feature natively.
 *
 * This code only costs a double condition for browsers that have native KeyboardEvent.key method,
 * so you can probably include it anywhere in your code.
 *
 * Actually, the main reason that I didn't implement full feature was that there are different keyboards layout,
 * and address all layouts would be a crazy task, or at least one that wouldn't be worth it in my case.
 * So this implementation focuses on the common/safe keys.
 *
 *
 * Recognized keys
 * --------------------
 * - all letters (a...z), lower case or upper case, but not numbers!
 * - Backspace
 * - Tab
 * - Enter
 * - Escape
 * - " " (space)
 * - PageUp
 * - PageDown
 * - End
 * - Home
 * - ArrowLeft
 * - ArrowUp
 * - ArrowDown
 * - ArrowRight
 *
 *
 *
 *
 *
 */


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