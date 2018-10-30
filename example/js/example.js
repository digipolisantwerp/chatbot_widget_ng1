(function (ng) {
    'use strict';

    ng
        .module('chatbotWidget', ['akit.component.chatbotWidget'])
        .controller('chatbotWidgetCtrl', [
            '$scope',
            function ($scope) {
                // start new random sessions every time
                $scope.session1 = Math.random().toString(36).substring(7);
                $scope.session2 = Math.random().toString(36).substring(7);
            }
        ]);

// @ts-ignore
})(window.angular);
