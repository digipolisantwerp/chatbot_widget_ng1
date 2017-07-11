(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton', []);

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton', []);

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .constant('akit.component.chatservicerButton.chatproxyConfig', {
            chatproxyServiceUrl: '/srv/chatproxy/d/'
        });

})(window.angular);

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

                var pollTime = 1000;
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

                    cancelPoll();
                    pollPromise = $timeout(getChatAvailability, delay);
                }

                function cancelPoll() {
                    $timeout.cancel(pollPromise);
                }

                function getChatURL() {
                    var chatURL = chatproxyService.getChatURL($scope.entitykey);
                    return chatURL.data.url;
                }

                function clickHandler() {
                    var chatUrlAvailable = getChatURL() || false;

                    if (!vm.chatWindow.closed) {
                        vm.chatWindow.focus();
                        return;
                    } else {
                        vm.disabled = false;
                    }

                    if (vm.available) {
                        if (chatUrlAvailable) {
                            cancelPoll();

                            var windowURL = chatUrlAvailable;
                            var windowName = 'chatservicer_window';
                            var windowFeatures = 'width=640,height=480,resizable,scrollbars=yes,status=1';

                            vm.chatWindow = window.open(windowURL, windowName, windowFeatures);
                            vm.disabled = true;
                        } else {
                            vm.occupied = true;
                            vm.popupOpen = !vm.popupOpen;
                            vm.available = false;

                            nextPoll(5000);
                        }
                    } else {
                        if (vm.popupOpen && vm.occupied) {
                            vm.popupOpen = false;
                        } else {
                            vm.occupied = false;
                            vm.popupOpen = !vm.popupOpen;
                        }
                    }
                }

                vm.clickHandler = clickHandler;
                vm.nextPoll = nextPoll;
                vm.cancelPoll = cancelPoll;
                vm.getChatAvailability = getChatAvailability;
            }
        ]);

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .directive('chatservicerButton', [
            '$timeout',
            '$window',
            function (
                $timeout,
                $window
            ) {

                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/assets/chatservicer-button/views/directives/chatservicer-button.htm',
                    controller: 'akit.component.chatservicerButton.chatservicerButtonController',
                    controllerAs: 'chatservicer',
                    scope: {
                        entitykey: '@'
                    },
                    link: function (scope, element, attrs, ctrl) {
                        function updateChatButton() {
                            if (ctrl.popupOpen) ctrl.popupOpen = false;
                        }

                        function initialize() {
                            ctrl.getChatAvailability();
                            updateChatButton();
                        }

                        scope.$watch('chatservicer.available', function onAvailabiltyChange(newValue, oldValue) {
                            if (newValue !== oldValue && !ctrl.disabled) {
                                if (!ctrl.occupied || (ctrl.occupied && newValue === true)) {
                                    updateChatButton();
                                    ctrl.nextPoll(2000);
                                }
                            }
                        });

                        scope.$on('$destroy', function () {
                            if (!ctrl.chatWindow.closed) {
                                ctrl.chatWindow.close();
                            }
                            ctrl.cancelPoll();
                        });

                        $window.addEventListener('focus', function () {
                            $timeout(function () {
                                if (ctrl.chatWindow.closed) {
                                    ctrl.disabled = false;
                                    ctrl.nextPoll();
                                }
                            });
                        });

                        initialize();
                    }
                };

            }
        ]);

})(window.angular);

(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .service('akit.component.chatservicerButto.chatproxyService', [
            '$http',
            '$interval',
            '$q',
            'akit.component.chatservicerButton.chatproxyConfig',
            function ($http, $interval, $q, chatproxyConfig) {

                var API = {};

                var delay = 10;
                var availabilityData = {
                    "success": true,
                    "data": {
                        "available": true
                    }
                };
                $interval(function () {
                    var newData = !availabilityData.data.available;
                    availabilityData.data.available = newData;
                }, 1000 * delay);

                function getAvailability(entitykey) {

                    function promise(data) {
                        var deferred = $q.defer();

                        if (data.success) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject(data);
                        }

                        return deferred.promise;
                    }

                    return promise(availabilityData);
                }

                function getChatURL(entitykey) {

                    return {
                        "success": false,
                        "data": {
                            "url": "http://www.google.be"
                        }
                    };
                }

                API.getAvailability = getAvailability;
                API.getChatURL = getChatURL;

                return API;

            }
        ]);

})(window.angular);

angular.module("akit.component.chatservicerButton").run(["$templateCache", function($templateCache) {$templateCache.put("/assets/chatservicer-button/views/directives/chatservicer-button.htm","<div class=\"chatservicer-button\">\n    <button type=\"button\"\n            class=\"button has-icon\"\n            ng-class=\"{\'success\': chatservicer.available}\"\n            ng-click=\"chatservicer.clickHandler()\">\n        <span class=\"fa fa-comments\"></span>\n        <span ng-if=\"chatservicer.available\">\n            <span translate>Chat met een medewerker</span>\n        </span>\n        <span ng-if=\"!chatservicer.available\">\n            <span translate>Hulp nodig bij het invullen?</span>\n        </span>\n    </button>\n\n    <div class=\"chatservicer-button__popup\"\n         ng-class=\"{\'is-open\': chatservicer.popupOpen}\">\n        <div ng-if=\"!chatservicer.available && !chatservicer.occupied\">\n            <p translate>\n                Elke werkdag (van maandag tot en met vrijdag) kan je tussen 9u en 17u online hulp inroepen bij het invullen van een formulier in het e-loket. Je kan een (video)chat starten met een medewerker. De medewerker zal je stap voor stap begeleiden bij het invullen van het formulier. Hij zal het formulier niet voor jou invullen.\n            </p>\n        </div>\n        <div ng-if=\"chatservicer.occupied\">\n            <p translate>Al onze medewerkers zijn momenteel onbeschikbaar. Gelieve later opnieuw te proberen.</p>\n        </div>\n    </div>\n</div>");}]);