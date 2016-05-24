angular.module('mainApp')
    .controller('LogoutCtrl', function($state, Auth, profile){
        var logoutCtrl = this;
        
        logoutCtrl.profile = profile;
        
        logoutCtrl.logout = function() {
            Auth.$unauth();
            $state.go('login');
        }
    });