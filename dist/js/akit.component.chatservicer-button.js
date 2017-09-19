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
            chatproxyServiceUrl: '/srv/chatservicer/d'
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

                    if (vm.chatWindow && !vm.chatWindow.closed) {
                        vm.chatWindow.focus();
                        return;
                    } else {
                        vm.disabled = false;
                    }

                    getChatURL()
                        .then(function (result) {
                            var chatUrlAvailable = result.data.url;

                            if (chatUrlAvailable) {
                                cancelPoll();

                                var windowURL = chatUrlAvailable;
                                var referrer = 'referrer=' + window.location.href;

                                if (chatUrlAvailable.indexOf('?') >= -1) {
                                    referrer = '&' + referrer;
                                } else {
                                    referrer = '?' + referrer;
                                }

                                vm.chatWindow = window.open(windowURL + referrer, windowName, windowFeatures);
                                vm.disabled = true;
                            } else {
                                vm.occupied = true;
                                vm.popupOpen = !vm.popupOpen;
                                vm.available = false;

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
                        entitykey: '@',
                        urlWhenUnavailable: '@',
                        availabilityServiceUrl: '@',
                        buttonText: '@',
                        buttonTextNoAgent: '@',
                        getLinkServiceUrl: '@'
                    },
                    link: function (scope, element, attrs, ctrl) {

                        function initialize() {
                            ctrl.getChatAvailability();
                        }

                        scope.$watch('chatservicer.available', function onAvailabiltyChange(newValue, oldValue) {
                            if (newValue !== oldValue && !ctrl.disabled) {
                                if (!ctrl.occupied || (ctrl.occupied && newValue === true)) {
                                    ctrl.nextPoll(2000);
                                }
                            }
                        });

                        scope.$on('$destroy', function () {
                            ctrl.cancelPoll();
                        });

                        $window.addEventListener('focus', function () {
                            $timeout(function () {
                                if (ctrl.chatWindow && ctrl.chatWindow.closed) {
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

                function getAvailability(entitykey) {
                    var chatAvailabilityUrl = chatproxyConfig.chatproxyServiceUrl + "/availability?entitykey=" + entitykey;

                    chatAvailabilityUrl += "&kofefe=" + Date.now().toString();

                    return $http.get(chatAvailabilityUrl, {
                        overrideErrorHandling: true
                    })
                    .then(function (response) {
                        return response.data;
                    });
                }

                function getChatURL(entitykey) {
                    var chatButtonUrl = chatproxyConfig.chatproxyServiceUrl + '/chaturl?entitykey=' + entitykey;

                    chatButtonUrl += "&kofefe=" + Date.now().toString();

                    return $http.get(chatButtonUrl, {
                        overrideErrorHandling: true
                    })
                    .then(function (response) {
                        return response.data;
                    });
                }

                API.getAvailability = getAvailability;
                API.getChatURL = getChatURL;

                return API;

            }
        ]);

})(window.angular);

angular.module("akit.component.chatservicerButton").run(["$templateCache", function($templateCache) {$templateCache.put("/assets/chatservicer-button/views/directives/chatservicer-button.htm","<div class=\"chatservicer-button\">\n    <button type=\"button\"\n            class=\"button has-icon\"\n            ng-class=\"{\'success\': chatservicer.available}\"\n            ng-click=\"chatservicer.clickHandler(chatservicer.available)\">\n        <span class=\"fa fa-comments\"></span>\n        <span ng-if=\"chatservicer.available\">\n            <span>{{ buttonText || \'Chat met een medewerker\'}}</span>\n        </span>\n        <span ng-if=\"!chatservicer.available\">\n            <span>{{buttonTextNoAgent || \'Hulp nodig bij het invullen?\'}}</span>\n        </span>\n    </button>\n</div>");}]);