'use strict';

describe('Service: userdataservice', function () {

  // load the service's module
  beforeEach(module('autoguiaFrontEndApp'));

  // instantiate service
  var userdataservice;
  beforeEach(inject(function (_userdataservice_) {
    userdataservice = _userdataservice_;
  }));

  it('should do something', function () {
    expect(!!userdataservice).toBe(true);
  });

});
