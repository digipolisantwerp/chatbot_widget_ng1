(function (ng) {
    'use strict';

    ng
        .module('chatservicerButton', ['akit.component.chatservicerButton'])
        .controller('chatservicerButtonCtrl', [
            '$scope',
            function ($scope) {
                function switchAvailability() {
                    var available = angular.element(document.querySelector('.chatservicer-button')).scope().chatservicer.available;
                    angular.element(document.querySelector('.chatservicer-button')).scope().chatservicer.available = !available;
                }

                $scope.switchAvailability = switchAvailability;
            }
        ]);

})(window.angular);