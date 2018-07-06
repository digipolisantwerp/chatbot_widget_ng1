(function (ng) {
    'use strict';

    // based on https://stackoverflow.com/a/14837021/20980
    // <input focusFrom="focusMyInput"> will be focused
    // when this.focusMyInput is set to true in the controller
    // and will then set this.focusMyInput to false

    ng
        .module('akit.component.chatbotWidget')
        .directive('focusFrom', ['$timeout', '$parse', function ($timeout, $parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.focusFrom, function (value) {
                        if (value) {
                            $timeout(function () {
                                element[0].focus();
                            });
                            scope.$parent[attrs.focusFrom] = false;
                        }
                    });
                }
            };
        }]);

})(window.angular);
