'use strict';

/**
 * @ngdoc overview
 * @name mainApp
 * @description
 * # mainApp
 *
 * Main module of the application.
 */
angular
  .module('mainApp', [
    'auth0',
    'firebase',
    'ui.router',
    'dbApp',
    'mainApp.home',
    'angular-storage',
    'angular-jwt',
    'worker',
    'angulartics',
    'office'
  ])
  .config( function ( $stateProvider, $urlRouterProvider, authProvider, $httpProvider, 
    jwtInterceptorProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('/', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'dashboard/superadmin-landing.html',
          data: { requiresLogin: true }
        })
      .state('login', { 
        url: '/login', 
        controller: 'LoginCtrl',
        templateUrl: 'login/login.html'
      })  
      // WORKER PAGES - Admin Page UI Routes
      .state('worker', {
        url: '/worker',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-registered.html',
        data: { requiresLogin: true }

      })
      .state('worker-add', {
        url: '/worker-add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-add.html',
        data: { requiresLogin: true }
      })
      .state('worker-verify', {
        url: '/verify/:workerId',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-verify.html',
        data: { requiresLogin: true }
      })
      .state('worker-edit', {
        url: '/edit/:workerId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-edit.html'
      })
      .state('worker-available', {
        url: '/available',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-available.html',
        data: { requiresLogin: true }
      })
      .state('worker-booked', {
        url: '/booked',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-booked.html',
        data: { requiresLogin: true }
      })
      .state('set-meeting', {
        url: '/booked/:bookId',
        templateUrl: 'worker/worker-booked.html'
      })
      .state('worker-meeting', {
        url: '/meeting',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-meeting.html',
        data: { requiresLogin: true }
      })
      .state('meet-modal', {
        url: '/meeting/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-meeting.html'
      })
      .state('worker-unavailable', {
        url: '/unavailable',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-unavailable.html',
        data: { requiresLogin: true }
      })
      .state('status-modal', {
        url: '/unavailable/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-unavailable.html'
      })
      .state('worker-cancelled', {
        url: '/cancelled',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-cancelled.html',
        data: { requiresLogin: true }
      })
      // END WORKER PAGES - Admin Page UI Routes

      // OFFICE PAGES - Admin Page UI Routes
      .state('offices', {
        url: '/offices',
        controller: 'HomeCtrl',
        templateUrl: 'office/offices-list.html',
        data: { requiresLogin: true }
      })
      
      .state('offices-add', {
        url: '/add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'office/office-add.html',
        data: { requiresLogin: true }
      })
      
      .state('offices-edit', {
        url: '/office-edit/:branchId',
        //controller: 'searchController',
        templateUrl: 'office/branch-edit.html',
        data: { requiresLogin: true }
       })
      // END OFFICE PAGES - Admin Page UI Routes

      // ADMIN USER PAGES - Admin Page UI Routes

      .state('admin-profile', {
        url: '/admin-profile',
        // controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/admin-profile.html',
        data: { requiresLogin: true }
      })
      
      .state('admin-add', {
        url: '/admin-add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/add-admins.html',
        data: { requiresLogin: true }
      })
      .state('admin-list', {
        url: '/admin-list',
        controller: 'HomeCtrl',
        templateUrl: 'admin/admin-list.html',
        data: { requiresLogin: true }
      });
      // END ADMIN USER PAGES - Admin Page UI Routes
    // END Admin page UI Routes

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginState: 'login' // matches login state
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
      console.log("Login Success");
      profilePromise.then(function(profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });

    authProvider.on('loginFailure', function() {
      alert("Error");
    });

    authProvider.on('authenticated', function($location) {
      console.log("Authenticated");

    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');
  })
    .run(function($rootScope, auth, store, jwtHelper, $location) {
      $rootScope.$on('$locationChangeStart', function() {

        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          } else {
            // Either show the login page or use the refresh token to get a new idToken
            $location.path('/');
          }
        }

      });
    })
    .controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
      $scope.$on('$routeChangeSuccess', function(e, nextRoute){
        if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
          $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
        }
      });
    });
    
    $urlRouterProvider.otherwise('/');