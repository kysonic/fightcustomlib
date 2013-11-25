/*
 * @autor Anton Mirochnichenko
 * @library FightDomArchitect v.0.0.1
 * @description Simple Dom Architect.
 *
 */

// Define Name space

arch = function () {
    // Global Return Object
    var obj = new Object();
    // Array of HTML Dom elements for a hierarchy
    obj.e = null;
    obj.currentElement = null;
    obj.firstTime = true;
    // Initialize - need for a define all functions for create DOM
    obj.initialize = function () {
        // Available tags
        var tags = [
            'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside',
            'audio', 'b', 'base', 'br', 'button', 'canvas', 'div', 'fieldset', 'form',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'input', 'label', 'legend',
            'li', 'ol', 'optgroup', 'option', 'p', 'pre', 'select',
            'span', 'strong', 'table', 'tbody', 'td', 'textarea',
            'tfoot', 'th', 'thead', 'tr', 'tt', 'ul' ];
        for (var i = tags.length - 1; i >= 0; i--) {
            obj.defineTag(tags[i]);
        }
    }
// Define tag function
    obj.defineTag = function (tag) {
        obj[tag] = function () {
            return obj.createNode(tag, arguments);
        }
    };
// Create element Node function
    obj.createNode = function (tag, args) {
        var fix = { 'cls': 'class', 'Cls': 'class' };
        var e = null;
        try {
            var attrs = args[0] || {};
            e = document.createElement(tag);
            Fight.each(attrs, function (key, value) {
                Fight.each(fix, function (fixKey, fixValue) {
                    if (fixKey == key) key = fixValue;
                });
                e.setAttribute(key, value);
            });

            for (var i = 1; i < args.length; i++) {
                var arg = args[i];
                if (arg == null) continue;
                if (arg.constructor != Array) append(arg);
                else for (var j = 0; j < arg.length; j++)
                    append(arg[j]);
            }
        }

        catch (ex) {
            console.log('Sorry! Fight Dom Architect is collapsed. He can not create <' + tag + '> element:\n Error>>> \n ' + ex);
            e = null;
        }

        function append(arg) {
            if (arg == null) return;
            var c = arg.constructor;
            switch (typeof arg) {
                case 'number':
                    arg = '' + arg;
                case 'string':
                    arg = document.createTextNode(arg);
            }
            e.appendChild(arg);
        }

        return e;
    };

    // Define function need us in case of two and more in time dom element work
    obj.define = function (arg) {
        console.log(arg);
        if (obj.e == null) {
            obj.e=arg;
        }

    }
    //
    obj.clear = function () {
        obj.e = null;
    }
    // Append function need for a adding element to global object
    obj.append = function (arg) {
        if (arg == null) return;
        var c = arg.constructor;
        switch (typeof arg) {
            case 'number':
                arg = '' + arg;
            case 'string':
                arg = document.createTextNode(arg);
        }
        try{
            if(obj.e.hasChildNodes()){
                obj.currentElement.appendChild(arg);
                obj.currentElement=arg;
            }
            else{
                obj.e.appendChild(arg);
                obj.currentElement = arg;
            }
        }
        catch (ex) {
            console.log('Sorry! Fight Dom Architect is collapsed. :\n Error>>> \n ' + ex);
        }
    }
    // Append function need for a adding element to global object on current level
    obj.beside = function (arg) {
        if (arg == null) return;
        var c = arg.constructor;
        switch (typeof arg) {
            case 'number':
                arg = '' + arg;
            case 'string':
                arg = document.createTextNode(arg);
        }
        try{
            if(obj.e.hasChildNodes()){
                obj.currentElement.parentNode.appendChild(arg);
                obj.currentElement=arg;
            }
            else{
                obj.e.appendChild(arg);
                obj.currentElement = arg;
            }
        }
        catch (ex) {
            console.log('Sorry! Fight Dom Architect is collapsed. :\n Error>>> \n ' + ex);
        }
    }
    // Smart beside function - in first time append child
    obj.apside = function (arg) {
        if (arg == null) return;
        var c = arg.constructor;
        switch (typeof arg) {
            case 'number':
                arg = '' + arg;
            case 'string':
                arg = document.createTextNode(arg);
        }
        try{
            if(obj.e.hasChildNodes()){
                if(obj.firstTime) {
                    obj.currentElement.appendChild(arg);
                    obj.firstTime= false;
                    obj.currentElement=arg;
                } else {
                    obj.currentElement.parentNode.appendChild(arg);
                    obj.currentElement=arg;
                }
            }
            else{
                obj.e.appendChild(arg);
                obj.currentElement = arg;
            }
        }
        catch (ex) {
            console.log('Sorry! Fight Dom Architect is collapsed. :\n Error>>> \n ' + ex);
        }
    }
    // Append element in parent Node
    obj.parent = function (arg) {
        if (arg == null) return;
        var c = arg.constructor;
        switch (typeof arg) {
            case 'number':
                arg = '' + arg;
            case 'string':
                arg = document.createTextNode(arg);
        }
        try{
            if(obj.e.hasChildNodes() && obj.e.childNodes.length>=1){
                obj.currentElement.parentNode.parentNode.appendChild(arg);
                obj.currentElement=arg;
                obj.firstTime = true;
            }
        }
        catch (ex) {
            console.log('Sorry! Fight Dom Architect is collapsed. :\n Error>>> \n ' + ex);
        }
    }
    // Up upon node grind structure
    obj.up = function() {
        obj.currentElement =obj.currentElement.parentNode;
        obj.firstTime = true;
    }
    // Down by node grind structure
    obj.down = function() {
        obj.currentElement =obj.currentElement.childNodes[0];
    }
    // Get View

    obj.render = function () {
        return obj.e.outerHTML;
    }

    return obj;
}();

