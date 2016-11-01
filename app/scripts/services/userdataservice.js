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

    service.init = function() {
      // $storage.$reset();
      if (typeof $storage.user === 'undefined') {
        $storage.$reset();
        createUser();
      }
      return $storage.user;
    }

    service.reset = function() {
      $storage.$reset();
    }

    service.newUserFilter = function() {
      var filter = {
        types: [],
        brands: [],
        valid: false,
      }
      return filter;
    }

    service.saveFilter = function(filter) {
      if ($storage.user.filters.length < 1) {
        $storage.currentFilterIndex = $storage.user.filters.push(filter) - 1;
      } else {
        $storage.user.filters[0] = filter;
      }
    }

    service.saveUserInfo = function(user) {
      $storage.user.info = angular.extend($storage.user.info, user);
    }

    service.currentFilter = function() {
      return $storage.user.filters[0];
    }

    service.currentUser = function() {
      return $storage.user;
    }

    /**
     * Validates step 1 filters.
     * Checks if the user at least has 1 type and 1 brand.
     *
     * @return Bool
     */
    service.validateStep1 = function() {
      var currentFilter = $storage.user.filters[0];
      var res = typeof currentFilter.types != "undefined" &&
        typeof currentFilter.brands != "undefined" &&
        currentFilter.types.length >= 1 &&
        currentFilter.brands.length >= 1;
      return res;
    }

    service.validateStep2 = function() {
      var currentFilter = $storage.user.filters[0];
      var res =
        typeof currentFilter.versions != "undefined" &&
        currentFilter.versions.length >= 1;
      return res;
    }

    service.validate = function() {
      return $storage.user.filters.length >= 1;
    }

    function createUser() {
      // $storage.currentFilterIndex = -1;
      $storage.user = angular.extend({}, initialUser);
    }

    var initialUser = {
      filters: [],
      info: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        location: {
          latitude: 0.0,
          longitude: 0.0
        }
      }
    };

    return service;
  });
