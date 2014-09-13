'use strict';

angular.module('mean.korisnik').controller('KorisnikNarudzbeCtrl', ['$scope', '$stateParams', '$location', 'Global',  'Narudzbe', 'NaruceniProizvodi',  function ($scope, $stateParams, $location, Global,  Narudzbe, NaruceniProizvodi) {

   $scope.global = Global;
   $scope.narudzbe= [];
   $scope.naruceniProizvodi= [];
   $scope.activeRow = false;
   $scope.activeCell = false;

   $scope.rowOrders = [];
   $scope.rowsCells = [];


   $scope.ucitajNarudzbe = function(){

     Narudzbe.query(function(narudzbe) {

        for(var i=0; i < narudzbe.length; i++){
             if( narudzbe[i].korisnik._id == $scope.global.user._id)
                  $scope.narudzbe.push(narudzbe[i]);

            /*  var keyRow = 'activeRow' + i;
              var keyCell = 'activeCell' + i;
              var row = {keyRow: false};
              var cell = {keyCell: false};*/

              $scope.rowOrders.push(false);
              $scope.rowsCells.push(false);


        }
    //    console.log($scope.narudzbe);

     });
   };

   $scope.prikaziProizvode = function(id,indeks){
      $scope.naruceniProizvodi = [];
      NaruceniProizvodi.query(function(naruceniProizvodi){
             for(var i=0; i < naruceniProizvodi.length; i++){
                  if( naruceniProizvodi[i].narudzba._id == id)
                       $scope.naruceniProizvodi.push(naruceniProizvodi[i]);


             }

      });
       $scope.rowOrders[indeks]= true;
       $scope.rowsCells[indeks] = true;


        for(var i=0; i <  $scope.rowOrders.length; i++){
             if( i != indeks)
                  $scope.rowOrders[i]= false;
        }

        for(var i=0; i <  $scope.rowsCells.length; i++){
          if( i != indeks)
            $scope.rowsCells[i]= false;
          }
      }
}]);
