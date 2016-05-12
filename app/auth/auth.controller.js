angular.module('mainApp')
    .controller('AuthCtrl', function(Auth, $state){
        var authCtrl = this;
        
        var passVal = '';
        var resetEmail = '';

        
        authCtrl.user = {
            email: '',
            password: ''
        };
        
        authCtrl.login = function() {
            Auth.$authWithPassword(authCtrl.user).then(function(auth){
                $state.go('superadmin');
            }, function(error){
                authCtrl.error = error;
            });
        };
        
        // authCtrl.superLogin = function() {
        //     Auth.$authWithPassword(authCtrl.user).then(function(auth){
        //         $state.go('superadmin');
        //     }, function(error){
        //         authCtrl.error = error;
        //     });
        // };
        
        authCtrl.register = function (){
            if (authCtrl.user.password != authCtrl.passVal) {
                authCtrl.IsMatch=true;
                return false;
              }
              authCtrl.IsMatch=false;
              Auth.$createUser(authCtrl.user).then(function(user){
                    $state.go('admin-list');
                }, function (error){
                    authCtrl.error = error;
                });
        };
        
        authCtrl.logout = function(){
            Auth.$unauth();
            $state.go('home');
        };
        
        authCtrl.resetPass = function(){
            Auth.$resetPassword({
                email: authCtrl.user.email
            }, function(error) {
                if (error) {
                    authCtrl.error = error;
                } 
            }).then(function(auth){
                authCtrl.IsReset = true;
            });
        };
    });
    // .controller('AlertCtrl', [
    //     '$scope', '$rootScope', function($scope, $rootScope) {
    //         $rootScope.alert = {};
    //     }
    // ]);