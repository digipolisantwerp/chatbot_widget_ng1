(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget')
        .directive('auiChatbotMessage', [
            '$timeout',
            '$window',
            function (
                $timeout,
                $window
            ) {

                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: '/assets/chatbot-widget/views/directives/chatbot-message.htm',
                    controller: 'akit.component.chatbotWidget.chatbotMessageController',
                    controllerAs: 'msg',
                    scope: {
                        data: '='
                    }
                };

            }
        ]);

})(window.angular);
