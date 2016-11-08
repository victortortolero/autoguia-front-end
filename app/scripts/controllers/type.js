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
  function($scope, $timeout, $window, $location, autoGuiaService,
    userDataService, UtilitiesService, LoadingBarService, GoogleGeolocationService) {
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
    }, function(currentLength) {
      if (currentLength < 1) {
        return;
      }
      updateBrands();
      vm.filter.brands = [];
    });

    function updateBrands() {
      LoadingBarService.loading(true);
      vm.loadingBrands = true;
      autoGuiaService.getBrands(vm.filter.types)
        .then(function(res) {
          console.log("success");
          var data = res.data;
          console.log(data);
          vm.brands = data;
          vm.loadingBrands = false;
          LoadingBarService.loading(false);
        });
    }

    function activate() {
      LoadingBarService.loading(true);
      autoGuiaService.getTypes()
        .then(function(res) {
          var data = res.data;
          vm.loadingTypes = false;
          LoadingBarService.loading(false);
          vm.types = data;
          // console.log(data);
        });
    }

    vm.nextPage = function() {
      userDataService.saveFilter(vm.filter);
      $location.path('/step-2');
    }
  });
