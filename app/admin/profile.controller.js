angular.module('mainApp')
  .controller('ProfileCtrl', function($state, auth, profile){
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    profileCtrl.profile.email = auth.password.email;
    
    profileCtrl.updateProfile = function(){
        profileCtrl.profile.$save().then(function(){
          $state.go('admin');
        });
    };
    
  });