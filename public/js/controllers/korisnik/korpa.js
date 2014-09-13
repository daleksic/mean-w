'use strict';

angular.module('mean.korisnik').controller('KorisnikKorpaCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Korpa', function ($scope, $stateParams, $location, Global, Korpa) {


    //  $scope.proizvodi = [];
       $scope.total = 0;

      $scope.ucitajKorpu = function(){

         $scope.proizvodiKorpa = Korpa.getProizvodi();
         $scope.setProizvodiKorpa($scope.proizvodiKorpa);
         if($scope.proizvodiKorpa.length != 0){

           $scope.total = Korpa.ukupnaCena();

         }else{

           $scope.total = 0;

         }

       };

    $scope.ukloniProizvod = function(indeks){
        Korpa.ukloniProizvod(indeks);
        $scope.proizvodiKorpa.splice(indeks, 1);
        $scope.setProizvodiKorpa($scope.proizvodiKorpa);
        $scope.total = Korpa.ukupnaCena();
    };
    $scope.promeniKolicinu = function(indeks, kolicina){

        Korpa.promeniKolicinu(indeks, kolicina);
        $scope.proizvodiKorpa = Korpa.getProizvodi();
        $scope.setProizvodiKorpa($scope.proizvodiKorpa);
        $scope.total = Korpa.ukupnaCena();
    }

    $scope.ukloniSve = function(){

        Korpa.ukloniSve();
        $scope.proizvodiKorpa = Korpa.getProizvodi();
        $scope.setProizvodiKorpa($scope.proizvodiKorpa);
        $scope.total = Korpa.ukupnaCena();

    }

    $scope.ruta = function(putanja){

        $location.path(putanja);
    };


}]);
