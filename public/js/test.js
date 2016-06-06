var test = angular.module('test', []);


test.controller('testCtrl', function($scope, $http){
    $scope.name = 'world';
    $http({
        method: 'GET',
        url: 'test/asdf'
    }).then(function success(response){
        $scope.name = response.data;
    }, function error(response){
        console.log('Could not!');
    });
});