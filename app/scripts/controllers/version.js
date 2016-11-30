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
  function ($scope, $timeout, $window, $document, $location, autoGuiaService,
    userDataService, UtilitiesService, LoadingBarService, $rootScope) {

    $rootScope.currentPath = $location.path();
    console.log($rootScope.currentPath);
    validate();
    var vm = this;

    vm.versions = [];
    vm.filter = userDataService.currentFilter();
    console.log(vm.filter);
    vm.filter.versions = [];
    vm.filter.maxRate = 0;
    vm.filter.maxValue = 0;
    vm.loadingVersions = true;
    vm.loadingPrices = true;
    vm.sideCars = [];

    vm.maxRate = 5000;
    vm.maxValue = 200000;


    activate();

    vm.toggleSelection = UtilitiesService.toggleSelection;

    function activate() {
      vm.loadingVersions = true;
      LoadingBarService.loading(true);

      autoGuiaService.versions(vm.filter.types, vm.filter.brands)
        .then(function(res) {
          var data = res.data;
          vm.loadingVersions = false;
          vm.versions = data;
          console.log(res);
        });

      autoGuiaService.sideCarsStep1(vm.filter)
        .then(function(res) {
          return res.data;
        })
        .then(function(data) {
          vm.sideCars = data;
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

    $scope.$watch(function() {
      return vm.filter.versions.length;
    }, function(currentLength) {
      if (currentLength < 1) {
        autoGuiaService.sideCarsStep1(vm.filter)
          .then(function(res) {
            return res.data;
          })
          .then(function(data) {
            vm.sideCars = data;
          });
        return;
      }
      autoGuiaService.sideCarsStep2(vm.filter)
        .then(function(res) {
          return res.data;
        })
        .then(function(data) {
          vm.sideCars = data;
          console.log(data);
        });
    });

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
