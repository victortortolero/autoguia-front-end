'use strict';

describe('Controller: SavefilterCtrl', function () {

  // load the controller's module
  beforeEach(module('autoguiaFrontEndApp'));

  var SavefilterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SavefilterCtrl = $controller('SavefilterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SavefilterCtrl.awesomeThings.length).toBe(3);
  });
});
