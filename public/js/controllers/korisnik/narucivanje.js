'use strict';

angular.module('mean.korisnik').controller('KorisnikNarucivanjeCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Korpa', 'Narudzbe', 'NaruceniProizvodi',  function ($scope, $stateParams, $location, Global, Korpa, Narudzba, NaruceniProizvodi) {

   $scope.global = Global;
   $scope.adresaPoruka = '';
   $scope.nacinPlacanjaPoruka = '';

   $scope.proizvodi = Korpa.getProizvodi();
   $scope.total = Korpa.ukupnaCena();

  $scope.naciniPlacanja = [
      {'nacin': 'kreditnom karticom'},
      {'nacin': 'čekom/novcem'}
  ];

  $scope.posaljiNarudzbinu = function(){
     if($scope.adresaPosiljaoca.length != 0 && $scope.nacinSelect != null){
                    var narudzba = new Narudzba({
                          adresa: $scope.adresaPosiljaoca,
                          nacinPlacanja: $scope.nacinSelect.nacin,
                          ukupnaCena: $scope.total,
                          datum: new Date(),
                          korisnik: $scope.global.user._id

                      });

                      narudzba.$save(function(response) {

                          for(var i=0; i <$scope.proizvodi.length; i++){

                               var naruceniProizvod = new NaruceniProizvodi({
                                     cenaProizvoda: $scope.proizvodi[i].jedinicnaCena,
                                     kolicina: $scope.proizvodi[i].kolicina,
                                     narudzba: response._id,
                                     proizvod: $scope.proizvodi[i].id


                                 });
                                 naruceniProizvod.$save(function(response) {
                                     Korpa.ukloniSve();
                                     $scope.proizvodi = Korpa.getProizvodi();
                                     $scope.setProizvodiKorpa($scope.proizvodi);
                                     $location.path('/narucivanje/zahvalnica');

                                 });

                          }

                      });
      }else{
           if($scope.adresaPosiljaoca.length == 0){

               $scope.adresaPoruka = 'Adresa ne sme biti prazna!';

           }
           if($scope.nacinSelect == null){

                $scope.nacinPlacanjaPoruka = 'Način plaćanja ne sme biti prazan!';

           }


      }
    };

    $scope.prikaziPoruku = function(adresaPosiljaoca){


        if(adresaPosiljaoca.length == 0){

            $scope.adresaPoruka = 'Adresa ne sme biti prazna!';

        }else{

          $scope.adresaPoruka = '';

        }

    };


        $scope.prikaziPorukuNacinPlacanja = function(nacinPlacanja){


            if(nacinPlacanja == null){

                  $scope.nacinPlacanjaPoruka = 'Način plaćanja ne sme biti prazan!';

            }else{

              $scope.nacinPlacanjaPoruka = '';

            }

        };

}]);
