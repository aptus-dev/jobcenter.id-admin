var of = angular.module("office", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";
var brRef = new Firebase(URL + 'branch');

of.controller("officeCtrl", function($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject) {

var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" +  $stateParams.branchId);    
$scope.branches = $firebaseArray(brRef);
$scope.branch = $firebaseObject(ref3);

$scope.addBranch = function() {
 brRef.push({
    nama: $scope.nama,
    alamat: $scope.alamat,
    telp: $scope.telp,
    kotamadya: $scope.kodya,
    lat: $scope.lat,
    long: $scope.long
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
  
 
  //mapsbranch
// Required variables.
// var map;
// var marker;

// function initialize() {
//    var mapOptions = {
//       center: new google.maps.LatLng(-6.293411,106.800804),
//       zoom: 9,
//       mapTypeId: 'roadmap'
//    };

//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//    // This event detects a click on the map.
//    google.maps.event.addListener(map, "click", function(event) {

//       // Get lat lng coordinates.
//       // This method returns the position of the click on the map.
//       var lat = event.latLng.lat().toFixed(6);
//       var lng = event.latLng.lng().toFixed(6);

//       // Call createMarker() function to create a marker on the map.
//       createMarker(lat, lng);

//       // getCoords() function inserts lat and lng values into text boxes.
//       getCoords(lat, lng);

//    });


// }
// google.maps.event.addDomListener(window, 'load', initialize);

// // Function that creates the marker.
// function createMarker(lat, lng) {

//    // The purpose is to create a single marker, so
//    // check if there is already a marker on the map.
//    // With a new click on the map the previous
//    // marker is removed and a new one is created.

//    // If the marker variable contains a value
//    if (marker) {
//       // remove that marker from the map
//       marker.setMap(null);
//       // empty marker variable
//       marker = "";
//    }

//    // Set marker variable with new location
//    marker = new google.maps.Marker({
//       position: new google.maps.LatLng(lat, lng),
//       draggable: true, // Set draggable option as true
//       map: map
//    });


//    // This event detects the drag movement of the marker.
//    // The event is fired when left button is released.
//    google.maps.event.addListener(marker, 'dragend', function() {
      
//       // Updates lat and lng position of the marker.
//       marker.position = marker.getPosition();

//       // Get lat and lng coordinates.
//       var lat = marker.position.lat().toFixed(6);
//       var lng = marker.position.lng().toFixed(6);

//       // Update lat and lng values into text boxes.
//       getCoords(lat, lng);

//    });
// }

// // This function updates text boxes values.
// function getCoords(lat, lng) {

//    // Reference input html element with id="lat".
//    var coords_lat = document.getElementById('lat');

//    // Update latitude text box.
//    coords_lat.value = lat;

//    // Reference input html element with id="lng".
//    var coords_lng = document.getElementById('lng');

//    // Update longitude text box.
//    coords_lng.value = lng;
// }