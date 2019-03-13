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
                this.pinnedtext = $scope.pinnedtext || "Een vraag stellen";
                this.placeholder = $scope.placeholder || "";
                this.delay = $scope.delay || 400;
                this.title = $scope.title || "";
                this.avatar = $scope.avatar || "https://cdn.antwerpen.be/core_branding_favicons/chatbot/a-chat.svg";
                this.session = $scope.session;
                this.initialmessage = $scope.initialmessage || "STARTCOMMANDO";
                // $scope.height is used directly (two-way binding)
                // $scope.width is used directly (two-way binding)

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
                vm.loadingIndex = false;

                vm.sendMessage = function (messageText, hidden) {
                    if (messageText) vm.message.message = messageText;
                    // user did not type a message && we aren't sending this programmatically
                    if (!vm.message.message && !hidden) {
                        return;
                    }

                    // Start loader
                    vm.isLoading = true;

                    // Add to data
                    if (!hidden) vm.addToChat(vm.message);

                    // Send new data
                    chatbotService
                        .sendMessage($scope.url, vm.message)
                        .then(
                            function (result) {
                                if (result.data) {
                                    result.data.forEach(function (item, index, res) {
                                        vm.loadingIndex = index;
                                        vm.isLoading = true;
                                        $timeout(function () {
                                            if (index === 0) {
                                                item.avatar = vm.avatar;
                                            }
                                            vm.addToChat(item);
                                            if (index === res.length - 1) {
                                                vm.loadingIndex = null;
                                                vm.isLoading = false;
                                            }
                                        }, index * vm.delay);
                                    });
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

                vm.sendReply = function (event, data) {
                    vm.sendMessage(data.message);
                };

                vm.onInputKey = function (event) {
                    if (event.which === 13) {
                        vm.sendMessage();
                    }
                };

                // listen to click events of child <aui-chatbot-message> directives
                $scope.$on('chatbotMessageReplyClicked', vm.sendReply);

                vm.addToChat = function (message) {
                    if (message.type === "text" && message.message === "") {
                        // ignore blank messages
                        // welcome message must not be shown if it is the empty string
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

                // request opening message from chatbot
                vm.sendMessage(this.initialmessage, true);
            }
        ]
    );
// @ts-ignore
})(window.angular);
