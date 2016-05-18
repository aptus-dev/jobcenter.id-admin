var of = angular.module("office", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";
var brRef = new Firebase(URL + 'branch');

of.controller("officeCtrl", function($scope, $firebaseArray, $state, $stateParams, $rootScope){
    
$scope.branches = $firebaseArray(brRef);

$scope.updateBranch = function (branch) {
    $rootScope.branch = branch;
    $state.go('branch-edit', {branchId: $rootScope.branch.$id});        
  }; //end of update branch
    
  $scope.editBranch = function () {      
    $scope.branch.$save()    
    .then(function() {
        alert('Branch Updated!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('offices');
  };  //end of edit branch
  
  $scope.removeBranch = function (branch) {         
    $scope.branch.$remove()
    .then(function() {
        alert('Branch Removed!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('offices');
  };  //end of remove branch
  
  //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 10;
  
  });