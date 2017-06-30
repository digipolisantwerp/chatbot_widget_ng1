(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .controller('akit.component.chatservicerButton.chatservicerButtonController', [
            'akit.component.chatservicerButto.chatproxyService',
            function (chatproxyService) {
                var vm = this;
                vm.popupOpen = false;
                vm.buttonText = 'Checking..';

                function getChatAvailabilty() {
                    var chatAvailability = chatproxyService.checkAvailability();
                    return chatAvailability.data.available;
                }

                function getChatURL() {
                    var chatURL = chatproxyService.getChatURL();
                    return chatURL.data.url;
                }

                function buttonClick() {
                    if (vm.available) {
                        var windowURL = getChatURL();
                        var windowName = 'Chatservicer_window';
                        var windowFeatures = 'width=640,height=480,resizable,scrollbars=yes,status=1';

                        window.open(windowURL, windowName, windowFeatures);
                    } else {
                        vm.popupOpen = !vm.popupOpen;
                    }
                }

                vm.available = getChatAvailabilty;
                vm.buttonClick = buttonClick;
            }
        ]);

})(window.angular);
