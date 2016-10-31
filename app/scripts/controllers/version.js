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
  function ($scope, $timeout, $window, $document, $location, autoGuiaService, userDataService, UtilitiesService, LoadingBarService) {
    validate();

    var vm = this;

    vm.versions = [];
    vm.filter = userDataService.currentFilter();
    vm.filter.versions = [];
    vm.filter.maxRate = 0;
    vm.filter.maxValue = 0;
    vm.loadingVersions = true;
    vm.loadingPrices = true;

    vm.maxRate = 100;
    vm.maxValue = 100;


    activate();

    vm.toggleSelection = UtilitiesService.toggleSelection;

    function activate() {
      vm.loadingVersions = true;
      LoadingBarService.loading(true);
      autoGuiaService.versions()
      .then(function(res) {
        var data = res.data;
        $timeout(function() {
          vm.loadingVersions = false;
          vm.versions = res.data.versions;
        }, 1000);
      });

      LoadingBarService.loading(true);
      vm.loadingPrices = true;
      autoGuiaService.prices()
      .then(function(res) {
        vm.loadingPrices = false;
        LoadingBarService.loading(false);
        vm.maxRate = res.data.maxRate;
        vm.maxValue = res.data.maxValue;
      });
    }

    function validate() {
      var test = userDataService.validate() && userDataService.validateStep1();
      if (!test) {
        $location.path('/');
      }
    }

    vm.nextPage = function() {
      userDataService.saveFilter(vm.filter);
      $location.path('/step-3');
    }

  });
