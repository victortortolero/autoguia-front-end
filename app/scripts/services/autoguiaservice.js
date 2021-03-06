'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.autoGuiaService
 * @description
 * # autoGuiaService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('autoGuiaService', function ($http, BASE_URL) {
    var service = {};
    var path = "data"
    var url = 'data/';

    service.getTypes = function() {
      return $http.post(BASE_URL + "tipos_auto/exists");
    }

    service.dealers = function() {
      return $http.get(BASE_URL + 'dealers');
    };

    service.getBrands = function(types) {
      return $http({
        url: BASE_URL + "tipos_auto/exists/marcas",
        method: "POST",
        data: {
          array_id_tipo: types,
        }
      });
    }

    service.versions = function(types, brands) {
      return $http({
        url: BASE_URL + "subtipos_auto/exists/tipos_auto/marcas",
        method: "POST",
        data: {
          array_id_tipo: types,
          array_id_marca: brands,
        }
      });
    }

    service.prices = function() {
      return $http.get(url + "prices.json");
    }

    service.cars = function(filtro) {
      return $http({
        url: BASE_URL + "autos/list/tipos_auto/subtipos_auto/marcas/other",
        method: 'POST',
        data: {
          array_id_tipo: filtro.types,
          array_id_marca: filtro.brands,
          array_id_subtipo: filtro.versions,
          valor_maximo: filtro.maxValue,
          cuota_mensual_maxima: filtro.maxRate
        }
      });
    }

    service.sideCarsStep1 = function(filtro) {
      return $http({
        url: BASE_URL + "autos/filter/tipos_auto/marcas",
        method: 'POST',
        data: {
          array_id_tipo: filtro.types,
          array_id_marca: filtro.brands
        }
      });
    }

    service.sideCarsStep2 = function(filtro) {
      return $http({
        url: BASE_URL + "autos/filter/tipos_auto/subtipos_auto/marcas",
        method: 'POST',
        data: {
          array_id_tipo: filtro.types,
          array_id_marca: filtro.brands,
          array_id_subtipo: filtro.versions,
        }
      });
    };

    /**
     * @desc Function to login an User.
     * @param user (Should have username ans password attributes)
     */
    service.login = function(user) {
      return $http.post(BASE_URL + "login/front", user);
    };

    return service;
  });
