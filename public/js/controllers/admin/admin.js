'use strict';

angular.module('mean.admin').controller('AdminiCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Admini', function ($scope, $stateParams, $location, Global, Admini) {

    $scope.global = Global;

    $scope.admin = {'korisnickoIme': '', 'lozinka': ''};

    $scope.korisnickoImePoruka = '';
    $scope.lozinkaPoruka = '';

     $scope.ruta = function( putanja ){

           $location.path(putanja);
     }

    $scope.nadjiAdmine = function() {
        Admini.query(function(admini) {
            $scope.admini = admini;
        });

    };

    $scope.dodajAdmina = function() {

      if(($scope.admin.korisnickoIme.length == 0 ) || ($scope.admin.lozinka.length == 0 )){

          if($scope.admin.korisnickoIme.length == 0 )
             $scope.korisnickoImePoruka = 'Korisničko ime ne sme biti prazno!';

          if($scope.admin.lozinka.length == 0 )
              $scope.lozinkaPoruka = 'Lozinka ne sme biti prazna!';

      }else{

          $scope.korisnickoImePoruka = '';
          $scope.lozinkaPoruka = '';

          var admin = new Admini({
              korisnickoIme: $scope.admin.korisnickoIme,
              lozinka: $scope.admin.lozinka
          });
          admin.$save(function(response) {
              $location.path('/admin/admini');

          });

         $scope.admin.korisnickoIme = '';
         $scope.admin.lozinka = '';

      }


    };

      

    $scope.proveriKorisnickoIme = function(korisnickoIme){

         if(korisnickoIme.length == 0){

            $scope.korisnickoImePoruka = 'Korisničko ime ne sme biti prazno!';
         }else{

            $scope.korisnickoImePoruka = '';
         }
    };

    $scope.proveriLozinku = function(lozinka){

           if(lozinka.length == 0){

             $scope.lozinkaPoruka = 'Lozinka ne sme biti prazna!';

           }else{

             $scope.lozinkaPoruka = '';
           }
    };

}]);
