angular.module('dbApp')
    .factory('Fdb', function($firebaseAuth) {
        var ref = new Firebase('https://jobcenter.firebaseio.com/');
        var fdb = $firebaseAuth(ref);
        
        return fdb;
    });