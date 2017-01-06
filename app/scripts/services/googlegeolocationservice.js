'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.GoogleGeolocationService
 * @description
 * # GoogleGeolocationService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('GoogleGeolocationService', function ($http) {
    var service = {};

    var baseUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
    var apiKey = 'AIzaSyBbNa0uGlxuJZxOZOOiu1dx3eHRsp3CcqI';
    var url = baseUrl + apiKey;

    service.getPosition = function() {
      return $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBbNa0uGlxuJZxOZOOiu1dx3eHRsp3CcqI');
    }

    return service;
  });
