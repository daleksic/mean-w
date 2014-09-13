'use strict';

angular.module('mean.korisnik').controller('ProizvodiKorisnikCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Kategorije', 'Proizvodi', 'Korpa', function ($scope, $stateParams, $location, Global, Kategorije, Proizvodi, Korpa) {

      $scope.proizvodi = [];

    $scope.nadjiProizvodKategorije = function() {
        Proizvodi.get({
            proizvodId: $stateParams.proizvodId
        }, function(proizvod) {
            $scope.proizvod = proizvod;
        });
        Kategorije.get({
            kategorijaId: $stateParams.kategorijaId
        }, function(kategorija) {
            $scope.kategorija = kategorija;
        });

        Kategorije.query(function(kategorije) {
            $scope.kategorije = kategorije;
        });


    };

    $scope.activeClass = function(id){

      if(id ==  $stateParams.kategorijaId)
        return 'active';

      return '';

    }

    $scope.dodajUKorpu = function(kolicina){

           if(kolicina != ''){
             Korpa.dodajProizvod($scope.proizvod, kolicina);

             $location.path('/korpa');
           }
    }

}]);
