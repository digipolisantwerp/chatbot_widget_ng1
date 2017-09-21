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

                    // attempting to fix the caching troubles in IE...
                    chatAvailabilityUrl += "&kofefe=" + Date.now().toString();

                    return $http.get(chatAvailabilityUrl, {
                        overrideErrorHandling: true,
                        ignoreLoadingBar: true
                    })
                    .then(function (response) {
                        return response.data;
                    });
                }

                function getChatURL(entitykey) {
                    var chatButtonUrl = chatproxyConfig.chatproxyServiceUrl + '/chaturl?entitykey=' + entitykey;

                    // attempting to fix the caching troubles in IE...
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
