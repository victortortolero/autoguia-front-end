'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:VersionCtrl
 * @description
 * # VersionCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('VersionCtrl',
  function ($scope, $localStorage, $window, autoGuiaService, userDataService, UtilitiesService) {
    var vm = this;

    vm.versions = [];
    vm.filter = userDataService.currentFilter();
    vm.filter.versions = [];
    vm.loadingVersions = true;
    vm.loadingPrices = true;

    vm.maxRate = 100;
    vm.maxValue = 100;


    activate();

    vm.toggleSelection = UtilitiesService.toggleSelection;

    function activate() {
      vm.loadingVersions = true;
      autoGuiaService.versions()
      .then(function(res) {
        console.log(res.data);
        vm.loadingVersions = false;
        vm.versions = res.data.versions;
      });

      vm.loadingPrices = true;
      autoGuiaService.prices()
      .then(function(res) {
        vm.loadingPrices = false;
        vm.maxRate = res.data.maxRate;
        vm.maxValue = res.data.maxValue;
      });
    }
  });
