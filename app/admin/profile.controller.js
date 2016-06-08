angular.module('mainApp')
  .controller('ProfileCtrl', function($state, auth, profile, $firebaseArray, $scope, Auth){
    var profileCtrl = this;
    var ref = new Firebase("https://jobcenter.firebaseio.com/branch");
    $scope.branches = $firebaseArray(ref);
    
    profileCtrl.profile = profile;
    profileCtrl.profile.email = auth.password.email;
    
    profileCtrl.updateProfile = function(){
        profileCtrl.profile.$save();
        alertify.success("Profile Saved!");
        $state.go('super');
    };

    profileCtrl.logout = function() {
            Auth.$unauth();
            $state.go('login');
        }
    
  });