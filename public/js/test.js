var test = angular.module('test', []);


test.controller('testCtrl', function($scope, $http){
    $http({
        method: 'GET',
        url: 'test/asdf'
    }).then(function success(response){
        if(response.data.passport.user.github.name) $scope.name = response.data.passport.user.github.name;
        else $scope.name = "";
        $scope.data = response.data;
    }, function error(response){
        console.log('Could not!');
    });
});