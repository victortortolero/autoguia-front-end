'use strict';

describe('Controller: CarsCtrl', function () {

  // load the controller's module
  beforeEach(module('autoguiaFrontEndApp'));

  var CarsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarsCtrl = $controller('CarsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CarsCtrl.awesomeThings.length).toBe(3);
  });
});
