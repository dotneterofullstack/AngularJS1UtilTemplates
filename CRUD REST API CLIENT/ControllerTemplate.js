(function() {
'use strict';

    angular
        .module('TemplateApp')
        .controller('TemplateCtl', TemplateCtl);

    TemplateCtl.$inject = ['$scope', "$rootScope", 'TemplateSvc'];
    function TemplateCtl($scope, $rootScope, TemplateSvc) {
        $scope.estadoVista = $rootScope.EstadoVistaEnum.Listado;
        $scope.AllEntities = null;
        
        $scope.Entity = {
            //Aqui las propiedades por defecto de una nueva entidad a Guardar o Actualizar
        };

        $scope.EntityFilter = {
            //Aqui las propiedades por las cuales Filtrar las entidades de AllEntities
        };

        $scope.clear = function() {
            //Aqui se limpian Las propiedades de Entity
        }

        $scope.clearFilter = function() {
            //Aqui se limpian Las propiedades de EntityFilter
        }

        $scope.edit = function(entity) {
            $scope.estadoVista = $rootScope.EstadoVistaEnum.Edicion;
            //Iniciar el proceso de edición copiando las propiedades del registro seleccionado a Entity
        }

        $scope.cancel = function() {
            //Cancelar la edición o el guardado de un nuevo registro
            $scope.estadoVista = $rootScope.EstadoVistaEnum.Listado;
            $scope.clear();
        }

        $scope.add = function() {
            //Preparar la vista para agregar un nuevo registro
            $scope.estadoVista = $rootScope.EstadoVistaEnum.Agregado;
            $scope.clear();
        }

        $scope.save = function(entity) {
            //Guardar o actualizar un registro
            switch ($scope.estadoVista) {
                case $rootScope.EstadoVistaEnum.Agregado:
                    TemplateSvc.post(entity).then(function(response) {
                        $scope.AllEntities.push(response.data);
                        $scope.clear();
                        $scope.estadoVista = $rootScope.EstadoVistaEnum.Listado;
                    })
                    break;
                case $rootScope.EstadoVistaEnum.Edicion:
                    TemplateSvc.put(entity).then(function (response) {
                        $scope.AllEntities = response.data;
                        $scope.clear();
                        $scope.estadoVista = $rootScope.EstadoVistaEnum.Listado;
                    })
                    break;
            }
        }

        $scope.delete = function(idx) {
            TemplateSvc.del($scope.AllEntities[idx].Id).then(function (response) {
                if (response.data)
                    $scope.AllEntities.splice(idx, 1);
            })
        }

        $scope.filter = function(entityFilter) {
            TemplateSvc.get(entityFilter).then(function (response) {
                $scope.AllEntities = response.data;
            })
        }

        $scope.reset = function() {
            $scope.clearFilter();
            $scope.clear();
            activate();
        }

        activate();

        ////////////////

        function activate() {
            $scope.estadoVista = $rootScope.EstadoVistaEnum.Listado;
            TemplateSvc.get().then(function (response) {
                $scope.AllEntities = response.data;
            })
        }
    }
})();