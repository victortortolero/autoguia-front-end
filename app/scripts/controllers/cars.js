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
  function ($document, $timeout, $window, LoadingBarService, UtilitiesService) {
    var vm = this;
    vm.items = [];

    vm.gridWidth = 4;
    vm.gridHeight = 6;
    vm.fetchingCars = false;

    var gridifyItems = UtilitiesService.gridifyItems;

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
      console.log("fetching");
      $timeout(function() {
        console.log("fetched");
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

    $document.ready(initGridStack);

    function initGridStack() {
      var options = {
        cellHeight: 68,
        verticalMargin: 15
      };
      $('.grid-stack').gridstack(options);
    }

  });
