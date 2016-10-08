(function () {
    var cpt = 0;
    window.z.id = function (el) {
        var id = el.getAttribute('id');
        if (id) {
            return id;
        }
        id = "z-uid-" + cpt++;
        el.setAttribute('id', id);
        return id;
    };
})();