/**
 * lazy per element getter for boundingClientRect.
 * This method is intended for framework developers mainly.
 * Depends on getData/setData.
 */
window.z.getBcr = function (el, dynamic) {
    var bcr = z.getData(el, 'bcr', false);
    if (false === bcr || true === dynamic) {
        bcr = el.getBoundingClientRect();
        z.setData(el, 'bcr', bcr);
    }
    return bcr;
};