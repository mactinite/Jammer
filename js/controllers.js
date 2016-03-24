var eventCalendar = angular.module('eventCalendar', []);

eventCalendar.controller('EventController', function ($scope) {
  $scope.events = [
    {'name': 'Camping',
     'description': 'Grow a beard with this patented technique! Hunter is going!'},
    {'name': 'Sakura Con™',
     'description': 'Get your weeb on! Justin might go!'},
    {'name': 'Mariner\'s game',
     'description': 'Don\'t buy drinks at the game! Pre-game! Saravpreet is going!'}
  ];
});