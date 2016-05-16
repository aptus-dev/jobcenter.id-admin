var worker = angular.module("worker", ["firebase", "angularUtils.directives.dirPagination", "ngTagsInput"]);

var URL = "https://jobcenter.firebaseio.com/";

worker.controller("registerWorker", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$http', '$firebaseObject', function ($scope, $firebaseArray, $state, $stateParams, $rootScope, $http, $firebaseObject) {

    var brRef = new Firebase(URL + 'branch');
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
    $scope.sortType = "kategori";
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

worker.controller("availableWorker", function($scope, $firebaseArray, $state, $stateParams, $rootScope, $http, $firebaseObject){
    var brRef = new Firebase(URL + 'branch');
    $scope.branches = $firebaseArray(brRef);

    var workRef = new Firebase(URL + 'worker');
    var ref = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);
    $scope.push = $firebaseArray(workRef);
    $scope.pus = $firebaseObject(ref);
});  