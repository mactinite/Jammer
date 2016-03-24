var eventCalendar = angular.module('eventCalendar', []);

eventCalendar.controller('EventController', function ($scope,$http) {
    $http.get("data/events.json").then(function(response){
       $scope.data = response.data; 
    },
    function(error){
        
    });
});