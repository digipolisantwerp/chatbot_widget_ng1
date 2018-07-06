(function (ng) {
    'use strict';

    ng
        .module('akit.component.chatbotWidget')
        .service('akit.component.chatbotWidget.chatbotService', [
            '$http',
            '$interval',
            '$q',
            function ($http) {

                var API = {};

                function sendMessage(url, message) {
                    return $http.post(url, Object.assign({}, message)).then(
                        function (result) {
                            return result.data;
                        }
                    );
                }

                API.sendMessage = sendMessage;

                return API;

            }
        ]);

})(window.angular);
