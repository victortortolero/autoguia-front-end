'use strict';

/**
 * @ngdoc overview
 * @name autoguiaFrontEndApp
 * @description
 * # autoguiaFrontEndApp
 *
 * Main module of the application.
 */
angular
  .module('autoguiaFrontEndApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'infinite-scroll'
  ])
  .config(function ($routeProvider, $localStorageProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/step1.html',
        controller: 'TypesController',
        controllerAs: 'vm'
      })
      .when('/step-2', {
        templateUrl: 'views/step2.html',
        controller: 'VersionCtrl',
        controllerAs: 'vm'
      })
      .when('/step-3', {
        templateUrl: 'views/cars.html',
        controller: 'CarsCtrl',
        controllerAs: 'vm'
      })
      .when('/scrolldemo', {
        templateUrl: 'views/infinite_scroll_demo.html',
        controller: 'ScrollCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    $localStorageProvider.setKeyPrefix('autoguia-v1-');
  })
  .run(function(userDataService, LoadingBarService) {
    userDataService.init();
    LoadingBarService.loading(false);
  });
