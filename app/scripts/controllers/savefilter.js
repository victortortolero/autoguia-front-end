'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:SavefilterCtrl
 * @description
 * # SavefilterCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('SavefilterCtrl', function ($rootScope, $location, userDataService) {
    var vm = this;

    $rootScope.currentPath = $location.path();

    // userDataService.saveUser();
    // var currentUser = userDataService.currentUser();
    // console.log(currentUser);

    vm.reset = function() {
      userDataService.reset();
      $location.path('/');
    };

    vm.goToLogin = function() {
      $location.path('/login');
    }
  });
