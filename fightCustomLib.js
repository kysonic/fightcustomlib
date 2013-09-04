/*
 * @autor Anton Mirochnichenko
 * @library FightCustomLib v.0.0.1
 * @description This a simple unility library, he constrain usefull function's
 * 
 */

/*
 * @function Extend
 * @description This funciton made a class inheritance.
 */

function fExtend(Child, Parent) {
//Child prototype
    var C = function() {}
    C.prototype = Child.prototype;
// Use 
    Child.prototype = new Parent();

    fPropertyFoundation(Child, C);
// Set constructor and superclass
    Child.prototype.constructor = Child;
    Child.superclass = Parent;
}

/*
 * @function PropertyFoundation
 * @description Utility @Extend function
 */

function fPropertyFoundation(Child, Member) {
    for (var prop in Member.prototype) {
        Child.prototype[prop] = Member.prototype[prop];
    }
}

// LIB

