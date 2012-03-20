/*jslint indent: 4*/
/*globals TestCase, assertTrue, assertFalse*/
Boolean.prototype.not = function () {
    "use strict";
    return !this;
};

TestCase("UseStrictTest", {
    "test should flip value of true": function () {
        assertFalse(true.not());
        assertFalse(Boolean.prototype.not.call(true));
    },

    /* WHATTODO: Does not work in IE (maybe in IE10...)
     "test should flip value of false": function () {
     // Without "use strict", both fail, false.not() == false
     assertTrue(false.not());
     assertTrue(Boolean.prototype.not.call(false));
     }
     */
});
