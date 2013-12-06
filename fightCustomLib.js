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

/*
* function parseNum
* description This function parse number of type
* 
*/

    function parseNum(number) {
        return parseInt(number.replace(/\D+/g, ""));
    }
 /*
     * function fTest
     * description JS Test analog
     */
    function fTest(validate,regex){
        return !isEmpty(validate.match(regex));
    }
    /*
     * function parseNum
     * description This function parse number of type
     * validateRules notEmpty, numeric, string, customRegExp
     * 
     */

    function validate(validate, validateRules) {
        var isValid = true;
        var validate = validate.toString();
        //console.log(validate);
        each(validateRules, function(key, value) {
            switch (value) {
                case 'notEmpty':
                    if (isValid)
                        isValid = !isEmpty(validate);
                    break;
                case 'numeric':
                    if (isValid)
                       isValid = fTest(validate,/\d+/i);
                    break;
                case 'string':
                    if (isValid)
                        isValid = fTest(validate,/\W+/i);
                    break;
                default:
                    // RegExp
                    if (isValid)
                        isValid = validate.test(value);
                    break;
            }

        });
        
        return isValid;
    }

/*
 * function getBaseUrl
 * description Return site base url
 * depth int 1 or 2 - 1 if domain name is unary, 2 - binary .... 
 */
function getBaseUrl(depth) {
    try {
        var url = location.href;

        var start = url.indexOf('//');
        if (start < 0)
            start = 0 
        else 
            start = start + 2;
        
        var end = url.indexOf('/', start+start*depth);
        if (end < 0) end = url.length - start;

        var baseURL = url.substring(start, end);
        return baseURL;
    }
    catch (arg) {
        return null;
    }
}

function isFunc(object) {
	return !!(object && object.constructor && object.call && object.apply);
}

function isObj(object) {
	 var objectTypes = {
            'boolean': false,
            'function': true,
            'object': true,
            'number': false,
            'string': false,
            'undefined': false
        };
        // check if the value is the ECMAScript language type of Object
        // http://es5.github.io/#x8
        // and avoid a V8 bug
        // http://code.google.com/p/v8/issues/detail?id=2291
        return !!(value && objectTypes[typeof value]);
}

// placer is object to parse
function tplMaster (html, placer) {
        var
          tpl = html;
        for (key in placer) {
            if (placer.hasOwnProperty(key)) {
                if (helper.isObj(placer[key])) {
                    for (subkey in placer[key]) {
                        if (placer[key].hasOwnProperty(subkey)) {
                            var reg = new RegExp('{{ ' + key + '.' + subkey + ' }}', 'ig');
                            tpl = tpl.replace(reg, placer[key][subkey]);
                        }
                    }
                }
                var reg = new RegExp('{{ ' + key + ' }}', 'ig');
                tpl = tpl.replace(reg, placer[key]);
            }
        }
        return tpl;
    };
	
    return {
        extend: extend,
        isEmpty: isEmpty,
        isFunc: isFunc,
        isObj: isObj,
        isArray: isArray,
        include: include,
        each: each,
        getBaseUrl:getBaseUrl,
        addEvent: addEvent,
        parseNum: parseNum,
        getWheelDelta: getWheelDelta,
        validate: validate
    }


}();

