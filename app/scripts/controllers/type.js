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
  function($scope, $window, autoGuiaService, userDataService, UtilitiesService) {

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
      vm.loadingBrands = true;
      autoGuiaService.getBrands(vm.filter.types)
      .then(function(res) {
        console.log(res);
        vm.brands = res.data.brands;
        vm.loadingBrands = false;
      });
    }

    function activate() {
      autoGuiaService.getTypes()
      .then(function(res) {
        console.log(res);
        vm.loadingTypes = false;
        vm.types = res.data.types;
      });
    }

    vm.nextPage = function() {
      userDataService.saveFilter(vm.filter);
      $window.location.href = '#/step-2';
    }
  });
