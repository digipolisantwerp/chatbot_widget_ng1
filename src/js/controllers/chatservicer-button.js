(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .controller('akit.component.chatservicerButton.chatservicerButtonController', [
            '$scope',
            '$timeout',
            'akit.component.chatservicerButto.chatproxyService',
            function ($scope, $timeout, chatproxyService) {
                var vm = this;

                var chatWindow;
                var pollTime = 1000;
                var errorCount = 0;
                var pollPromise;

                vm.available;
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

                function nextPoll(time) {
                    time = time || pollTime;

                    // Clear last timeout before starting a new one
                    cancelPoll();
                    pollPromise = $timeout(getChatAvailability, time);
                }

                function cancelPoll() {
                    $timeout.cancel(pollPromise);
                }

                // TODO: This will have to go
                // we will check if we get a url or not with getChatURL()
                function getChattersAvailability() {
                    var chatters = chatproxyService.getChatURL($scope.entitykey);
                    return chatters.success;
                }

                function getChatURL() {
                    var chatURL = chatproxyService.getChatURL($scope.entitykey);
                    return chatURL.data.url;
                }

                function buttonClick() {
                    var chattersAvailable = getChattersAvailability();

                    // Check if a chat window is already open
                    if (chatWindow && !chatWindow.closed) {
                        // if so focus back on the window and end here
                        chatWindow.focus();
                        return;
                    }

                    if (vm.available) {
                        // Chat is available
                        if (chattersAvailable) {
                            // Chatter is also available => open window with chat url
                            var windowURL = getChatURL();
                            var windowName = 'Chatservicer_window';
                            var windowFeatures = 'width=640,height=480,resizable,scrollbars=yes,status=1';

                            chatWindow = window.open(windowURL, windowName, windowFeatures);
                        } else {
                            // Chatters are all occupied => show popup with message + set chat availability to false
                            vm.occupied = true;
                            vm.popupOpen = !vm.popupOpen;

                            vm.available = false;
                        }
                    } else {
                        // Chat is unavailable
                        if (vm.popupOpen && !chattersAvailable) {
                            // Close popup if it was open with unavailable text
                            vm.popupOpen = false;
                        } else {
                            // Toggle popup with standard info
                            vm.occupied = false;
                            vm.popupOpen = !vm.popupOpen;
                        }
                    }
                }

                vm.buttonClick = buttonClick;
                vm.cancelPoll = cancelPoll;
                vm.getChatAvailability = getChatAvailability;
            }
        ]);

})(window.angular);
