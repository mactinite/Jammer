describe('EventController', function(){

  it('should create "events" model with 3 events', inject(function($controller) {
    var scope = {},
        ctrl = $controller('EventController', {$scope:scope});

    expect(scope.events.length).toBe(3);
  }));

});