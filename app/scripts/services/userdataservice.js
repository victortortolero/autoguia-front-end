'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.userDataService
 * @description
 * # userDataService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('userDataService', function($localStorage) {
    var service = {};
    var $storage = $localStorage;
    var currentFilterIndex = -1;

    service.init = function() {
      // $storage.$reset();
      if (typeof $storage.user === 'undefined') {
        $storage.$reset();
        $storage.user = {
          filters: [],
          email: '',
        };
      }
      return $storage.user;
    }

    service.newUserFilter = function() {
      var filter = {
        types: [],
        brands: [],
      }
      return filter;
    }

    service.saveFilter = function(filter) {
      if (currentFilterIndex === -1) {
        currentFilterIndex = $storage.user.filters.push(filter) - 1;
      } else {
        $storage.user.filters[currentFilterIndex] = filter;
      }
      console.log("Saved");
    }

    service.currentFilter = function() {
      return $storage.user.filters[$storage.user.filters.length - 1];
    }

    return service;
  });
