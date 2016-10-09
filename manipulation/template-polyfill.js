/**
 * Note: this is a simple rough polyfill,
 * it doesn't prevent script tags from executing for instance.
 * So: don't use script tags inside your template (otherwise you loose ie11 support).
 */
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