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
                        pinnedtext: '@?',
                        placeholder: '@?',
                        delay: '@?',
                        height: '=?',
                        width: '=?',
                        initialmessage: '@?',
                        avatar: '@?'
                    },
                    link: function (scope, element, attrs, ctrl) {

                    }
                };

            }
        ]);

// @ts-ignore
})(window.angular);
