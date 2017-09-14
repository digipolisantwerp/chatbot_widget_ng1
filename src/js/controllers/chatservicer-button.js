(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .controller('akit.component.chatservicerButton.chatservicerButtonController', [
            '$scope',
            '$timeout',
            'akit.component.chatservicerButto.chatproxyService',
            function (
                $scope,
                $timeout,
                chatproxyService
            ) {
                var vm = this;

                var pollTime = 2000;
                var errorCount = 0;
                var pollPromise;

                vm.chatWindow = {
                    closed: true
                };
                vm.available;
                vm.disabled = false;
                vm.occupied = false;
                vm.popupOpen = false;

                function getChatAvailability() {
                    chatproxyService.getAvailability($scope.entitykey)
                        .then(function (response) {
                            vm.available = response.data.available;

                            errorCount = 0;
                            nextPoll();
                        })
                        .catch(function (response) {
                            vm.available = false;

                            errorCount += 1;
                            nextPoll(errorCount * 2 * pollTime);
                        });
                }

                function nextPoll(delay) {
                    delay = delay || pollTime;

                    // Clear last timeout before starting a new one
                    cancelPoll();
                    pollPromise = $timeout(getChatAvailability, delay);
                }

                function cancelPoll() {
                    $timeout.cancel(pollPromise);
                }

                function getChatURL() {
                    return chatproxyService
                        .getChatURL($scope.entitykey);
                }

                function clickHandler(available) {
                    var windowName = 'chatservicer_window';
                    var windowFeatures = 'width=640,height=480,resizable,scrollbars=yes,status=1';

                    var windowUrl = $scope.urlWhenUnavailable || "";
                    if (!available) {
                        window.open(windowUrl, "_blank");
                        return;
                    }

                    // Check if a chat window is already open
                    if (!vm.chatWindow.closed) {
                        // if so focus back on the window and end here
                        vm.chatWindow.focus();
                        return;
                    } else {
                        vm.disabled = false;
                    }

                    getChatURL()
                        .then(function (result) {
                            var chatUrlAvailable = result.data.url;

                            // Chat is available
                            if (chatUrlAvailable) {
                                // Chat agent is also available => Stop polling + open window with chat url
                                cancelPoll();

                                var windowURL = chatUrlAvailable;

                                vm.chatWindow = window.open(windowURL, windowName, windowFeatures);
                                vm.disabled = true;
                            } else {
                                // Chat agents are all occupied => show popup with message + set chat availability to false
                                vm.occupied = true;
                                vm.popupOpen = !vm.popupOpen;
                                vm.available = false;

                                // Restart polling after 5 seconds to avoid closing of popup when availability changes
                                nextPoll(5000);
                            }
                        });
                }

                vm.clickHandler = clickHandler;
                vm.nextPoll = nextPoll;
                vm.cancelPoll = cancelPoll;
                vm.getChatAvailability = getChatAvailability;
            }
        ]);

})(window.angular);
