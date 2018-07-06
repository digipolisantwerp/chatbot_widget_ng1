(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget')
        .directive('auiChatbotWidget', [
            function () {

                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/assets/chatbot-widget/views/directives/chatbot-widget.htm',
                    controller: 'akit.component.chatbotWidget.chatbotWidgetController',
                    controllerAs: 'chatbot',
                    scope: {
                        url: '@',
                        session: '@',
                        title: '@',
                        pinned: '@?',
                        pinnedText: '@?',
                        placeholder: '@?',
                        delay: '@?',
                        height: '@?'
                    },
                    link: function (scope, element, attrs, ctrl) {

                    }
                };

            }
        ]);

})(window.angular);
