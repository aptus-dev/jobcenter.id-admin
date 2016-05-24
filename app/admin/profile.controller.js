angular.module('mainApp')
  .controller('ProfileCtrl', function($state, auth, profile, $firebaseArray, $scope){
    var profileCtrl = this;
    var ref = new Firebase("https://jobcenter.firebaseio.com/branch");
    $scope.branches = $firebaseArray(ref);
    
    profileCtrl.profile = profile;
    profileCtrl.profile.email = auth.password.email;
    
    profileCtrl.updateProfile = function(){
        profileCtrl.profile.$save();
        alertify.alert("Profile Saved!")
        .then(function(){
          $state.go('admin-profile');
        });
    };
    
  });