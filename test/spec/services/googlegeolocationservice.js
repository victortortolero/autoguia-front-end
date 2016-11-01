'use strict';

describe('Service: GoogleGeolocationService', function () {

  // load the service's module
  beforeEach(module('autoguiaFrontEndApp'));

  // instantiate service
  var GoogleGeolocationService;
  beforeEach(inject(function (_GoogleGeolocationService_) {
    GoogleGeolocationService = _GoogleGeolocationService_;
  }));

  it('should do something', function () {
    expect(!!GoogleGeolocationService).toBe(true);
  });

});
