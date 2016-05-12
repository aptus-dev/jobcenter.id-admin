angular.module('mainApp')
    .controller('AdminCtrl', function($scope, $state, Auth, Users, adminList){
        var adminCtrl = this;
        
        $scope.administrators = adminList;
        
        adminCtrl.logout = function() {
            Auth.$unauth();
            $state.go('home');
        }
    });