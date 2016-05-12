angular.module('mainApp')
    .controller('DashboardCtrl', function($state, Auth, Users, profile){
        var dashboardCtrl = this;
        
        dashboardCtrl.profile = profile;
        
        dashboardCtrl.getDisplayName = Users.getDisplayName;
        
        dashboardCtrl.logout = function() {
            Auth.$unauth();
            $state.go('home');
        }
    });