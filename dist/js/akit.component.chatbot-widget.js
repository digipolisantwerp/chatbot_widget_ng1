(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget', []);

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget', []);

})(window.angular);

(function (ng) {
    "use strict";

    ng.module("akit.component.chatbotWidget").controller(
        "akit.component.chatbotWidget.chatbotMessageController",
        [
            "$scope",
            "$timeout",
            function ($scope) {
                this.data = $scope.data || { hide: true };

                this.sendReply = function (message) {
                    $scope.$emit('chatbotMessageReplyClicked', { message: message });
                    $scope.data.hide = true;
                };
            }
        ]
    );
})(window.angular);

(function (ng) {
    "use strict";

    ng.module("akit.component.chatbotWidget").controller(
        "akit.component.chatbotWidget.chatbotWidgetController",
        [
            "$scope",
            "$timeout",
            "akit.component.chatbotWidget.chatbotService",
            function ($scope, $timeout, chatbotService) {
                this.pinned = ($scope.pinned === "false") ? false : !!$scope.pinned;
                this.pinnedtext = $scope.pinnedtext || "Een vraag stellen";
                this.placeholder = $scope.placeholder || "";
                this.delay = $scope.delay || 400;
                this.title = $scope.title || "";
                this.session = $scope.session;
                this.initialmessage = $scope.initialmessage || "STARTCOMMANDO";

                $scope.focusTextInput = false;

                var vm = this;
                vm.data = [];
                vm.message = {
                    session_id: this.session,
                    message: "",
                    type: "text",
                    send: true
                };
                vm.isLoading = false;
                vm.isOpen = false;

                vm.sendMessage = function (messageText, hidden) {
                    if (messageText) vm.message.message = messageText;
                    if (!vm.message.message && !hidden) {
                        return;
                    }

                    vm.isLoading = true;

                    if (!hidden) vm.addToChat(vm.message);

                    chatbotService
                        .sendMessage($scope.url, vm.message)
                        .then(
                            function (result) {
                                if (result.data) {
                                    result.data.forEach(function (item, index) {
                                        $timeout(function () {
                                            vm.addToChat(item);
                                        }, index * vm.delay);
                                    });
                                    vm.isLoading = false;
                                } else {
                                    throw new Error("no data returned from service");
                                }
                            }
                        ).catch(
                            function (error) {
                                vm.pushError(error);
                                vm.isLoading = false;
                            }
                        );

                    this.message.message = "";

                    $scope.focusTextInput = true;
                };

                vm.toggleChatbot = function () {
                    this.isOpen = !this.isOpen;
                    if (this.isOpen) {
                        $timeout(function () {
                            $scope.focusTextInput = true;
                        });
                    }
                };

                vm.sendReply = function (event, data) {
                    vm.sendMessage(data.message);
                };

                vm.onInputKey = function (event) {
                    if (event.which === 13) {
                        vm.sendMessage();
                    }
                };

                $scope.$on('chatbotMessageReplyClicked', vm.sendReply);

                vm.addToChat = function (message) {
                    if (message.type === "text" && message.message === "") {
                    } else {
                        var newData = [].concat(vm.data, [
                            Object.assign({}, message)
                        ]);
                        this.data = newData;
                    }
                };

                vm.pushError = function (error) {
                    var errorMessage = {
                        message:
                            "Error " +
                            error.status +
                            " - " +
                            error.statusText +
                            ": " +
                            error.error.title,
                        type: "error"
                    };
                    this.addToChat(errorMessage);
                };

                vm.sendMessage(this.initialmessage, true);
            }
        ]
    );
})(window.angular);

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
                        initialmessage: '@?'
                    },
                    link: function (scope, element, attrs, ctrl) {

                    }
                };

            }
        ]);

})(window.angular);

(function (ng) {
    'use strict';


    ng
        .module('akit.component.chatbotWidget')
        .directive('focusFrom', ['$timeout', '$parse', function ($timeout, $parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.focusFrom, function (value) {
                        if (value) {
                            $timeout(function () {
                                element[0].focus();
                            });
                            scope.$parent[attrs.focusFrom] = false;
                        }
                    });
                }
            };
        }]);

})(window.angular);

