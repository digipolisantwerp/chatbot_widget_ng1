(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatservicerButton')
        .service('akit.component.chatservicerButto.chatproxyService', [
            'akit.component.chatservicerButton.chatproxyConfig',
            function (chatproxyConfig) {

                var API = {};

                function checkAvailability(entity) {
                    // chatproxyConfig.chatproxyServiceUrl + 'availability?entitykey=:entitykey'     (entitykey for example: 'form.<identifier>'
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

                function getChatURL(entity) {
                    // chatproxyConfig.chatproxyServiceUrl + 'chaturl?entitykey=:entitykey'     (entitykey for example: 'form.<identifier>'
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
