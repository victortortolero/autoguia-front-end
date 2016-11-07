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
      return $http.get(url + "brands.json");
    }

    service.versions = function() {
      return $http.get(url + "versions.json");
    }

    service.prices = function() {
      return $http.get(url + "prices.json");
    }

    service.cars = function(query) {
      return $http.get(url + "cars.json")
    }

    return service;
  });
