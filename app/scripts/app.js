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
    'ngGeolocation',
    'angular-loading-bar'
  ])
  .constant(
    'BASE_URL',
    'http://jrojas.dhdinc.info/autoguia-api/public/index.php/'
  )
  .constant(
    'CURRENT_VERSION',
    'V1'
  )
  .config(function ($routeProvider, $localStorageProvider, cfpLoadingBarProvider, CURRENT_VERSION) {
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
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $localStorageProvider.setKeyPrefix('autoguia-' + CURRENT_VERSION + '-');
    cfpLoadingBarProvider.includeSpinner = false;
  })
  .run(function(userDataService, LoadingBarService, $rootScope, $location, $document, UtilitiesService) {
    $rootScope.userIsLogged = false;
    userDataService.init();
    LoadingBarService.loading(false);
    $rootScope.currentPath = $location.path();
    $rootScope.selectedCars = [];
    $rootScope.UserService = userDataService;
    UtilitiesService.createValidStepsSet();

    $rootScope.userLogged = function() {
      return userDataService.userLogged();
    };

    $rootScope.currentUser = function() {
      $rootScope.userIsLogged = userDataService.currentUser().info;
      return $rootScope.userIsLogged;
    };

    $document.ready(function() {
      $(".button-collapse").sideNav();
      $(".dropdown-button").dropdown();
    });

    $rootScope.goToLogin = function() {
      $rootScope.lastPath = '#' + $location.path();
      $location.path('/login');
    };

    $rootScope.goToLastPath = function() {
      if (typeof $rootScope.lastPath !== 'undefined') {
        return $location.path($rootScope.lastPath);
      }
      $location.path('/');
    };

    $rootScope.highestValidStep = function(step) {
      return UtilitiesService.getMaxValidStep();
    };

    $rootScope.goToStep = function(step) {
      if (UtilitiesService.validStep(step)) {
        var localStep = step === 1 ? '/' : ('/step-' + step);
        $location.path(localStep);
      } else {
        console.log('invalid');
      }
    };

  });
