/*
 * @autor Anton Mirochnichenko
 * @library FightCustomLib v.0.0.1
 * @description This a simple unility library, he constrain usefull function's
 * 
 */

// Define Name space

Fight = function() {

/*
 * @function Extend
 * @description This funciton made a class inheritance.
 */

function extend(Child, Parent) {
//Child prototype
    var C = function() {}
    C.prototype = Child.prototype;
// Use 
    Child.prototype = new Parent();

    propertyFoundation(Child, C);
// Set constructor and superclass
    Child.prototype.constructor = Child;
    Child.superclass = Parent;
}

/*
 * @function PropertyFoundation
 * @description Utility @Extend function
 */

function propertyFoundation(Child, Member) {
    for (var prop in Member.prototype) {
        Child.prototype[prop] = Member.prototype[prop];
    }
}

/*
 * @function isEmpty
 * @description Check variable on empty
 */

function isEmpty(mixed_var) {	// Determine whether a variable is empty
	return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  (isArray(mixed_var) && mixed_var.length === 0 ) );
}

/*
 * @function isArray
 * @description Check, that is array? or not?
 */

function isArray(mixed_var) {
        return (typeof(mixed_var) == 'object' && mixed_var instanceof Array);
}

/*
 * @function Include
 * @description This function is analog php include function
 */

function include(filename) {	
         // The include() statement includes and evaluates the specified file.

	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', filename);
	js.setAttribute('defer', 'defer');
	document.getElementsByTagName('HEAD')[0].appendChild(js);

	// save include state for reference by include_once
	var cur_file = {};
	cur_file[window.location.href] = 1;

	if (!window.php_js) window.php_js = {};
	if (!window.php_js.includes) window.php_js.includes = cur_file;
	if (!window.php_js.includes[filename]) {
		window.php_js.includes[filename] = 1;
	} else {
		window.php_js.includes[filename]++;
	}

	return window.php_js.includes[filename];
}

/*
 * @function Each
 * @description This is analog php-function foreach
 */

function each(data, callback){ 
  for(var key in data){
    if(data.hasOwnProperty(key)){
      callback(key, data[key]);
    }
  }
}

/*
 * 
 * @function addEvent
 * @description add the Fight prepend event's
 */

function addEvent(name,callback) {
    switch(name) {
        case 'wheel':
            addHandler(window, 'DOMMouseScroll', callback);
            addHandler(window, 'mousewheel', callback);
            addHandler(document, 'mousewheel', callback); 
                break;
        
    }
    
}

/*
 * @function addHendler
 * @description add the Custom Event Handler
 */

function addHandler(object, event, handler) {
    if (object.addEventListener) {
        object.addEventListener(event, handler, false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Add handler is not supported");
}

/*
 * @function wheel
 * @description the Mouse Wheel Handler
 */

function getWheelDelta(event) {
        var delta; // Scroll direct
    // -1 - down
    // 1  - up
    event = event || window.event;
    // IE and Opera work with a wheelDelta propperty
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        // In Opera
        if (window.opera) delta = -delta;
    // Geko
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    // Denied the default browser action
    if (event.preventDefault)  event.preventDefault();

    return delta;
}

return {
    extend:extend,
    isEmpty: isEmpty,
    isArray: isArray,
    include: include,
    each: each,
    addEvent: addEvent,
    getWheelDelta: getWheelDelta
}

}();

