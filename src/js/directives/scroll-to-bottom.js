(function (ng) {
    'use strict';

    // based on https://stackoverflow.com/a/40164638/20980

    ng
        .module('akit.component.chatbotWidget')
        .directive('scrollToBottom', function ($timeout, $window) {
            return {
                scope: {
                    scrollToBottom: "="
                },
                restrict: 'A',
                link: function (scope, element, attr) {
                    scope.$watchCollection('scrollToBottom', function (newVal) {
                        if (newVal) {
                            $timeout(function () {
                                element[0].scrollTop =  element[0].scrollHeight;
                            }, 0);
                        }
                    });
                }
            };
        });

})(window.angular);
