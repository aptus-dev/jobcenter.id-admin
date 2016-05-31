angular.module( 'mainApp')
.controller( 'LoginCtrl', function ( $scope, auth, $rootScope) {

  $scope.auth = auth;

  // var lock = new Auth0Lock('DhU62wb5WQ6pAIXsVj0FC1fqzKSKnN7r', 'airawan.auth0.com');
  // lock.show({
  //     disableSignupAction: true
  // });
       //var lock = new Auth0Lock('DhU62wb5WQ6pAIXsVj0FC1fqzKSKnN7r', 'airawan.auth0.com');
  
  
    // $scope.signin = function (auth) {
    //   lock.show({
    // icon:            'http://icons.iconarchive.com/icons/barkerbaggies/pool-ball/256/Ball-5-icon.png',
    //       callbackURL: 'http://localhost:8080/#/'
    //    // , responseType: 'code'
    //     ,  primaryColor: '#23eab6'
    //     // , authParams: {
    //     //   scope: 'openid email'  // Learn about scopes: https://auth0.com/docs/scopes 
    //     // }
    //   });
    // };
});
