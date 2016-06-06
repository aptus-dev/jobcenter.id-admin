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
    'office'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              $state.go('super');
            }, function(error) {
              return
            });
          }
        }
      })
      .state('admin', {
        url: '/admin',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/admin-landing.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName) {
                  return profile;
                }
                else {
                  $state.go('profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('super', {
        url: '/super',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/superadmin-landing.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName && profile.super) {
                  return profile;
                }
                else if (!profile.super) {
                  $state.go('admin');
                }
                else {
                  $state.go('profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })

    // WORKER PAGES - Admin Page UI Routes
    .state('worker', {
        url: '/worker',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-registered.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-add', {
        url: '/worker-add',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-add.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-verify', {
        url: '/verify/:workerId',
        // controller: 'AuthCtrl as authCtrl',
        templateUrl: 'worker/worker-verify.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-edit', {
        url: '/edit/:workerId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-edit.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-available', {
        url: '/available',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-available.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-booked', {
        url: '/booked',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-booked.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('set-meeting', {
        url: '/booked/:bookId',
        templateUrl: 'worker/worker-booked.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-meeting', {
        url: '/meeting',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-meeting.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('meet-modal', {
        url: '/meeting/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-meeting.html',
      })
      .state('worker-unavailable', {
        url: '/unavailable',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-unavailable.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-status', {
        url: '/status',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-status.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('status-modal', {
        url: '/status/:bookId',
        // controller: 'searchController',
        templateUrl: 'worker/worker-status.html'
      })
      .state('worker-cancelled', {
        url: '/cancelled',
        controller: 'HomeCtrl',
        templateUrl: 'worker/worker-cancelled.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      // END WORKER PAGES - Admin Page UI Routes

    // OFFICE PAGES - Admin Page UI Routes
    .state('offices', {
      url: '/offices',
      controller: 'HomeCtrl',
      templateUrl: 'office/offices-list.html'
    })

    .state('offices-add', {
      url: '/add',
      // controller: 'AuthCtrl as authCtrl',
      templateUrl: 'office/office-add.html'
    })

    .state('offices-edit', {
        url: '/office-edit/:branchId',
        //controller: 'searchController',
        templateUrl: 'office/branch-edit.html'
      })
      // END OFFICE PAGES - Admin Page UI Routes

    // ADMIN USER PAGES - Admin Page UI Routes

    .state('admin-profile', {
      url: '/admin-profile',
      controller: 'ProfileCtrl as profileCtrl',
      templateUrl: 'admin/admin-profile.html',
      resolve: {
        auth: function($state, Users, Auth) {
          return Auth.$requireAuth().catch(function() {
            $state.go('home');
          });
        },
        profile: function(Users, Auth) {
          return Auth.$requireAuth().then(function(auth) {
            return Users.getProfile(auth.uid).$loaded();
          });
        }
      }
    })

    .state('admin-add', {
        url: '/admin-add',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'admin/add-admins.html'
      })
      .state('admin-list', {
        url: '/admin-list',
        // controller: 'HomeCtrl',
        templateUrl: 'admin/admin-list.html'
      })

    // END ADMIN USER PAGES - Admin Page UI Routes
    // END Admin page UI Routes
    $urlRouterProvider.otherwise('login');
  })
  .constant('FirebaseUrl', 'https://jobcenter-admin.firebaseio.com/');