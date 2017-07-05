(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .directive('chatservicerButton', [

            function () {

                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/assets/chatservicer-button/views/directives/chatservicer-button.htm',
                    controller: 'akit.component.chatservicerButton.chatservicerButtonController',
                    controllerAs: 'chatservicer',
                    scope: {
                        entitykey: '@'
                    },
                    link: function (scope, element, attrs, ctrl) {
                        function updateChatButton() {
                            if (ctrl.popupOpen) ctrl.popupOpen = false;
                        }

                        function initialize() {
                            ctrl.getChatAvailability();
                            updateChatButton();
                        }

                        scope.$watch('chatservicer.available', function onAvailabiltyChange(newValue, oldValue) {
                            var availabilityChanged = newValue !== oldValue && !ctrl.occupied;
                            var availableAndOccupied = newValue !== oldValue && newValue === true && ctrl.occupied;
                            if ((availabilityChanged) || (availableAndOccupied)) {
                                updateChatButton();
                            }
                        });

                        scope.$on('$destroy', function () {
                            ctrl.cancelPoll();
                        });

                        initialize();
                    }
                };

            }
        ]);

})(window.angular);
