
/**
 * Defining escape directive.
 * It executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
app.directive('dirEscape', function () {
    'use strict';
	var ESCAPE_KEY = 27;

	return function (scope, elem, attrs) {
        console.log("ESCAPE DIR: function scope, elem, attrs");
	    elem.bind('keydown', function (event) {
 			if (event.keyCode === ESCAPE_KEY) {
                console.log("ESCAPE DIR: function event");
 				scope.$apply(attrs.dirEscape);
 			}
 		});

 		scope.$on('$destroy', function () {
            console.log("ESCAPE DIR: scope.$onDestroy");
 			elem.unbind('keydown');
 		});
 	};
});
