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

    vm.options = {
      cellHeight: 70,
      verticalMargin: 15,
      disableResize: true,
      animate: true,
    };

    vm.gridWidth = 4;
    vm.gridHeight = 6;
    vm.fetchingCars = false;
    vm.$gridStack = null;

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
          // vm.$gridStack.addWidget(
          //   $('.selectable-element'), 0, 0, 0, 0, true
          // );
        }
        // console.log(vm.items);
        gridifyItems(vm.items, vm.gridWidth, vm.gridHeight, initialLength);
        vm.$gridStack.batchUpdate();
        vm.$gridStack.commit();
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
        verticalMargin: 15,
        disableResize: true,
        animate: true,
      };
      var grid = $('.grid-stack');
      grid.gridstack(options);
      vm.$gridStack = grid.data('gridstack');
      console.log("init")

      // vm.$gridStack.on('added', function(event, items) {
      //   for (var i = 0; i < items.length; i++) {
      //     console.log('item added');
      //     console.log(items[i]);
      //   }
      // });
    }

  });
