Zquery
=============
2016-09-20


A customized javascript library for your projects.


Features
-------------
- composable library (it only includes what you need), which means it can be ridiculously small, depending on which functions need
- all functions are compatible with at least ie11+, and other modern browsers (excluding opera mini) 






List of available methods and polyfills
-----------------------------

- [KeyboardEvent.key polyfill](https://github.com/lingtalfi/zquery#keyboardeventkey-polyfill)
- [z ( selector, ?context )](https://github.com/lingtalfi/zquery#z--selector-context-)
- [z.ajaxGet ( el )](https://github.com/lingtalfi/zquery#zajaxget--url-success-)
- [z.clone ( obj )](https://github.com/lingtalfi/zquery#zclone--obj-)
- [z.closest ( selector ) - polyfill](https://github.com/lingtalfi/zquery#domelementclosest--selector-)
- [z.debounce ( func, wait )](https://github.com/lingtalfi/zquery#zdebounce--func-wait-)
- [z.deleteCookie ( name )](https://github.com/lingtalfi/zquery#zdeletecookie--name-)
- [z.dispatchify ( obj, Class )](https://github.com/lingtalfi/zquery#zdispatchify--obj-object-)
- [z.getBcr ( el, ?dynamic )](https://github.com/lingtalfi/zquery#zgetbcr--el-dynamic-)
- [z.getCookie ( name )](https://github.com/lingtalfi/zquery#zgetcookie--name-)
- [z.getData ( el, key, ?defaultVal )](https://github.com/lingtalfi/zquery#zgetdata--el-key-defaultval-)
- [z.id ( el )](https://github.com/lingtalfi/zquery#zid--el-)
- [z.isFunction ( mixed )](https://github.com/lingtalfi/zquery#zisfunction--mixed-)
- [z.isPlainObject ( mixed )](https://github.com/lingtalfi/zquery#zisplainobject--mixed-)
- [z.offset ( el )](https://github.com/lingtalfi/zquery#zoffset--el-)
- [z.position ( el )](https://github.com/lingtalfi/zquery#zposition--el-)
- [z.random ( min, max )](https://github.com/lingtalfi/zquery#zrandom--min-max-)
- [z.setCookie ( name, value, days )](https://github.com/lingtalfi/zquery#zsetcookie--name-value-days-)
- [z.setData ( el, key, value )](https://github.com/lingtalfi/zquery#zsetdata--el-key-value-)
- [z.template ( el ) - polyfill](https://github.com/lingtalfi/zquery#ztemplate--el-)
- [z.viewportHeight ( )](https://github.com/lingtalfi/zquery#zviewportheight--)
- [z.viewportWidth ( )](https://github.com/lingtalfi/zquery#zviewportwidth--)
- [zz ( selector, ?context )](https://github.com/lingtalfi/zquery#how-to-use-the-plugins)




How to use the library
---------------

There are two ways to use zquery: the lazy way, and the serious way.
You should be using the serious way.

With both methods, you include a zquery.js file in your html.
The only difference is the content of the zquery.js file.


```html 
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>zquery's z method</title>
	<script src="zquery.js"></script>
</head>

<body>

<ul>
	<li class="item">hello</li>
	<li class="item">boo</li>
	<li class="item">mii</li>
</ul>


<script>

	z('.item').forEach(function (el) {
		el.style.background = "red";
	});
	
</script>

</body>
</html>
```





### lazy way

This mode is more to test whether or not you like zquery.
In that case, you can simply include the zquery.js file in your head, 
then use the zquery methods described below, and see if it fits your needs.


### serious way

Zquery's primary focus is to reduce the code to it's strict minimum.

In other words: use only what you need.

The zquery library is composed of a core, and each function is located in its own file.
It's also possible to write zquery plugins, and each plugin is in its own file too.

The serious way is basically the idea that you start by creating a new (your own) zquery.js file, in which you 
paste the core only.

Then, as you need some functions, you paste them into your zquery.js file.



Note: you must include the core before you can include the other zquery functions or plugins.

Note2: by default, the zquery.js file contains all the functions (lazy version).







Core (core.js file)
-------

### z ( selector, ?context )

```
Array z ( str:selector, ?domEl:context )
```
z performs a document.querySelectorAll request, and returns an Array containing the dom elements that matched.
 
 
Example
```js
// select all elements with css class "item" and set their background color to red
z('.item').forEach(function (el) {
    el.style.background = "red";
});
``` 

You can provide the context as the second argument, which defaults to document otherwise.

Example
```js
// select all ".item" elements inside "#myContainer" and set their background color to red
var container = document.getElementById("myContainer");
z('.item', container).forEach(function (el) {
    el.style.background = "red";
});
``` 



Ajax
----------

### z.ajaxGet ( url, success )

```
void z.ajaxGet ( string:url, callback:success )
```

Make a GET request to the given url and execute the success callback upon successful query.

 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>zquery id demo</title>
	<script src="zquery/zquery.js"></script>
</head>
<body>

<button id="btn" class="btn1">Hi</button>
<button class="btn2">Hi</button>
<button class="btn3">Hi</button>
<script>
	
	var btn1 = document.querySelector('.btn1');
	var btn2 = document.querySelector('.btn2');
	var btn3 = document.querySelector('.btn3');
	
	console.log(z.id(btn1)); // btn
	console.log(z.id(btn1)); // btn
	console.log(z.id(btn2)); // z-uid-0
	console.log(z.id(btn2)); // z-uid-0
	console.log(z.id(btn3)); // z-uid-1
	console.log(z.id(btn3)); // z-uid-1
</script>

</body>
</html>
``` 




Attributes
----------

### z.id ( el )

```
string z.id ( domElement:el )
```
Returns the css id of the given element.
One (unique identifier) is created if necessary.

 
Example
```js
z.ajaxGet("/services/vote.php?id=680", function (data) {
    if ('true' === data) {
        // todo: increment the span#vote number
    }
});
``` 



Events
----------

### z.debounce ( func, wait )

```
function z.debounce ( function:func, number:wait )
```
Returns a function that when called, will be executed after a delay of n=wait milliseconds.
If the function is called again before the delay has expired, then a new delay is created and
the previous call will be cancelled.
In other words, the returned function will not be triggered more than once every n=wait milliseconds.

 
Example
```js
// this function will not execute more than once every 400ms.
 window.addEventListener('resize', z.debounce(function(e){
        console.log("e");
    }, 400));
``` 


### z.dispatchify ( obj, Object )

```
void z.dispatchify ( instance:obj, Class:Object )
```

Take the object which instance and class are passed, and add two properties to the instance, and three to the
Object's prototype, effectively turning the object into a simple dispatcher.

The two properties (you shouldn't worry about them, just ensure that they don't already exist in your object):

- listeners
- listenerIndex

The three methods are:

- on (eventName, fn)
- off (eventName, fn)
- trigger (eventName, ...args)


Note: if the properties or the methods already exist, then won't be added a second time.

More info about the dispatcher here: https://github.com/lingtalfi/jsdispatchers#simple-dispatcher
 
 

 
Example
```js
	var Car = function () {
		this.color = "red";
		z.dispatchify(this, Car);
	};

	Car.prototype = {
		getColor: function () {
			this.trigger("getColorBefore", this);
			return this.color;
		}
	};

	
	
	var austin = new Car();
	
	austin.on("getColorBefore", function (zis) {
		zis.color = 'blue';
		console.log("getColorBefore");
	});


	console.log(austin.getColor()); // getColorBefore  blue
``` 



### KeyboardEvent.key polyfill

This is a simple and not complete KeyboardEvent.key polyfill for browsers that don't have a native 
implementation yet (safari9 as the time of writing, but they are currently working on it...).

Basically, it emulates letters (lower case or upper case), NOT numbers, and a few special chars like Tab, ArrowLeft,
Enter,...

More details in the source code's comments.
 
 
Example
```js
document.body.addEventListener('keydown', function (e) {
    console.log(e.key);
});
``` 





Manipulation
----------

### z.template ( el )

```
DocumentFragment z.template ( domElement:el )
```

This is a simple and not complete polyfill for the template tag (ie11).
It only emulates the most basic functionality demonstrated in the example below.

This means: do not use script tags and styles inside your template tag, 
and be aware that any http request (an image for instance) will be made in ie11 (but not
in other browsers fortunately).

 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Testing getBoundingClientRect with a button containing an icon</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<script src="zquery/zquery.js"></script>

</head>

<body>

<template id="simple">
	<li>Item X</li>
</template>

<button id="btn">Click me</button>


<ul id="container">
	<li>Item A</li>
	<li>Item B</li>
</ul>

<script>
	
	var liTemplate = z.template(document.getElementById('simple'));
	var ul = document.getElementById('container');
	document.getElementById('btn').addEventListener('click', function (e) {
		e.preventDefault();
		ul.appendChild(liTemplate.cloneNode(true));
	});
</script>
</body>
</html>
``` 








Styles
----------

### z.getBcr ( el, ?dynamic )

```
Object z.getBcr ( domElement:el, ?bool:dynamic )
```

Return the object return by the native getBoundingClientRect method in a lazy manner.

This means the first call will store the reference to the object in the given element's memory (zStore).
Subsequent calls will retrieve the object from the store rather than re-computing it. 

If the dynamic flag is set to true, the object will be re-computed anyway.
 
 
Note: depends on the z.getData and z.setData methods.
 
 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>z.getBcr demo</title>
	<script src="zquery/zquery.js"></script>
</head>

<body>
<button id="hi">Hi</button>
<script>
	
	var btn = document.getElementById('hi');
	
	console.log(z.getBcr(btn)); // first call, stores the value in zStore
	console.log(z.getBcr(btn)); // takes the value from the zStore instead of recomputing it
	console.log(z.getBcr(btn, true)); // dynamic flag: recomputes the bcr anyway

</script>
</body>
</html>  
``` 



### z.offset ( el )

```
Object z.offset ( domElement:el )
```
Returns an object containing the top and left properties, two numbers which represent the position of the given element
relative to the document.
 
 
Example
```js
// gets the top and left position of the element ".special" relative to the whole document 
var info = z.offset(document.querySelector(".special"));
console.log(info.top, info.left, info);  
``` 


### z.position ( el )

```
Object z.position ( domElement:el )
```
Returns an object containing the top and left properties, two numbers which represent the position of the given element
relative to the closest positioned ancestor.
 
 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Sam button demo</title>
	<script src="zquery/zquery.js"></script>

	<style>
		body {
			margin: 16px;
		}

	</style>
</head>
<body>

<button id="btn">Hi</button>
<script>
	console.log(z.position(document.getElementById('btn'))); // { left: 16, top: 17 }
</script>

</body>
</html>  
``` 


### z.viewportHeight ( )

```
number z.viewportHeight ( )
```

Returns the viewport height (independent of scrolling, and without the scrolling bars).
 
 
Example
```js
console.log(z.viewportHeight()); // 844
``` 


### z.viewportWidth ( )

```
number z.viewportWidth ( )
```

Returns the viewport width (independent of scrolling, and without the scrolling bars).
 
 
Example
```js
console.log(z.viewportWidth()); // 946
``` 



Traversing
----------

### domElement.closest ( selector )

```
null|domElement domElement.closest ( string:selector )
```

Returns the first element to match the given selector, starting at the domElement object and traversing 
the parents until there is no more parent, in which case null is returned.

This method is actually a polyfill for Internet Explorer, since other modern browsers have a native closest method.

 
 
Example
```js
document.querySelector(".container").addEventListener("click", function (e) {
    var item = e.target.closest(".item");
    if(null !== item){
        console.log("aha");
    }
});  
``` 


Utilities
------------


### z.clone ( obj )

```
mixed z.clone ( mixed:mixed )
```

Return a clone of the given argument.
If the argument is an array or an object, a deep copy is performed (recursively). 

 
 
Example
```js
var car = {
    color: "red",
};
var options = {
    car: car,
    wheels: 4,
};
var myOptions = z.clone(options);
myOptions.car.color = "blue";
console.log(options.car.color); // red
console.log(myOptions.car.color); // blue
``` 



### z.deleteCookie ( name )

```
void z.deleteCookie ( str:name )
```

Deletes the cookie which name is given.

Name with special chars should be encoded with the encodeURIComponent function.

// https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/

 
 
Example
```js
z.deleteCookie("my-cookie");
``` 



### z.getCookie ( name )

```
null|str z.getCookie ( str:name )
```

Returns the value of a given cookie, or null if it was not set.
 
 
Example
```js
var value = z.getCookie("my-cookie");
``` 


### z.getData ( el, key, ?defaultVal )

```
mixed z.getData ( domElement:element, string:key, ?mixed:defaultVal )
```

A zStore property is attached to the given element if not there already.

Return the data indexed by the given key from the element's zStore,
or the defaultVal (which defaults to undefined) otherwise.
 
 
Note: this method comes along with the z.setData method counterpart. 
 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>z.setData/getData demo</title>
	<script src="zquery/zquery.js"></script>
</head>

<body>
<button id="hi">Hi</button>
<script>


	var btn = document.getElementById('hi');
	z.setData(btn, "number", 49);
	console.log(z.getData(btn, "number")); // 49
	z.setData(btn, "string", "hello");
	console.log(z.getData(btn, "string")); // hello
	z.setData(btn, "object", {color: "red"});
	console.log(z.getData(btn, "object")); // {color: 'red'}


</script>
</body>
</html>
``` 



### z.isFunction ( mixed )

```
bool z.isFunction ( mixed:mixed )
```

Return whether or not the given argument is a function.
 
 
Example
```js
var p = function(){
    
};
var q = {};
console.log(z.isFunction(p)); // true
console.log(z.isFunction(q)); // false
``` 



### z.isPlainObject ( mixed )

```
bool z.isPlainObject ( mixed:mixed )
```

Return whether or not the given argument is a plain js object.
 
 
Example
```js
var p = function(){
		
};
var q = {};
var r = [];
console.log(z.isPlainObject(p)); // false
console.log(z.isPlainObject(q)); // true
console.log(z.isPlainObject(r)); // false
``` 



### z.random ( min, max )

```
int z.random ( number:min, number:max )
```

Return a random int between min and max (both included).
 
 
Example
```js
console.log(z.random(0, 0.3)); //0, 0, 0, ...
console.log(z.random(0, 50)); // 47, 9, 27, ...
console.log(z.random(6, 7)); // 6, 6, 7, ...
console.log(z.random(6, 50)); // 34, 34, 41, ...
console.log(z.random(6000, 80000)); // 67326, 60425, 78432, ...
console.log(z.random(800, 20)); // 357, 512, 316, ...
console.log(z.random(-500, 300)); // -398, -403, 141, ...
``` 

### z.setCookie ( name, value, days )

```
void z.setCookie ( str:name, str:value, number:days )
```

Create a cookie which expires after the given number of days.
 
 
Example
```js
z.setCookie("my-cookie", "hello", 7);
``` 



### z.setData ( el, key, value )

```
void z.setData ( domElement:element, string:key, mixed:value )
```

A zStore property is attached to the given element if not there already.

Set the (given) key property in the zStore with a value of (given) value.
 
 
Note: this method comes along with the z.getData method counterpart.
 
Example
```js
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>z.setData/getData demo</title>
	<script src="zquery/zquery.js"></script>
</head>

<body>
<button id="hi">Hi</button>
<script>


	var btn = document.getElementById('hi');
	z.setData(btn, "number", 49);
	console.log(z.getData(btn, "number")); // 49
	z.setData(btn, "string", "hello");
	console.log(z.getData(btn, "string")); // hello
	z.setData(btn, "object", {color: "red"});
	console.log(z.getData(btn, "object")); // {color: 'red'}


</script>
</body>
</html>
``` 




How to use the plugins
---------------


You know what's cool with a plugin? 
It's when you can chain it with a selector, like so:

```js
zz(".item").highlight(); // zz is not a typo, continue reading... 
```

So Zquery has a small mechanism that allows just that, it's called the plugin core,
and you will find the code in the plugins/plugins-core.js file.

You need to paste the plugins-core.js content to your zquery in order to use plugins.

Then, you can use the special method double z (zz), which passes the matching elements (using the 
simple querySelectorAll method) to the plugin method.



### Use a context
To make your selection faster, you can provide a context argument to the zz method, like so:

```js
var container = document.getElementById("myContainer");
zz(".item", container).highlight();  // search for .item elements inside container
```



Where are the plugins?
-------------------------

- https://github.com/lingtalfi/z-ripple




Discussion
----------------
The goal of zquery is to factorize the most common methods used by a developer in a lightweight javascript file.






History Log
------------------
    
- 1.15.0 -- 2016-12-21

    - add setCookie, getCookie and deleteCookie methods

- 1.14.0 -- 2016-11-18

    - add ajaxGet method

- 1.13.0 -- 2016-10-10

    - add getBcr method
    
- 1.12.0 -- 2016-10-10

    - add getData and setData methods
    
- 1.11.0 -- 2016-10-09

    - add random method
    
- 1.10.0 -- 2016-10-09

    - add template method
    
- 1.9.0 -- 2016-10-08

    - add viewportWidth and viewportHeight methods
    
- 1.8.0 -- 2016-10-08

    - add id method
    
- 1.7.0 -- 2016-10-08

    - add position method
    
- 1.6.1 -- 2016-10-07

    - reforge clone method, removed isFunction and isPlainObject dependencies
    
- 1.6.0 -- 2016-10-07

    - add isFunction, isPlainObject and clone methods
     
- 1.5.3 -- 2016-10-06

    - fix bug and bad code example in dispatchify and demo
     
    
- 1.5.2 -- 2016-10-06

    - fix bad code example in dispatchify demo
     
    
- 1.5.1 -- 2016-10-06

    - keyboardEventKey polyfill now returns "Unidentified" when the key is unknown
    
- 1.5.0 -- 2016-10-06

    - add keyboardEventKey polyfill
    - rename closest.js to closest-polyfill.js
    
- 1.4.0 -- 2016-10-05

    - add z.closest method
    - fix z.dispatchify for modern cross browsers compatibility
    
- 1.3.0 -- 2016-10-05

    - add z.dispatchify method
    
- 1.2.0 -- 2016-09-27

    - add z.debounce method

- 1.1.0 -- 2016-09-25

    - add context for z and zz methods
    
- 1.0.0 -- 2016-09-20

    - initial commit
    
    