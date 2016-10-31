'use strict';

describe('Service: autoguiaservice', function () {

  // load the service's module
  beforeEach(module('autoguiaFrontEndApp'));

  // instantiate service
  var autoguiaservice;
  beforeEach(inject(function (_autoguiaservice_) {
    autoguiaservice = _autoguiaservice_;
  }));

  it('should do something', function () {
    expect(!!autoguiaservice).toBe(true);
  });

});
