'use strict';

/**
 * @ngdoc function
 * @name autoguiaFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the autoguiaFrontEndApp
 */
angular.module('autoguiaFrontEndApp')
  .controller('LoginCtrl',
  function ($document, $rootScope, $timeout, $window, GoogleGeolocationService,
      LoadingBarService, UtilitiesService, userDataService, $location, autoGuiaService) {

    $rootScope.currentPath = $location.path();

    if (!userDataService.valid()) {
      goToPage('/');
      return;
    }

    var vm = this;
    vm.user = {};
    vm.login = login;
    vm.loginRequest = false;
    vm.loginError = false;

    // Methods!
    vm.goToPage = goToPage;
    vm.restart = restart;

    activate();

    $document.ready(function() {
      // $('#form-modal').openModal(modalOptions);
    });

    function activate() {
      var currentUser = userDataService.currentUser().info;
      vm.user.username = currentUser.email;
    }

    $document.ready(function() {
    });

    function login() {
      vm.loginError = false;
      vm.loginRequest = true;
      autoGuiaService.login(vm.user)
        .then(function(res) {
          var data = res.data;
          vm.loginRequest = false;
          if (data.state) {
            var idUser = data.id_usuario;
            $('#form-modal').openModal(modalOptions);
            userDataService.login();
          } else {
            vm.loginError = true;
          }
        }).catch(function(err) {
          vm.loginError = true;
        });
    }

    function goToPage(page) {
      $('#form-modal').closeModal();
      $location.path(page);
    }

    function restart() {
      $('#form-modal').closeModal();
      userDataService.reset();
      userDataService.init();
      goToPage('/');
    }

    var modalOptions = {
      dismissible: false,
      in_duration: 300,
      opacity: .5
    };

  });
