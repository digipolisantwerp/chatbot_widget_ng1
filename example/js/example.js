(function (ng) {
    'use strict';

    ng
        .module('chatservicerButton', ['akit.component.chatservicerButton'])
        .controller('chatservicerButtonCtrl', [
            '$scope',
            function ($scope) {
                function switchAvailability() {
                    var available = ng.element(document.querySelector('.button.has-icon')).scope().chatservicer.available;
                    ng.element(document.querySelector('.button.has-icon')).scope().chatservicer.available = !available;
                }

                $scope.switchAvailability = switchAvailability;
            }
        ]);

    })(window.angular);
