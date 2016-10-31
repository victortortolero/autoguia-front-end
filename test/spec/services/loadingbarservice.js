'use strict';

describe('Service: LoadingBarService', function () {

  // load the service's module
  beforeEach(module('autoguiaFrontEndApp'));

  // instantiate service
  var LoadingBarService;
  beforeEach(inject(function (_LoadingBarService_) {
    LoadingBarService = _LoadingBarService_;
  }));

  it('should do something', function () {
    expect(!!LoadingBarService).toBe(true);
  });

});
