(function() {
'use strict';

    angular
        .module('TemplateApp')
        .factory('TemplateSvc', TemplateSvc);

    TemplateSvc.$inject = ['$http'];
    function Service($http) {
        var apiUrl 

        var service = {
            setApiUrl: setApiUrl,
            get:get,
            post:post,
            put:put,
            del:del
        };
        
        return service;

        ////////////////
        function setApiUrl(url) {
            apiUrl = url;
         }

         function get(filter) { 
            return $http.get(apiUrl, {
                    params: filter
                });
        }

        function post(entity) {
            return $http.post(apiUrl, entity);
        }

        function put(entity) {
            return $http.put(apiUrl, entity);
        }

        function del(id) {
            return $http.delete(apiUrl + id);
        }
    }
})();