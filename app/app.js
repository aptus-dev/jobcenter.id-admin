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
    'firebase',
    'ui.router',
    'dbApp',
    'worker',
    'angulartics',
    'office'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    // Front page UI Routes
      // .state('home', {
      //   url: '/',
      //   // controller: 'DashboardCtrl as dashboardCtrl',
      //   templateUrl: 'dashboard/admin-landing.html'
      // })
      // .state('contact-us', {
      //   url: '/contact-us',
      //   templateUrl: 'views/contact-us.html'
      // })
      // .state('search', {
      //   url: '/search',
      //   templateUrl: 'search/search.html',
      //   controller: 'searchController'
      // })
      // .state('profiles', {
      //   url: '/profiles/:workerId',
      //   controller: 'profileViewController',
      //   templateUrl: 'profiles/workerprofile.html'
      // })
    // END Front page UI Routes  
    
    
    // Admin page UI Routes
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('superadmin');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('reset-password', {
        url: '/reset-password',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/reset-password.html'
      })
      .state('admin', {
        url: '/admin',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/admin-landing.html',
        resolve: {
          profile: function($state, Users, Auth){
            return Auth.$requireAuth().then( function(auth){
              return Users.getProfile(auth.uid).$loaded().then( function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('admin-profile');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }
      })
      .state('superadmin', {
        url: '/superadmin',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/superadmin-landing.html',
        resolve: {
          profile: function($state, Users, Auth){
            return Auth.$requireAuth().then( function(auth){
              return Users.getProfile(auth.uid).$loaded().then( function (profile){
                if(profile.super){
                  return profile;
                } else {
                  $state.go('admin');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }
      })
      
      // WORKER PAGES - Admin Page UI Routes
      .state('worker', {
        url: '/worker',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-registered.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          },
          profile: function($state, Users, Auth){
            return Auth.$requireAuth().then( function(auth){
              return Users.getProfile(auth.uid).$loaded().then( function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('admin-profile');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }
      })
      .state('worker-add', {
        url: '/worker-add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-add.html'
      })
      .state('worker-verify', {
        url: '/verify/:workerId',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-verify.html'
      })
      .state('worker-edit', {
        url: '/edit/:workerId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-edit.html'
      })
      .state('worker-available', {
        url: '/available',
        // controller: 'searchController',
        templateUrl: 'worker/worker-available.html'
      })
      .state('worker-booked', {
        url: '/booked',
        // controller: 'searchController',
        templateUrl: 'worker/worker-booked.html'
      })
      .state('set-meeting', {
        url: '/booked/:bookId',
        templateUrl: 'worker/worker-booked.html'
      })
      .state('worker-meeting', {
        url: '/meeting',
        // controller: 'searchController',
        templateUrl: 'worker/worker-meeting.html'
      })
      .state('meet-modal', {
        url: '/meeting/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-meeting.html'
      })
      .state('worker-unavailable', {
        url: '/unavailable',
        // controller: 'searchController',
        templateUrl: 'worker/worker-unavailable.html'
      })
      .state('status-modal', {
        url: '/unavailable/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-unavailable.html'
      })
      .state('worker-cancelled', {
        url: '/cancelled',
        // controller: 'searchController',
        templateUrl: 'worker/worker-cancelled.html'
      })
      // END WORKER PAGES - Admin Page UI Routes

      // OFFICE PAGES - Admin Page UI Routes
      .state('offices', {
        url: '/offices',
        // controller: 'searchController',
        templateUrl: 'office/offices-list.html',
        // resolve: {
        //   auth: function($state, Users, Auth){
        //     return Auth.$requireAuth().catch(function(){
        //       $state.go('login');
        //     });
        //   },
        //   profile: function($state, Users, Auth){
        //     return Auth.$requireAuth().then( function(auth){
        //       return Users.getProfile(auth.uid).$loaded().then( function (profile){
        //         if(profile.displayName){
        //           return profile;
        //         } else {
        //           $state.go('admin-profile');
        //         }
        //       });
        //     }, function(error){
        //       $state.go('login');
        //     });
        //   }
        // }
      })
      
      .state('offices-add', {
        url: '/add',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'office/office-add.html',
        // resolve: {
        //   requireNoAuth: function($state, Auth){
        //     return Auth.$requireAuth().then(function(auth){
        //       return;
        //     }, function(error){
        //       $state.go('login');
        //     });
        //   },
        //   profile: function($state, Users, Auth){
        //     return Auth.$requireAuth().then( function(auth){
        //       return Users.getProfile(auth.uid).$loaded().then( function (profile){
        //         if(profile.displayName){
        //           return profile;
        //         } else {
        //           $state.go('admin-profile');
        //         }
        //       });
        //     }, function(error){
        //       $state.go('login');
        //     });
        //   }
        // }
      })
      
      .state('offices-edit', {
        url: '/edit/:branchId',
        controller: 'searchController',
        templateUrl: 'office/branch-edit.html',
        // resolve: {
        //   auth: function($state, Users, Auth){
        //     return Auth.$requireAuth().catch(function(){
        //       $state.go('login');
        //     });
        //   }          
        // },
          // profile: function($state, Users, Auth){
          //   return Auth.$requireAuth().then( function(auth){
          //     return Users.getProfile(auth.uid).$loaded().then( function (profile){
          //       if(profile.displayName){
          //         return profile;
          //       } else {
          //         $state.go('admin-profile');
          //       }
          //     });
          //   }, function(error){
          //     $state.go('login');
          //   });
          // }
       })
      // END OFFICE PAGES - Admin Page UI Routes

      // ADMIN USER PAGES - Admin Page UI Routes

      .state('admin-profile', {
        url: '/admin-profile',
        // controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'admin/admin-profile.html',
        // resolve: {
        //   auth: function($state, Users, Auth){
        //     return Auth.$requireAuth().catch(function(){
        //       $state.go('login');
        //     });
        //   },
        //   profile: function($state, Users, Auth){
        //     return Auth.$requireAuth().then( function(auth){
        //       return Users.getProfile(auth.uid).$loaded().then( function (profile){
        //         if(profile.displayName){
        //           return profile;
        //         } else {
        //           $state.go('admin-profile');
        //         }
        //       });
        //     }, function(error){
        //       $state.go('login');
        //     });
        //   }
        // }
      })
      
      .state('admin-add', {
        url: '/admin-add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/add-admins.html',
        // resolve: {
        //   auth: function($state, Users, Auth){
        //     return Auth.$requireAuth().catch(function(){
        //       $state.go('login');
        //     });
        // },
        //   profile: function($state, Users, Auth){
        //     return Auth.$requireAuth().then( function(auth){
        //       return Users.getProfile(auth.uid).$loaded().then( function (profile){
        //         if(profile.displayName){
        //           return profile;
        //         } else {
        //           $state.go('admin-profile');
        //         }
        //       });
        //     }, function(error){
        //       $state.go('login');
        //     });
        //   }
        // }
      })
      .state('admin-list', {
        url: '/admin-list',
        // controller: 'AdminCtrl as adminCtrl',
        templateUrl: 'admin/admin-list.html',
        // resolve: {
        //   auth: function($state, Users, Auth){
        //     return Auth.$requireAuth().catch(function(){
        //       $state.go('login');
        //     });
        //   },
        //   adminList: function($state, Users){
        //     return Users.all.$loaded();
        //   }
        // }
      });
      // END ADMIN USER PAGES - Admin Page UI Routes
    // END Admin page UI Routes


    $urlRouterProvider.otherwise('/superadmin');
  })
  .constant('FirebaseUrl', 'https://jobcenter-id-auth.firebaseio.com/');