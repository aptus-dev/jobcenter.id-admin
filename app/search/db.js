var db = angular.module("dbApp", ["firebase", "angularUtils.directives.dirPagination","ngTagsInput"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("tagsCtrl", function($scope, $http) {
  $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];

  $scope.loadTags = function(query) {
    return $http.get('tags.json');
  };  
});

db.controller("searchController", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$firebaseObject', '$http', function($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject, $http) {
  
  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'labor');  
  var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" +  $stateParams.branchId);
  var ref4 = new Firebase("https://jobcenter.firebaseio.com/labor/" +  $stateParams.workerId);
      
  $scope.branches = $firebaseArray(ref);
  $scope.datas = $firebaseArray(ref2);
  $scope.branch = $firebaseObject(ref3);
  $scope.data = $firebaseObject(ref4);
  
  $scope.submitForm = function(user) {

            if ($scope.userForm.$invalid === true) {
                $scope.notValid = true;
                return
            }
            $scope.postData = angular.copy(user);

            $http.post('/contact', $scope.postData)
                .success(function(data) {
                    alert('successfully emailed form');
                })
                .error(function(data) {
                    alert('something went wrong');
                });
        };
  
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
  
  $scope.updateWorker = function (data) {
    $rootScope.data = data;
    $state.go('worker-edit', {workerId: $rootScope.data.$id});        
  }; //end of update worker
  
  var tanggal = document.getElementById('inputTanggal');
  var gaji = document.getElementById('inputGaji');
   
  $scope.editWorker = function () {      
    $scope.data.$save()
    .then(ref4.update({tanggallahir: tanggal.value, gaji: gaji.value}))
    .then(function() {
        alert('Worker Updated!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('workerprof');
  };  //end of edit worker
  
  $scope.removeWorker = function (data) {         
    $scope.data.$remove()
    .then(function() {
        alert('Worker Removed!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('workerprof');
  };  //end of remove worker
  
  $scope.filter = {};
  $scope.input = {};
  $scope.apply = function() {
    for(prop in $scope.input) {
      $scope.filter[prop] = $scope.input[prop];
    }
  };  //end of filter function

   //pagination
  $scope.currentPage = 1;
  $scope.pageSize = 15;
  
  //sort table
  $scope.sortType = "kategori";
  $scope.sortReverse = true;
  
   $(function(){
      $('#inputGaji').number( true, '', '.' );
   }); 
   
  //  // upload picture and convert to base64
  // $scope.data = {}; //init variable
  //   $scope.click = function() { //default function, to be override if browser supports input type='file'
  //     $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
  //   }

  //   var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
  //   fileSelect.type = 'file';

  //   if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
  //     return;
  //   }
  
  //     $scope.click = function() { //activate function to begin input file on click
  //       fileSelect.click();
  //     }

  //     fileSelect.onchange = function() { //set callback to action after choosing file
  //       var f = fileSelect.files[0], r = new FileReader();

  //       r.onloadend = function(e) { //callback after files finish loading
  //         $scope.data.b64 = e.target.result;
  //         $scope.$apply();
  //         console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

  //         //here you can send data over your server as desired
  //       }

  //       r.readAsDataURL(f); //once defined all callbacks, begin reading the file

  //     };
  // // end of upload picture and convert to base64                       

}]); //end of searchController

db.controller("profileViewController", function ($scope, $firebaseArray, $rootScope, $state, $stateParams) {

  var JOB_URL = "https://jobcenter.firebaseio.com/labor/";
  var ref = new Firebase(JOB_URL);
  $scope.datas = $firebaseArray(ref);
  
  //pagination
  $scope.currentPage = 1;
  $scope.pageSize = 10;    
  
  $scope.viewProfile = function (data) {
    
    $rootScope.data = data;
    if ($rootScope.data.tersedia === 'ya'){
    $state.go('profiles', {workerId: $rootScope.data.$id});    
    }
    else{
      alert("Pekerja Tidak Tersedia");
    }
  
  }; //end of view Profile
  
  var ref2 = new Firebase("https://jobcenter.firebaseio.com/labor/" +  $stateParams.workerId);  

  ref2.on("value", function (snap) {     
      $scope.nameData = snap.val().nama;
      $scope.katData = snap.val().kategori;
      $scope.lokasiData = snap.val().lokasi;
      $scope.profesiData = snap.val().profesi;
      $scope.genderData = snap.val().gender;
      $scope.waktuData = snap.val().waktu;
      $scope.pendData = snap.val().pendidikan;
      $scope.statusData = snap.val().status;
      $scope.agamaData = snap.val().agama;
      $scope.sukuData = snap.val().suku;
      var umur = snap.val().tanggallahir;
      $scope.expData = snap.val().exp;
      $scope.explnData = snap.val().luarnegri;
      $scope.ingData = snap.val().inggris;
      $scope.tinggiData = snap.val().tinggi;
      $scope.beratData = snap.val().berat;
      $scope.halalData = snap.val().nonhalal;
      $scope.lemburData = snap.val().lembur;
      $scope.anjingData = snap.val().anjing;
      $scope.anakData = snap.val().anak;
      $scope.gajiData = snap.val().gaji;
      $scope.ketData = snap.val().ketrampilan;      
      $scope.gambarData = snap.val().foto;
      $scope.asalData = snap.val().asal;
      $scope.gajihData = snap.val().gajih;   
    
      var value = umur;
      var today = new Date();
      var dob = new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      $scope.age = today.getFullYear() - dob.getFullYear(); //This is the update
      //$('#age').val(age); //for element id
  });        

  //var query = ref.orderByChild();

  //download data into a local object
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "admin");
  
  //modal popup on book button press with validation
  $scope.submitForm = function(){
        
        if ($scope.userForm.$valid) {
            alert('our form is amazing');
        } else {
            $scope.notValid = true;
        }
    };

}); //end of profile view controller

db.controller("branchViewController", function($scope, $firebaseArray) {
  
  var ref = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref);   
  
}); // end of branch view controller

db.controller("laborPushController", ['$scope', '$firebaseArray', '$state', function ($scope, $firebaseArray, $state) {    
  
  var ref2 = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref2);
   
  var ref = new Firebase(URL + 'labor');
  $scope.push = $firebaseArray(ref);
  
  var tanggal = document.getElementById('inputTanggal');
  var gaji = document.getElementById('inputGaji');
  
  $scope.registerWorker = function() {
  $scope.push.$add({
    foto: $scope.data.b64,
    nama: $scope.inputNama,
    tanggallahir: tanggal.value,
    asal: $scope.inputAsal,      
    alamat: $scope.inputAlamat,
    lokasi: $scope.inputLokasi,
    kategori: $scope.inputKategori,
    profesi: $scope.inputProfesi,
    tersedia: "registered",
    gender: $scope.inputGender,
    waktu: $scope.inputWaktu,
    pendidikan: $scope.inputPend,
    status: $scope.inputStatus,
    anak: $scope.inputAnak,              
    telp: $scope.inputTelp,
    agama: $scope.inputAgama,
    suku: $scope.inputSuku,
    gaji: gaji.value,
    ketrampilan: $scope.inputKetrampilan,
    anjing: $scope.inputAnjing,
    exp: $scope.inputExp,
    luarnegri: $scope.inputExpln,
    inggris: $scope.inputIng,
    tinggi: $scope.inputTinggi,
    berat: $scope.inputBerat,
    nonhalal: $scope.inputHalal,
    lembur: $scope.inputLembur,
    gajih: $scope.inputGajih
  })
  .then(function() {
        alert('Worker Added!');
        }).catch(function(error) {
        alert('Error!')        
        });
        $state.go('worker');
  };  //end of push worker
  
  // upload picture and convert to base64
  $scope.data = {}; //init variable
    $scope.click = function() { //default function, to be override if browser supports input type='file'
      $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
      return;
    }
  
      $scope.click = function() { //activate function to begin input file on click
        fileSelect.click();
      }

      fileSelect.onchange = function() { //set callback to action after choosing file
        var f = fileSelect.files[0], r = new FileReader();

        r.onloadend = function(e) { //callback after files finish loading
          $scope.data.b64 = e.target.result;
          $scope.$apply();
          console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

          //here you can send data over your server as desired
        }
        r.readAsDataURL(f); //once defined all callbacks, begin reading the file
      };
  // end of upload picture and convert to base64  
    			
    $(function(){
      // Set up the number formatting.
      $('#inputGaji').number( true, '', '.' );
      $('#inputGajih').number( true, '', '.' );                         

      //https://github.com/customd/jquery-number.
    });         

  }]); //end of labor push controller
//-----------------------------------------------------------//  

db.controller("branchPushController", function () {
  
  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'lokasi');

  var inputNama = document.getElementById('inputNama');
  var inputAlamat = document.getElementById('inputAlamat');
  var inputKodya = document.getElementById('inputKodya');
  var inputTelp = document.getElementById('inputTelp');
  var buttonAdd = document.getElementById('buttonAdd');

        buttonAdd.addEventListener('click', function () {
          var pushref =  ref.push({
              nama: inputNama.value,
              alamat: inputAlamat.value,
              telp: inputTelp.value,
              kotamadya: inputKodya.value
            }).then(function(ref){
              alert("Succesfull!");
            }, function(error) {
              alert("Error: ", error);
            });
            // var pushID = pushref.key();
            // alert("Succesfull! ");
            inputNama.value = '';
            inputAlamat.value = '';
            inputKodya.value = '';
            inputTelp.value = '';
        });                                          
        
      }); //end of branch push controller
  
  // var nama = $('#nameInput').val();
  // var alamat = $('#alamatInput').val();
  // var kotamadya = $('#kodyaInput').val();
  // var telp = $('#telpInput').val();
  
  // this.review = {};
  // this.add = function(ref){
  //   ref.push(this.review);
  //   this.review = {};
  // };
  //  var branchRef = ref.child("branch");

  //push data into database with unique id
  // ref.push({
  //   nama: nama,
  //   alamat: alamat,
  //   kotamadya: kotamadya,
  //   telp: telp
  // });


/* push() function

var postsRef = ref.child("posts");
  var newPostRef = postsRef.push();
  newPostRef.set({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
  // we can also chain the two calls together
  postsRef.push().set({
    author: "alanisawesome",
    title: "The Turing Machine"
  });

  // This is equivalent to the calls to push().set(...) above
  postsRef.push({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
*/
