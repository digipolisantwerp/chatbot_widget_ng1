(function (ng) {
    "use strict";

    ng.module("akit.component.chatbotWidget").controller(
        "akit.component.chatbotWidget.chatbotWidgetController",
        [
            "$scope",
            "$timeout",
            "akit.component.chatbotWidget.chatbotService",
            function ($scope, $timeout, chatbotService) {
                // ensure we have default values
                this.pinned = ($scope.pinned === "false") ? false : !!$scope.pinned;
                this.pinnedText = $scope.pinnedText || "Een vraag stellen";
                this.placeholder = $scope.placeholder || "";
                this.delay = $scope.delay || 400;
                this.height = $scope.height || 400;
                this.title = $scope.title || "";
                this.session = $scope.session;

                // set to true to focus the text entry field
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

                vm.sendMessage = function () {
                    if (!vm.message.message) {
                        return;
                    }

                    // Start loader
                    vm.isLoading = true;

                    // Add to data
                    vm.addToChat(vm.message);

                    // Send new data
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

                    // Clean
                    this.message.message = "";

                    // Focus
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

                vm.sendReply = function (event) {
                    vm.message.message = event.message;
                    vm.sendMessage();
                };

                vm.onInputKey = function (event) {
                    if (event.which === 13) {
                        vm.sendMessage();
                    }
                };

                // listen to click events of child <aui-chatbot-message> directives
                $scope.$on('chatbotMessageReplyClicked', vm.sendReply);

                vm.addToChat = function (message) {
                    var newData = [].concat(vm.data, [
                        Object.assign({}, message)
                    ]);
                    this.data = newData;
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
            }
        ]
    );
})(window.angular);
