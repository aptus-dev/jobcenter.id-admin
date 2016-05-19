var worker = angular.module("worker", ["firebase", "angularUtils.directives.dirPagination", "ngTagsInput"]);

var URL = "https://jobcenter.firebaseio.com/";
var brRef = new Firebase(URL + 'branch');

worker.controller("registerWorker", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$http', '$firebaseObject', function ($scope, $firebaseArray, $state, $stateParams, $rootScope, $http, $firebaseObject) {

    $scope.branches = $firebaseArray(brRef);

    var workRef = new Firebase(URL + 'worker');
    var ref = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);
    $scope.push = $firebaseArray(workRef);
    $scope.pus = $firebaseObject(ref);

    var tanggal = document.getElementById('inputTanggal');
    var gaji = document.getElementById('inputGaji');

    // $scope.loadTags = function (query) {
    //     return $http.get('https://jobcenter.firebaseio.com/tags.json');
    // };

    $scope.registerWorker = function () {
        $scope.push.$add({
            foto: $scope.data.b64,
            nama: $scope.inputNama,
            tanggallahir: tanggal.value,
            tanggal: $scope.inputTanggal.getTime(),
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
            gajiNum: $scope.inputGaji,
            ketrampilan: $scope.tags,
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
            .then(function () {
                alert('Pekerja Telah Berhasil Ditambahkan!');
            }).catch(function (error) {
                alert('Error!')
            });
        $state.go('worker');
    };  //end of push worker
    
    $scope.verifyWorker = function (pus) {
        $rootScope.pus = pus;
        $state.go('worker-verify', { workerId: $rootScope.pus.$id });
    }; //end of verify worker
    
    $scope.publishWorker = function () {
        ref.update({
            ktp: $scope.data.ktp,
            kk: $scope.data.kk,
            sk: $scope.data.sk,
            tersedia: "available"     
             })
        .then(function () {
            alert('Worker Updated!');
        }).catch(function (error) {
            alert('Error!');
        });
        $state.go('worker');
    };  //end of publish worker

    // upload picture and convert to base64
    $scope.data = {}; //init variable
    $scope.click = function () { //default function, to be override if browser supports input type='file'
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';
    var fileSelectKtp = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectKtp.type = 'file';
    var fileSelectKk = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectKk.type = 'file';
    var fileSelectSk = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectSk.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function () { //activate function to begin input file on click
        fileSelect.click();
    }

    fileSelect.onchange = function () { //set callback to action after choosing file
        var f = fileSelect.files[0], r = new FileReader();

        r.onloadend = function (e) { //callback after files finish loading
            $scope.data.b64 = e.target.result;
            $scope.$apply();
            console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

            //here you can send data over your server as desired
        }

        r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
    // end of upload profile picture and convert to base64

    $scope.clickKtp = function () { //activate function to begin input file on click
        fileSelectKtp.click();
    }
    fileSelectKtp.onchange = function () {
        var f = fileSelectKtp.files[0], ktp = new FileReader();

        ktp.onloadend = function (e) { //callback after files finish loading
            $scope.data.ktp = e.target.result;
            $scope.$apply();
            console.log($scope.data.ktp.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        ktp.readAsDataURL(f);
    };  //end of ktp upload 

    $scope.clickKk = function () { //activate function to begin input file on click
        fileSelectKk.click();
    }
    fileSelectKk.onchange = function () {
        var f = fileSelectKk.files[0], kk = new FileReader();

        kk.onloadend = function (e) { //callback after files finish loading
            $scope.data.kk = e.target.result;
            $scope.$apply();
            console.log($scope.data.kk.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        kk.readAsDataURL(f);
    };  //end of kk upload

    $scope.clickSk = function () { //activate function to begin input file on click
        fileSelectSk.click();
    }
    fileSelectSk.onchange = function () {
        var f = fileSelectSk.files[0], sk = new FileReader();

        sk.onloadend = function (e) { //callback after files finish loading
            $scope.data.sk = e.target.result;
            $scope.$apply();
            console.log($scope.data.sk.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        sk.readAsDataURL(f);
    };  //end of sk upload 

    //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 15;

    //sort table
    $scope.sortType = "profesi";
    $scope.sortReverse = true;

    $(function () {
        // Set up the number formatting.
        $('#inputGaji').number(true, '', '.');
        $('#inputGajih').number(true, '', '.');

        //https://github.com/customd/jquery-number.
    });    

    // $scope.filter = {};
    // $scope.input = {};
    // $scope.apply = function () {
    //     for (prop in $scope.input) {
    //         $scope.filter[prop] = $scope.input[prop];
    //     }
    // };  //end of filter function         

}]); //end register worker controller
//-----------------------------------------------------------//

worker.controller("availableWorker", function($scope, $firebaseArray, $state, $stateParams, $rootScope, $http, $firebaseObject) {
    
    $scope.branches = $firebaseArray(brRef);

    var workRef = new Firebase(URL + 'worker');
    var ref = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);
    $scope.push = $firebaseArray(workRef);
    $scope.pus = $firebaseObject(ref);
    
    $scope.updateWorker = function (pus) {
        $rootScope.pus = pus;
        $state.go('worker-edit', {workerId: $rootScope.pus.$id});        
    }; //end of update worker
  
  var tanggal = document.getElementById('inputTanggal');
  var gaji = document.getElementById('inputGaji');
   
  $scope.editWorker = function () {      
    $scope.pus.$save();
    ref.update({tanggallahir: tanggal.value, gaji: gaji.value})
    .then(function() {
        alert('Pekerja Telah Di Update!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('worker-available');
  };  //end of edit worker
  
  $scope.removeWorker = function (pus) {         
    $scope.pus.$remove()
    .then(function() {
        alert('Pekerja Telah Di Hapus!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('worker-available');
  };  //end of remove worker
  
    //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 15;

    //sort table
    $scope.sortType = "profesi";
    $scope.sortReverse = true;
    
    // upload picture and convert to base64
    $scope.data = {}; //init variable
    $scope.click = function () { //default function, to be override if browser supports input type='file'
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';
    var fileSelectKtp = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectKtp.type = 'file';
    var fileSelectKk = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectKk.type = 'file';
    var fileSelectSk = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelectSk.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function () { //activate function to begin input file on click
        fileSelect.click();
    }

    fileSelect.onchange = function () { //set callback to action after choosing file
        var f = fileSelect.files[0], r = new FileReader();

        r.onloadend = function (e) { //callback after files finish loading
            $scope.data.b64 = e.target.result;
            $scope.$apply();
            console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

            //here you can send data over your server as desired
        }

        r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
    // end of upload profile picture and convert to base64

    $scope.clickKtp = function () { //activate function to begin input file on click
        fileSelectKtp.click();
    }
    fileSelectKtp.onchange = function () {
        var f = fileSelectKtp.files[0], ktp = new FileReader();

        ktp.onloadend = function (e) { //callback after files finish loading
            $scope.data.ktp = e.target.result;
            $scope.$apply();
            console.log($scope.data.ktp.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        ktp.readAsDataURL(f);
    };  //end of ktp upload 

    $scope.clickKk = function () { //activate function to begin input file on click
        fileSelectKk.click();
    }
    fileSelectKk.onchange = function () {
        var f = fileSelectKk.files[0], kk = new FileReader();

        kk.onloadend = function (e) { //callback after files finish loading
            $scope.data.kk = e.target.result;
            $scope.$apply();
            console.log($scope.data.kk.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        kk.readAsDataURL(f);
    };  //end of kk upload

    $scope.clickSk = function () { //activate function to begin input file on click
        fileSelectSk.click();
    }
    fileSelectSk.onchange = function () {
        var f = fileSelectSk.files[0], sk = new FileReader();

        sk.onloadend = function (e) { //callback after files finish loading
            $scope.data.sk = e.target.result;
            $scope.$apply();
            console.log($scope.data.sk.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
            //here you can send data over your server as desired
        }
        sk.readAsDataURL(f);
    };  //end of sk upload
    
});  //end available worker controller
//-----------------------------------------------------------//

worker.controller("bookedWorker", function($scope, $firebaseArray, $state, $stateParams, $rootScope) {
        
    var bookRef = new Firebase(URL + 'booked');
    var workRef = new Firebase(URL + 'worker');
    var cancelRef = new Firebase(URL + 'cancel');
    var ref = new Firebase("https://jobcenter.firebaseio.com/booked/" + $stateParams.bookId);
    
    $scope.push = $firebaseArray(bookRef);
    $scope.branches = $firebaseArray(brRef);
    
    //  open modal for meeting
    $scope.modalMeeting = function (pus) {
        $rootScope.pus = pus;    
        $state.go('set-meeting', { bookId: $rootScope.pus.$id });   
    };  
    //  set meeting function
    $scope.setMeeting = function () {                
        workRef.child($scope.pus.id).update({            
            tersedia: "meeting",            
        });
        ref.update({
            status: "meeting",
            meetDate: $scope.tanggal.getTime()
        }) 
        .then(function () {                   
            alert('Set Meeting Berhasil!');                                   
        })
        .catch(function(error) {
            alert('Error!')        
        });        
    };
    
    //  open modal for cancel booking
    $scope.cancelModal = function (pus) {
        $rootScope.pus = pus;    
        $state.go('set-meeting', { bookId: $rootScope.pus.$id });   
    };
    //  cancel booking function
    var date = new Date().getTime();
    
    $scope.cancelBooking = function () {                
        workRef.child($scope.pus.id).update({            
            tersedia: "available",            
        });
        ref.remove();
        cancelRef.push({
            id: $scope.pus.id,
            nama: $scope.pus.nama,
            user: $scope.pus.user,            
            tanggal: date,
            alasan: $scope.alasan,
            tipe: "Cancel Booking"
        })  
        .then(function () {                   
            alert('Booking di Cancel!');                                   
        })
        .catch(function(error) {
            alert('Error!')        
        });        
    };
    
    //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 15;

    //sort table
    $scope.sortType = "bookDate";
    $scope.sortReverse = true;
    
    //min date to today
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("tanggal").setAttribute("min", today);
    
}); //end booked worker controller
//-----------------------------------------------------------//

worker.controller("meetWorker", function($scope, $firebaseArray, $state, $stateParams, $rootScope) {
        
    var bookRef = new Firebase(URL + 'booked');
    var workRef = new Firebase(URL + 'worker');
    var cancelRef = new Firebase(URL + 'cancel');
    var unRef = new Firebase(URL + 'unavailable');
    var ref = new Firebase("https://jobcenter.firebaseio.com/booked/" + $stateParams.bookId);
    
    $scope.push = $firebaseArray(bookRef);
    $scope.branches = $firebaseArray(brRef);
    
    //  open modal for meeting
    $scope.modalApprove = function (pus) {
        $rootScope.pus = pus;    
        $state.go('meet-modal', { bookId: $rootScope.pus.$id });   
    };  
    //  set meeting function
    $scope.appMeeting = function () {                
        workRef.child($scope.pus.id).update({            
            tersedia: "unavailable",            
        });
        unRef.push({
            nama: $scope.pus.nama,
            id: $scope.pus.id,
            user: $scope.pus.user,
            lokasi: $scope.pus.lokasi,
            email: $scope.pus.email,
            contact: $scope.pus.contact,
            bookDate: $scope.pus.bookDate,
            meetDate: $scope.pus.meetDate,
            appDate: date,
            tempo: $scope.tempo,
            jenis: $scope.jenis
        });
        ref.remove()         
        .then(function () {                   
            alert('Selamat!');                                   
        })
        .catch(function(error) {
            alert('Error!')        
        });        
    };
    
    //  open modal for cancel booking
    $scope.cancelModal = function (pus) {
        $rootScope.pus = pus;    
        $state.go('meet-modal', { bookId: $rootScope.pus.$id });   
    };
    //  cancel booking function
    var date = new Date().getTime();
    
    $scope.cancelMeeting = function () {                
        workRef.child($scope.pus.id).update({            
            tersedia: "available",            
        });
        ref.remove();
        cancelRef.push({
            id: $scope.pus.id,
            nama: $scope.pus.nama,
            user: $scope.pus.user,            
            tanggal: date,
            alasan: $scope.alasan,
            tipe: "Cancel Meeting"
        })  
        .then(function () {                   
            alert('Meeting Telah di Cancel!');                                   
        })
        .catch(function(error) {
            alert('Error!')        
        });        
    };
    
    //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 15;

    //sort table
    $scope.sortType = "meetDate";
    $scope.sortReverse = true;        
    
}); //end meet worker controller
//-----------------------------------------------------------//

worker.controller("unWorker", function($scope, $firebaseArray, $state, $stateParams, $rootScope)  {
    var unRef = new Firebase(URL + 'unavailable');
    $scope.push = $firebaseArray(unRef);
    $scope.branches = $firebaseArray(brRef);
    
    //pagination
    $scope.currentPage = 1;
    $scope.pageSize = 15;
    
});