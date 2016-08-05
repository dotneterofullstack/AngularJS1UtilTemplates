(function() {
    'use strict';

    angular.module('module', [
        
    ])

    .run(["$rootScope", 
        function($rootScope) {
            // $rootScope.Configuracion = {
            //     RutaApi: "../api/"
            // };

            $rootScope.EstadoVistaEnum = {
                Listado: 0,
                Edicion: 1,
                Agregado: 2
            }
        }])
})();