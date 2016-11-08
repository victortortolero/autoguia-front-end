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
      return $http.get(BASE_URL + "tipos_auto/all");
    }

    service.getBrands = function(types) {
      return $http({
        url: BASE_URL + "tipo_auto/marcas",
        method: "POST",
        data: {
          id_tipo_array: types,
        }
      });
    }

    service.versions = function() {
      return $http.get(url + "versions.json");
    }

    service.prices = function() {
      return $http.get(url + "prices.json");
    }

    service.cars = function(query) {
      return $http.get(url + "cars.json");
    }

    service.saveUser = function(data) {
      return $http({
        url: BASE_URL + "guardar_user",
        method: "POST",
      });
    }

    return service;
  });
