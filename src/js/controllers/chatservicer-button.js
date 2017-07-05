(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .controller('akit.component.chatservicerButton.chatservicerButtonController', [
            '$scope',
            'akit.component.chatservicerButto.chatproxyService',
            function ($scope, chatproxyService) {
                var vm = this;

                var chatWindow;

                vm.available;
                vm.occupied = false;
                vm.popupOpen = false;

                function getChatAvailabilty() {
                    var chatAvailability = chatproxyService.checkAvailability($scope.entitykey);
                    return chatAvailability.data.available;
                }

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
                vm.getChatAvailability = getChatAvailability;
            }
        ]);

})(window.angular);
