var of = angular.module("office", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";
var brRef = new Firebase(URL + 'branch');

of.controller("officeCtrl", function($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject) {

var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" +  $stateParams.branchId);    
$scope.branches = $firebaseArray(brRef);
$scope.branch = $firebaseObject(ref3);

var lat = document.getElementById('lat');
var long = document.getElementById('long');
$scope.addBranch = function() {
 brRef.push({
    nama: $scope.nama,
    alamat: $scope.alamat,
    telp: $scope.telp,
    email: $scope.email,
    kotamadya: $scope.kodya,
    lat: lat.value,
    long: long.value
  }).then(function(){
    alertify.alert("Branch Berhasil Ditambah!");
  }).catch(function(error) {
      alertify.error('Error!')        
    });
    $state.go('offices');
};


$scope.updateBranch = function (branch) {
    $rootScope.branch = branch;
    $state.go('offices-edit', {branchId: $rootScope.branch.$id});        
  }; //end of update branch
  
  //var lat = document.getElementById('lat');
  //var long = document.getElementById('long');    
  
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
    $scope.message = "jalan"
    
    $('#map').locationpicker({
    location: {
        latitude: [],
        longitude: []
    },
    radius: 100,
    inputBinding: {
        latitudeInput: $('#lat'),
        longitudeInput: $('#long'),
        //radiusInput: $('#us2-radius'),
        locationNameInput: $('#alamat')
    },
    enableAutocomplete: true
  });
  
});
  
 
  