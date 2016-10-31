'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:CarsCtrl
 * @description
 * # CarsCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('CarsCtrl',
  function ($document, $rootScope, $timeout, $window, $geolocation,
      LoadingBarService, UtilitiesService, userDataService, $location) {
    validate();

    var vm = this;
    vm.items = [];
    $rootScope.selectedCars = vm.selectedCars = [];

    vm.filter = userDataService.currentFilter();
    vm.user = {};

    vm.options = {
      cellHeight: 70,
      verticalMargin: 15,
      disableResize: true,
      animate: true,
    };

    vm.gridWidth = 4;
    vm.gridHeight = 6;
    vm.fetchingCars = false;

    var gridifyItems = UtilitiesService.gridifyItems;
    vm.toggleObjectSelection = UtilitiesService.toggleObjectSelection;

    for (var i = 0; i < 9; i++) {
      vm.items.push({
        id: i,
      });
    }

    activate();

    vm.fetchCars = function() {
      if (LoadingBarService.isLoading()) {
        return;
      }
      LoadingBarService.loading(true);
      $timeout(function() {
        var initialLength = vm.items.length;
        var lastItemId = vm.items[vm.items.length - 1].id;
        for (var i = 1; i <= 9; i++) {
          vm.items.push({
            id: lastItemId + i,
          });
        }
        // console.log(vm.items);
        gridifyItems(vm.items, vm.gridWidth, vm.gridHeight, initialLength);
        LoadingBarService.loading(false);
      }, 2000);
    }

    function activate() {
      gridifyItems(vm.items, vm.gridWidth, vm.gridHeight);
    }

    vm.getOffers = function() {
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(position) {
        vm.user.location = {};
        vm.user.location.latitude = position.coords.latitude;
        vm.user.location.longitude = position.coords.longitude;
        userDataService.saveFilter(vm.filter);
        userDataService.saveUserInfo(vm.user);
        vm.nextPage();
      });
    }

    $document.ready(function() {
      $('[data-target="form-modal"]').leanModal();

      $('#offer-form').submit(function(event){
        event.preventDefault();
        return false;
      });
    });

    function validate() {
      var test = userDataService.validate() &&
        userDataService.validateStep1() &&
        userDataService.validateStep2();
      if (!test) {
        $location.path('/');
      }
    }

    vm.nextPage = function() {
      // $location.path('/thanks');
    }

  });
