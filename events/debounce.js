window.z.debounce = function(func, wait){
    var id = null;
    return function(){
        if(null !== id){
            clearTimeout(id);
        }
        id = setTimeout(func, wait);
    };
};