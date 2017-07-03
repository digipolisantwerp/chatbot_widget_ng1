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
                    link: function ($scope, element, attrs, ctrl) {
                        function updateChatButton() {
                            if (ctrl.available) {
                                ctrl.buttonText = 'Chat met een medewerker';
                            } else {
                                ctrl.buttonText = 'Hulp nodig bij het invullen';
                            }
                        }

                        function initialize() {
                            updateChatButton();

                            $scope.$watch('chatservicer.available', function onAvailabiltyChange(newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    updateChatButton();
                                }
                            });
                        }

                        initialize();
                    }
                };

            }
        ]);

})(window.angular);
