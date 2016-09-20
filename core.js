    //------------------------------------------------------------------------------/
    // CORE
    //------------------------------------------------------------------------------/
    // This method is only useful if you intend to loop over a collection of elements.
    // If you target a single element, you should use methods like document.getElementById 
    // or document.querySelector. 
    window.z = function (selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }; 