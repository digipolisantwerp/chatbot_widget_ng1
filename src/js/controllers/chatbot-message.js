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
