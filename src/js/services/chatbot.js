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
                        function (response) {
                            var result = response.data;
                            // merge quick reply buttons with messages
                            if (result.quickReplies) {
                                result.data.push({
                                    type: 'radio',
                                    message: '',
                                    elements: result.quickReplies.map(function (item) {
                                        return {
                                            text: item.text,
                                            replyText: item.action
                                        };
                                    })
                                });
                            }
                            return result;
                        }
                    );
                }

                API.sendMessage = sendMessage;

                return API;

            }
        ]);

// @ts-ignore
})(window.angular);
