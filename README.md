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

### z ( selector )

```
Array z (str:selector)
```
z performs a document.querySelectorAll request, and returns an Array containing the dom elements that matched.
 
 
Example
```js
// select all elements with css class "item" and set their background color to red
z('.item').forEach(function (el) {
    el.style.background = "red";
});
``` 


Offset (styles/offset.js file)
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



Where are the plugins?
-------------------------

- https://github.com/lingtalfi/z-ripple




Discussion
----------------
The goal of zquery is to factorize the most common methods used by a developer in a lightweight javascript file.






History Log
------------------
    
- 1.0.0 -- 2016-09-20

    - initial commit
    
    