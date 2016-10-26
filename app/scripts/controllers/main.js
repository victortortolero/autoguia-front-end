'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('MainCtrl', function($localStorage) {
    var vm = this;

    vm.$storage = $localStorage;
    delete vm.$storage.selectedTypes
    vm.$storage.selectedTypes = []


    vm.types = [
      {name: 'deportivo'},
      {name: 'SUV'}
    ]

    vm.brands = [
      {name: 'Honda', imageUrl: 'http://placehold.it/800x800'},
      {name: 'Audi', imageUrl: 'http://placehold.it/800x800'}
    ]

    vm.toggleSelection = function(name) {
      var id = vm.$storage.selectedTypes.indexOf(name);

      // is currently selected
      if (id > -1) {
        vm.$storage.selectedTypes.splice(id, 1);
      }
      // is newly selected
      else {
        vm.$storage.selectedTypes.push(name);
      }
    }

    vm.loadingTypes = false;
    vm.loadingBrands = false;
  });
