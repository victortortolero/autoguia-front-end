'use strict';

describe('Service: UtilitiesService', function () {

  // load the service's module
  beforeEach(module('autoguiaFrontEndApp'));

  // instantiate service
  var UtilitiesService;
  beforeEach(inject(function (_UtilitiesService_) {
    UtilitiesService = _UtilitiesService_;
  }));

  it('should do something', function () {
    expect(!!UtilitiesService).toBe(true);
  });

});
