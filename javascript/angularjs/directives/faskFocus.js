TTBApp.directive('faskFocus', function faskFocus($timeout) {
    'use strict';
	return function (scope, elem, attrs) {
	    scope.$watch(attrs.faskFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
			    }, 0, false);
            }
        });
	};
});
