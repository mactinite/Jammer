var jammer = angular.module('jammer', []);


jammer.controller('postingArea', function($scope, $http) {
    
    $scope.getNumber = function(num){
        return new Array(num);
    }
    
    $scope.jobTypes = ["Programmers", "Artists", "Musicians", "Other"];
        
});