(function (ng) {
    'use strict';


    ng
        .module('akit.component.chatbotWidget')
        .directive('scrollToBottom', function ($timeout, $window) {
            return {
                scope: {
                    scrollToBottom: "="
                },
                restrict: 'A',
                link: function (scope, element, attr) {
                    scope.$watchCollection('scrollToBottom', function (newVal) {
                        if (newVal) {
                            $timeout(function () {
                                element[0].scrollTop =  element[0].scrollHeight;
                            }, 0);
                        }
                    });
                }
            };
        });

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget')
        .service('akit.component.chatbotWidget.chatbotService', [
            '$http',
            '$interval',
            '$q',
            function ($http) {

                var API = {};

                function sendMessage(url, message) {
                    return $http.post(url, Object.assign({}, message)).then(
                        function (response) {
                            var result = response.data;
                            if (result.quickReplies) {
                                result.data.push({
                                    type: 'radio',
                                    message: '',
                                    elements: result.quickReplies.map(function (item) {
                                        return {
                                            text: item.text,
                                            replyText: item.action
                                        };
                                    })
                                });
                            }
                            return result;
                        }
                    );
                }

                API.sendMessage = sendMessage;

                return API;

            }
        ]);

})(window.angular);

angular.module("akit.component.chatbotWidget").run(["$templateCache", function($templateCache) {$templateCache.put("/assets/chatbot-widget/views/directives/chatbot-message.htm","<div><div class=\"m-message\" ng-if=\"!msg.data.hide\"><div ng-switch=\"msg.data.type\" ng-class=\"{\'m-message--right\': msg.data.send, \'m-message--center\': msg.data.type === \'radio\' || msg.data.type === \'error\'}\" class=\"m-message__content\" tabindex=\"0\"><span ng-switch-when=\"text\" class=\"m-message__text\">{{ msg.data.message }}</span><span ng-switch-when=\"url\" class=\"m-message__url\"><a ng-href=\"{{ msg.data.url }}\" target=\"_blank\" rel=\"external\">{{ msg.data.message }}</a></span><span ng-switch-when=\"image\" class=\"m-message__image\"><img ng-src=\"{{ msg.data.image }}\"></span><span ng-switch-when=\"radio\" class=\"m-message__radio\"><ng-container ng-repeat=\"element in msg.data.elements\"><button ng-click=\"msg.sendReply(element.replyText)\" class=\"button a-button a-button--small\">{{ element.text }}</button></ng-container></span><span ng-switch-when=\"error\" class=\"m-message__error u-text-danger\">{{ msg.data.message }}</span></div></div></div>");
$templateCache.put("/assets/chatbot-widget/views/directives/chatbot-widget.htm","<div class=\"o-chatbot\" ng-class=\"{\'o-chatbot--pinned\': chatbot.pinned}\" ng-style=\"{\'height\':!chatbot.pinned ? height + \'px\' : \'\' }\"><div class=\"o-chatbot__content\" ng-if=\"!chatbot.pinned || (chatbot.pinned && chatbot.isOpen)\"><div class=\"o-chatbot__header bg-primary u-text-xlight\" ng-class=\"{\'o-chatbot__header--no-title\': !chatbot.title}\"><h6 class=\"h6 has-base-font u-text-bold u-margin-xs\" ng-if=\"chatbot.title\">{{ chatbot.title }}</h6><button class=\"button icon\" ng-if=\"chatbot.pinned\" ng-click=\"chatbot.toggleChatbot()\"><i class=\"fa fa-close\"></i></button></div><div class=\"o-chatbot__main\" scroll-to-bottom=\"chatbot.data\"><div ng-if=\"chatbot.data && (chatbot.data.length > 0)\" class=\"u-margin-xs\" aria-live=\"assertive\"><ng-container ng-repeat=\"message in chatbot.data\"><aui-chatbot-message data=\"message\"></aui-chatbot-message></ng-container><div ng-if=\"chatbot.isLoading\" class=\"o-chatbot__loader\"><span>...</span></div></div></div><div class=\"o-chatbot__footer\"><div class=\"o-chatbot__input\"><input type=\"text\" class=\"field\" name=\"chat-input\" autocomplete=\"off\" placeholder=\"{{ chatbot.placeholder }}\" focus-from=\"focusTextInput\" ng-model=\"chatbot.message.message\" ng-keypress=\"chatbot.onInputKey($event)\"><button type=\"submit\" class=\"button icon\" ng-click=\"chatbot.sendMessage()\"><i class=\"fa fa-chevron-right\"></i></button></div></div></div><div class=\"o-chatbot__buttons\" ng-if=\"chatbot.pinned && !chatbot.isOpen\"><button ng-click=\"chatbot.toggleChatbot()\" class=\"button has-icon\"><i class=\"fa fa-comments\"></i>{{ chatbot.pinnedtext }}</button></div></div>");}]);