angular.module( 'mainApp')
.controller( 'LoginCtrl', function ( $scope, auth, $rootScope) {

  $scope.auth = auth;

});
