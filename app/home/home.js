angular.module( 'mainApp.home', [
'auth0'
])
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $state, store, $rootScope ) {

  $scope.auth = auth;
  // console.log($rootScope.profile);
  // $scope.callApi = function() {
  //   // Just call the API as you'd do using $http
  //   $http({
  //     url: 'http://localhost:3001/secured/ping',
  //     method: 'GET'
  //   }).then(function() {
  //     alert("We got the secured data successfully");
  //   }, function(response) {
  //     if (response.status == -1) {
  //       alert("Please download the API seed so that you can call it.");
  //     }
  //     else {
  //       alert(response.data);
  //     }
  //   });
  // };
  
  // if (auth.profile.roles[0] === 'admin'){
  //  console.log('saya admin');
  //     $state.go('admin');
  //   }
  //   else if (auth.profile.roles[0] === 'superadmin'){
  //     console.log('salam super');
  //     $state.go('super');
  //   }; 
    
  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $state.go('login');
  }

});
