var of = angular.module("office", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";
var brRef = new Firebase(URL + 'branch');

of.controller("officeCtrl", function($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject) {

var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" +  $stateParams.branchId);    
$scope.branches = $firebaseArray(brRef);
$scope.branch = $firebaseObject(ref3);

$scope.updateBranch = function (branch) {
    $rootScope.branch = branch;
    $state.go('offices-edit', {branchId: $rootScope.branch.$id});        
  }; //end of update branch
    
  $scope.editBranch = function () {      
    $scope.branch.$save()    
    .then(function() {
        alertify.alert('Branch Updated!');
      }).catch(function(error) {
        alertify.error('Error!')        
      });
      $state.go('offices');
  };  //end of edit branch
  
  $scope.removeBranch = function (branch) {
    alertify.confirm("Apakah anda yakin akan menghapus kantor cabang?", function (e) {    
        if (e) {
            $scope.branch.$remove()
            .then(function() {
            alertify.error('Kantor Cabang Telah Dihapus!');            
            })
            .catch(function(error) {
            alertify.error('Error!')        
            });
            $state.go('offices');    
            
        } else {    
                
        }
        });         
    
    // .then(function() {
    //     alert('Branch Removed!');
    //   }).catch(function(error) {
    //     alert('Error!')        
    //   });
    //   $state.go('offices');
  };  //end of remove branch
  
  //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 10;
  //sort table
    $scope.sortType = "kotamadya";
    $scope.sortReverse = true;
  
  });