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
  function($scope, $timeout, $window, $location, autoGuiaService, $rootScope,
    userDataService, UtilitiesService, LoadingBarService, GoogleGeolocationService) {

    $rootScope.currentPath = $location.path();
    var vm = this;

    UtilitiesService.addStep(1);

    vm.types = [];
    vm.brands = [];
    vm.sideCars = [];

    vm.filter = userDataService.newUserFilter();

    console.log(userDataService.currentFilter());

    // console.log(userDataService.valid());
    // if (userDataService.valid()) {
    //   loginPage();
    // }

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

    $scope.$watch(function() {
      return vm.filter.brands.length;
    }, function(currentLength) {
      if (currentLength < 1) {
        return;
      }
      autoGuiaService.sideCarsStep1(vm.filter)
        .then(function(res) {
          return res.data;
        })
        .then(function(data) {
          vm.sideCars = data;
        });
    });

    function updateBrands() {
      LoadingBarService.loading(true);
      vm.loadingBrands = true;
      autoGuiaService.getBrands(vm.filter.types)
        .then(function(res) {
          var data = res.data;
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
        });
    }

    vm.nextPage = function() {
      UtilitiesService.removeStep(2);
      UtilitiesService.removeStep(3);
      userDataService.saveFilter(vm.filter);
      $location.path('/step-2');
    };

    function loginPage() {
      $location.path('/login');
    };

  });
