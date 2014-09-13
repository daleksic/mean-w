'use strict';

angular.module('mean.admin').controller('KorisniciCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Korisnici', function ($scope, $stateParams, $location, Global, Korisnici) {

      $scope.global = Global;

    $scope.nazivFloatingLabel = false;
     $scope.adresaFloatingLabel = false;
    $scope.proizvodjac = {'naziv': '', 'adresa': ''};

     $scope.ruta = function( putanja ){

           $location.path(putanja);
     }

 /*    $scope.showFloatingLabel = function(label){

         var nazivBioUpisan = false;

         if(label == 'naziv'){

             if($scope.proizvodjac.naziv.length > 0){
              //  $scope.nazivFloatingLabel = false;
                  nazivBioUpisan = true;
                 return true;
             }else if(($scope.nazivFloatingLabel == true) && ($scope.proizvodjac.naziv.length == 0)){
                  console.log('naziv');
                // $scope.nazivFloatingLabel = false;

                 if(nazivBioUpisan == true){

                      return true;
                 }else if(nazivBioUpisan == false) {
                      return false;

                 }

             }else {

                  return false;
             }

         }else if(label == 'adresa'){

              if($scope.proizvodjac.adresa.length > 0){
              //  $scope.adresaFloatingLabel = false;
                 return true;
             }else if(($scope.adresaFloatingLabel == true) && ($scope.proizvodjac.adresa.length == 0)){
                  console.log('adresa');
                // $scope.adresaFloatingLabel = false;
                  return true;
             }else {

                  return false;
             }
         }
     }*/

    $scope.nadjiKorisnike = function() {
        Korisnici.query(function(korisnici) {
            $scope.korisnici = korisnici;
        });

    };

      $scope.nadjiKorisnika = function() {
            Korisnici.get({
                korisnikId: $stateParams.korisnikId
            }, function(korisnik) {
                $scope.korisnik = korisnik;
            });


      };

       $scope.izbrisiKorisnika = function(id) {



           var korisnik;

            for (var i in $scope.korisnici) {
                if ($scope.korisnici[i]._id === id) {
                    korisnik = $scope.korisnici[i];
                }
            }

           if (korisnik) {
               korisnik.$remove();

               for (var i in $scope.korisnici) {
                   if ($scope.korisnici[i] === korisnik) {
                       $scope.korisnici.splice(i, 1);
                   }
               }
           }else {

               $location.path('/admin/korisnici');
           }
    };

}]);
