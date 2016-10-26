'use strict';

/**
 * @ngdoc filter
 * @name autoguiaFrontEndApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .filter('capitalize', function () {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  });
