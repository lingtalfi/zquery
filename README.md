Zquery
=============
2016-09-20


A customized javascript library for your projects.


Features
-------------
- composable library (it only includes what you need), which means it can be ridiculously small 
- all functions are compatible with at least ie11+, and other modern browsers (excluding opera mini) 




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
Array z (str:selector, ?domEl:context)
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


Events
----------

### z.debounce ( func, wait )

```
function z.debounce (function:func, number:wait)
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
void z.dispatchify (instance:obj, Class:Object)
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


Styles
----------

### z.offset ( el )

```
Object z.offset (domElement:el)
```
Returns an object containing the top and left properties, two numbers which represent the position of the given element
relative to the document.
 
 
Example
```js
// gets the top and left position of the element ".special" relative to the whole document 
var info = z.offset(document.querySelector(".special"));
console.log(info.top, info.left, info);  
``` 



Traversing
----------

### domElement.closest ( selector )

```
null|domElement domElement.closest (string:selector)
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
    
    