(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .directive('chatservicerButton', [
            '$timeout',
            '$window',
            function (
                $timeout,
                $window
            ) {

                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/assets/chatservicer-button/views/directives/chatservicer-button.htm',
                    controller: 'akit.component.chatservicerButton.chatservicerButtonController',
                    controllerAs: 'chatservicer',
                    scope: {
                        entitykey: '@',
                        urlWhenUnavailable: '@',
                        availabilityServiceUrl: '@',
                        buttonText: '@',
                        buttonTextNoAgent: '@',
                        getLinkServiceUrl: '@'
                    },
                    link: function (scope, element, attrs, ctrl) {

                        function initialize() {
                            ctrl.getChatAvailability();
                        }

                        scope.$watch('chatservicer.available', function onAvailabiltyChange(newValue, oldValue) {
                            if (newValue !== oldValue && !ctrl.disabled) {
                                if (!ctrl.occupied || (ctrl.occupied && newValue === true)) {
                                    ctrl.nextPoll(2000);
                                }
                            }
                        });

                        scope.$on('$destroy', function () {
                            // Close chat window and cancel polling if scope is destroyed
                            if (!ctrl.chatWindow.closed) {
                                ctrl.chatWindow.close();
                            }
                            ctrl.cancelPoll();
                        });

                        $window.addEventListener('focus', function () {
                            // Had to wrap in timeout because chatwindow.closed wasn't
                            // being set directly to false when it was closed in Firefox
                            $timeout(function () {
                                if (ctrl.chatWindow.closed) {
                                    ctrl.disabled = false;
                                    ctrl.nextPoll();
                                }
                            });
                        });

                        initialize();
                    }
                };

            }
        ]);

})(window.angular);
