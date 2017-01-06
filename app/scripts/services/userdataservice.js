'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.userDataService
 * @description
 * # userDataService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('userDataService', function(
    $localStorage, $http, autoGuiaService, UtilitiesService, CURRENT_VERSION, BASE_URL
  ) {
    var service = {};
    var $storage = $localStorage;

    service.init = function() {
      service.validateVersion();
      if (typeof $storage.user === 'undefined') {
        $storage.$reset();
        createUser();
      }
      return $storage.user;
    }

    service.reset = function() {
      $storage.$reset();
    }

    service.newUserFilter = function() {
      var filter = {
        types: [],
        brands: [],
        valid: false,
      }
      return filter;
    }

    service.login = function() {
      $storage.user.login = true;
    }

    service.logout = function() {
      $storage.user.login = false;
    }

    service.userLogged = function() {
      return typeof $storage.user !== 'undefined' &&
        typeof $storage.user.login !== 'undefined' &&
        $storage.user.login;
    }

    service.saveFilter = function(filter) {
      $storage.user.filters[0] = angular.extend($storage.user.filters[0], filter);
    }

    service.saveUserInfo = function(user) {
      $storage.user.info = angular.extend($storage.user.info, user);
    }

    service.validateFilter = function() {
      $storage.user.filters[0].valid = true;
    }

    service.validFilter = function() {
      return $storage.user.filters[0].valid;
    }

    service.currentFilter = function() {
      return angular.extend({}, $storage.user.filters[0]);
    }

    service.currentUser = function() {
      return $storage.user;
    };

    service.addCars = function(selectedCars) {
      var cars = selectedCars.map(function(car) {
        return car.id_auto;
      });
      $storage.user.cars = cars;
    };

    service.savedCars = function() {
      return $storage.user.cars;
    };

    /**
     * Validates step 1 filters.
     * Checks if the user at least has 1 type and 1 brand.
     *
     * @return Bool
     */
    service.validateStep1 = function() {
      var currentFilter = $storage.user.filters[0];
      var res = typeof currentFilter.types != "undefined" &&
        typeof currentFilter.brands != "undefined" &&
        currentFilter.types.length >= 1 &&
        currentFilter.brands.length >= 1;
      return res;
    }

    service.validateStep2 = function() {
      var currentFilter = $storage.user.filters[0];
      var res =
        typeof currentFilter.versions != "undefined" &&
        currentFilter.versions.length >= 1;
      return res;
    }

    service.validate = function() {
      return $storage.user.filters.length >= 1;
    };

    service.validateVersion = function() {
      for (var prop in localStorage) {
        if (prop.search('autoguia') !== -1 && prop.search(CURRENT_VERSION) === -1) {
          localStorage.removeItem(prop);
        }
      }
    };

    service.valid = function() {
      return typeof $storage.user !== 'undefined' &&
        $storage.user.filters[0].valid;
    };

    service.saveUser = function() {
      return service.calculateClosestDealers()
      .then(function() {
        console.log(formatUserForApi());
        return $http.post(BASE_URL + 'user/new', formatUserForApi());
      });
    };

    service.calculateClosestDealers = function() {
      var user = $storage.user;
      var location = $storage.user.info.location;
      return autoGuiaService.dealers()
        .then(function(res) {
          var dealers = res.data;

          var distances = dealers.map(function(dealer) {
            var distance = UtilitiesService.calculateEarthDistance(
              {lat: location.latitude, lon: location.longitude},
              {lat: dealer.latitude, lon: dealer.longitude}
            );
            return {
              id_dealer: dealer.id_dealer,
              distance: distance,
            }
          }).sort(function(a, b) {
            return a.distance - b.distance;
          });

          var closestDealers = [];
          for (var i = 0; i < distances.length; i++) {
            if (closestDealers.length === 3) {
              break;
            }
            closestDealers.push(distances[i].id_dealer);
          }

          user.closestDealers = closestDealers;
        }, function(err) {
          console.log(err)
        });
    };

    function createUser() {
      // $storage.currentFilterIndex = -1;
      $storage.user = angular.extend({}, initialUser);
    }

    var initialUser = {
      filters: [{
        valid: false,
      }],
      cars: [],
      info: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        location: {
          latitude: 0.0,
          longitude: 0.0
        }
      },
      logged: false,
      closestDealers: [],
    };

    function formatUserForApi() {
      var user = $storage.user;
      var filter = user.filters[0];
      return {
        direccion: user.info.address,
        nombres: user.info.name,
        apellidos: user.info.lastName,
        email: user.info.email,
        telefono: user.info.phone,
        array_id_tipo: filter.types,
        array_id_marca: filter.brands,
        array_id_subtipo: filter.versions,
        array_id_auto: user.cars,
        cuota_mensual_maxima: filter.maxRate,
        valor_maximo: filter.maxVale,
        dealers_cercanos: user.closestDealers,
      };
    }

    return service;
  });
