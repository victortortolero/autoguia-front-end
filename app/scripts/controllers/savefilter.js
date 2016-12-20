'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:SavefilterCtrl
 * @description
 * # SavefilterCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('SavefilterCtrl', function ($location, userDataService) {
    var vm = this;

    // userDataService.saveUser();
    // var currentUser = userDataService.currentUser();
    // console.log(currentUser);

    vm.reset = function() {
      userDataService.reset();
      $location.path('/');
    };
  });
