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
  function ($document, $rootScope, $timeout, $window, GoogleGeolocationService,
      LoadingBarService, UtilitiesService, userDataService, $location, autoGuiaService) {

    $rootScope.currentPath = $location.path();
    validate();

    var vm = this;
    vm.items = [];
    vm.cars = [];
    vm.currentCar = 0;
    $rootScope.selectedCars = vm.selectedCars = [];

    UtilitiesService.addStep(3);

    vm.filter = userDataService.currentFilter();
    vm.user = {};

    vm.options = {
      cellHeight: 93,
      verticalMargin: 15,
      disableResize: true,
      animate: true,
    };

    vm.gridWidth = 4;
    vm.gridHeight = 6;
    vm.fetchingCars = false;

    var gridifyItems = UtilitiesService.gridifyItems;
    vm.toggleObjectSelection = UtilitiesService.toggleObjectSelection;

    activate();

    vm.fetchCars = function() {
      if (vm.cars.length >= 1 && vm.items.length == vm.cars.length) {
        return;
      }
      if (LoadingBarService.isLoading()) {
        return;
      }
      LoadingBarService.loading(true);
      $timeout(function() {
        var initialLength = vm.items.length;
        getNCars(5);
        gridifyItems(vm.items, vm.gridWidth, vm.gridHeight, initialLength, 'id_auto');
        LoadingBarService.loading(false);
      }, 50);
    }

    function activate() {
      autoGuiaService.cars(vm.filter)
        .then(function(response) {
          vm.cars = response.data;
          getNCars(10);
          gridifyItems(vm.items, vm.gridWidth, vm.gridHeight, 0, 'id_auto');

          if (userDataService.userLogged()) {
            var savedCars = userDataService.savedCars();
            for (var i = 0; i < savedCars.length; i++) {
              vm.selectedCars.push(savedCars[i]);
            }
          }
        }).catch(function(err) {
          console.log(err);
        });
    }

    function getNCars(n) {
      for (var i = 0; i < n && vm.currentCar < vm.cars.length; i++) {
        vm.items.push(vm.cars[vm.currentCar++]);
      }
    }

    vm.getOffers = function() {
      GoogleGeolocationService.getPosition()
        .then(function(res) {
          var location = res.data.location;
          vm.user.location = {};
          vm.user.location.latitude = location.lat;
          vm.user.location.longitude = location.lng;
          userDataService.saveFilter(vm.filter);
          userDataService.saveUserInfo(vm.user);
          userDataService.addCars(vm.selectedCars);
          userDataService.validateFilter();
          userDataService.saveUser()
            .then(function(res) {
              vm.nextPage();
            }, function(error) {
              console.log(error);
            });
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
      $location.path('/thanks');
    }

  });
