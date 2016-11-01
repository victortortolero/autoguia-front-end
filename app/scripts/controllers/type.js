'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:TypesController
 * @description
 * # TypesController
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('TypesController',
  function($scope, $timeout, $window, $location, autoGuiaService, userDataService, UtilitiesService, LoadingBarService, GoogleGeolocationService) {
    var vm = this;

    vm.types = [];
    vm.brands = [];

    vm.filter = userDataService.newUserFilter();

    activate();

    vm.toggleSelection = UtilitiesService.toggleSelection;

    vm.loadingTypes = true;
    vm.loadingBrands = true;

    $scope.$watch(function() {
      return vm.filter.types.length;
    }, function() {
      updateBrands();
      vm.filter.brands = [];
    });

    function updateBrands() {
      LoadingBarService.loading(true);
      vm.loadingBrands = true;
      autoGuiaService.getBrands(vm.filter.types)
      .then(function(res) {
        var data = res.data;
        $timeout(function() {
          vm.brands = data.brands;
          vm.loadingBrands = false;
          LoadingBarService.loading(false);
        }, 1500);
      });
    }

    function activate() {
      LoadingBarService.loading(true);
      autoGuiaService.getTypes()
      .then(function(res) {
        var data = res.data;
        $timeout(function() {
          vm.loadingTypes = false;
          LoadingBarService.loading(false);
          vm.types = data.types;
        }, 1000);
      });
    }

    vm.nextPage = function() {
      userDataService.saveFilter(vm.filter);
      $location.path('/step-2');
    }
  });
