(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .directive('chatservicerButton', [

            function ($location, $timeout) {

                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/assets/chatservicer-button/views/directives/chatservicer-button.htm',
                    controller: 'akit.component.chatservicerButton.chatservicerButtonController',
                    link: function ($scope, element, attrs) {

                    }
                };

            }
        ]);

})(window.angular);