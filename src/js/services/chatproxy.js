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
                    return $http.get(chatproxyConfig.chatproxyServiceUrl + "/availability?entitykey=" + entitykey, {
                        overrideErrorHandling: true
                    })
                    .then(function (response) {
                        return response.data;
                    });
                }

                function getChatURL(entitykey) {
                    return $http.get(chatproxyConfig.chatproxyServiceUrl + 'chaturl?entitykey=' + entitykey, {
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
