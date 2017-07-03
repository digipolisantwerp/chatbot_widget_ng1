(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .controller('akit.component.chatservicerButton.chatservicerButtonController', [
            'akit.component.chatservicerButto.chatproxyService',
            function (chatproxyService) {
                var vm = this;
                var popupTextInfo = 'Elke werkdag (van maandag tot en met vrijdag) kan je tussen 9u en 17u online hulp inroepen bij het invullen van een formulier in het e-loket. Je kan een (video)chat starten met een medewerker. De medewerker zal je stap voor stap begeleiden bij het invullen van het formulier. Hij zal het formulier niet voor jou invullen.';
                var popupTextUnavailable = 'Al onze medewerkers zijn momenteel onbeschikbaar. Gelieve later opnieuw te proberen.';
                var chatWindow;

                vm.popupOpen = false;
                vm.buttonText;
                vm.popupText;

                function getChatAvailabilty() {
                    var chatAvailability = chatproxyService.checkAvailability();
                    return chatAvailability.data.available;
                }

                function getChattersAvailability() {
                    var chatters = chatproxyService.getChatURL();
                    return chatters.success;
                }

                function getChatURL() {
                    var chatURL = chatproxyService.getChatURL();
                    return chatURL.data.url;
                }

                function buttonClick() {
                    if (chatWindow && !chatWindow.closed) {
                        chatWindow.focus();
                        return;
                    }

                    if (vm.available) {
                        // Chat is available
                        if (getChattersAvailability()) {
                            // Chatter is also available => open window with chat url
                            var windowURL = getChatURL();
                            var windowName = 'Chatservicer_window';
                            var windowFeatures = 'width=640,height=480,resizable,scrollbars=yes,status=1';

                            chatWindow = window.open(windowURL, windowName, windowFeatures);
                        } else {
                            // Chatters are all occupied => show popup with message + set chat availability to false
                            vm.popupText = popupTextUnavailable;
                            vm.popupOpen = !vm.popupOpen;

                            vm.available = false;
                        }
                    } else {
                        // Chat is unavailable
                        if (vm.popupOpen && vm.popupText === popupTextUnavailable) {
                            // Close popup if it was open with unavailable text
                            vm.popupOpen = false;
                        } else {
                            // Toggle popup with standard info
                            vm.popupOpen = !vm.popupOpen;
                            vm.popupText = popupTextInfo;
                        }
                    }
                }

                vm.available = getChatAvailabilty();
                vm.buttonClick = buttonClick;
            }
        ]);

})(window.angular);
