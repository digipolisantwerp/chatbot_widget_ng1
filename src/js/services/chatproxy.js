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

                // Dummy data object for getAvailability call
                var delay = 10;
                var availabilityData = {
                    "success": true,
                    "data": {
                        "available": true
                    }
                };
                // Interval function to see if chat button gets updated
                $interval(function () {
                    var newData = !availabilityData.data.available;
                    availabilityData.data.available = newData;
                }, 1000 * delay);

                function getAvailability(entitykey) {
                    // Call (return promise instead of data object)
                    // return $http.get(chatproxyConfig.chatproxyServiceUrl + 'availability?entitykey=' + entitykey);

                    function promise(data) {
                        var deferred = $q.defer();

                        if (data.success) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject(data);
                        }

                        return deferred.promise;
                    }

                    // Return dummy promise
                    return promise(availabilityData);
                }

                function getChatURL(entitykey) {
                    // Call
                    // return $http.get(chatproxyConfig.chatproxyServiceUrl + 'chaturl?entitykey=' + entitykey)
                    //     .then(function (response) {
                    //         return response.data;
                    //     });

                    // Response example
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
