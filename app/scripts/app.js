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
    'infinite-scroll',
    'gridstack-angular',
    'ngGeolocation'
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
      .when('/thanks', {
        templateUrl: 'views/savefilter.html',
        controller: 'SavefilterCtrl',
        controllerAs: 'saveFilter'
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
