'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.LoadingBarService
 * @description
 * # LoadingBarService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('LoadingBarService', function ($rootScope) {
    var service = {};

    service.loading = function(value) {
      $rootScope.loadingBar = value;
    }

    service.isLoading = function() {
      return $rootScope.loadingBar;
    }

    return service;
  });
