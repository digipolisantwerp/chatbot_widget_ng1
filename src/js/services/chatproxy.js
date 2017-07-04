(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .service('akit.component.chatservicerButto.chatproxyService', [
            '$http',
            'akit.component.chatservicerButton.chatproxyConfig',
            function ($http, chatproxyConfig) {

                var API = {};

                function checkAvailability(entitykey) {
                    // Call
                    // return $http.get(chatproxyConfig.chatproxyServiceUrl + 'availability?entitykey=' + entitykey)
                    //     .then(function (response) {
                    //         return response.data;
                    //     });
                    // Response example
                    // {
                    //     "success": true,
                    //     "data": {
                    //         "available": true,
                    //         // mogelijks meer properties maar momenteel geen idee of je ook departement of key terug krijgt ergens.
                    //     }
                    // }

                    return {
                        "success": true,
                        "data": {
                            "available": false
                        }
                    };
                }

                function getChatURL(entitykey) {
                    // Call
                    // return $http.get(chatproxyConfig.chatproxyServiceUrl + 'chaturl?entitykey=' + entitykey)
                    //     .then(function (response) {
                    //         return response.data;
                    //     });
                    // Response example
                    // {
                    //     "success": true,
                    //         "data": {
                    //         "url": "http://.......",
                    //         // mogelijks meer properties maar momenteel geen idee of je ook departement of key terug krijgt ergens.
                    //     }
                    // }

                    return {
                        "success": true,
                        "data": {
                            "url": "http://www.google.be"
                        }
                    };
                }

                API.checkAvailability = checkAvailability;
                API.getChatURL = getChatURL;

                return API;

            }
        ]);

})(window.angular);
