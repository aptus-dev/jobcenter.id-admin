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
                if (profile.super) {
                  $state.go('super');
                }
                else if (profile.displayName) {                  
                  return profile;
                }
                else {
                  $state.go('admin-profile')
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
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-registered.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-add', {
        url: '/worker-add',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-add.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-verify', {
        url: '/verify/:workerId',
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
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-edit.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-available', {
        url: '/available',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-available.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-booked', {
        url: '/booked',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-booked.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
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
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-meeting.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('meet-modal', {
        url: '/meeting/:bookId',
        templateUrl: 'worker/worker-meeting.html',
      })
      .state('worker-unavailable', {
        url: '/unavailable',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-unavailable.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('worker-status', {
        url: '/status',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-status.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('status-modal', {
        url: '/status/:bookId',
        templateUrl: 'worker/worker-status.html'
      })
      .state('worker-cancelled', {
        url: '/cancelled',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'worker/worker-cancelled.html',
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
                  //$state.go('admin-profile')
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      // END WORKER PAGES - Admin Page UI Routes

    // OFFICE PAGES - Admin Page UI Routes
    .state('offices', {
      url: '/offices',
      templateUrl: 'office/offices-list.html',
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
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
    })

    .state('offices-add', {
      url: '/add',
      templateUrl: 'office/office-add.html',
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
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
    })

    .state('offices-edit', {
        url: '/office-edit/:branchId',
        templateUrl: 'office/branch-edit.html',
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
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
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
        templateUrl: 'admin/add-admins.html',
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
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('admin-list', {
        url: '/admin-list',
        // controller: 'HomeCtrl',
        templateUrl: 'admin/admin-list.html',
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
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })

    // END ADMIN USER PAGES - Admin Page UI Routes
    // END Admin page UI Routes
    $urlRouterProvider.otherwise('login');
  })
  .constant('FirebaseUrl', 'https://jobcenter-admin.firebaseio.com/');