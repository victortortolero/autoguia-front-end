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

    /**
     * Validates step 1 filters.
     * Checks if the user at least has 1 type and 1 brand.
     *
     * @return Bool
     */
    service.validateStep1 = function() {
      var currentFilter = $storage.user.filters[$storage.user.filters.length - 1];
      return
        currentFilter.types.length >= 1 &&
        currentFilter.brands.length >= 1;
    }

    return service;
  });
