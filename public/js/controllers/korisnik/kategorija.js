'use strict';

angular.module('mean.korisnik').controller('KategorijeKorisnikCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Kategorije', 'Proizvodi', function ($scope, $stateParams, $location, Global, Kategorije, Proizvodi) {

      $scope.proizvodi = [];
      $scope.sort = [
        {'naslov': 'po imenu','predikat': 'ime', "redosled": false},
        {'naslov': 'po ceni, rastući', 'predikat': 'cena', "redosled": false},
        {'naslov': 'po ceni, opadajući', 'predikat': 'cena', "redosled": true}
      ];

    $scope.nadjiKategorijuIProizvode = function() {
        Kategorije.get({
            kategorijaId: $stateParams.kategorijaId
        }, function(kategorija) {
            $scope.kategorija = kategorija;
        });

        Proizvodi.query(function(proizvodi) {

           for(var i=0; i< proizvodi.length; i++){

             if(proizvodi[i].kategorija._id == $stateParams.kategorijaId)

             $scope.proizvodi.push(proizvodi[i]);
           }


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

}]);
