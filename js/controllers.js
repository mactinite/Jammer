var eventCalendar = angular.module('eventCalendar', []);
var events = [];
eventCalendar.controller('EventController', function($scope, $http) {
    $http.get("data/events.json").then(function(response) {
        $scope.data = response.data;
        events = $scope.data.events;
        
    },
        function(error) {

        });
});
