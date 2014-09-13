'use strict';

angular.module('mean.admin').controller('ProizvodjaciCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Proizvodjaci', 'Proizvodi', function ($scope, $stateParams, $location, Global, Proizvodjaci, Proizvodi) {


    $scope.proizvodjac = {'naziv': '', 'adresa': ''};

    // poruke o validaciji
    $scope.nazivPoruka = '';
    $scope.adresaPoruka = '';
    $scope.nazivIzmenaPoruka = '';
    $scope.adresaIzmenaPoruka = '';

    $scope.proizvodiS = [];

     $scope.ruta = function( putanja ){

           $location.path(putanja);
     }


    $scope.nadjiProizovdjace = function() {
        Proizvodjaci.query(function(proizvodjaci) {
            $scope.proizvodjaci = proizvodjaci;
        });

        Proizvodi.query(function(proizvodi) {
            $scope.proizvodiS = proizvodi;
        });

    };

    $scope.dodavanjeProizvodjaca = function() {

       if((this.proizvodjac.naziv.length == 0) || (this.proizvodjac.adresa.length == 0)){

           if(this.proizvodjac.naziv.length == 0)
              $scope.nazivPoruka = 'Naziv ne sme biti prazan';

           if(this.proizvodjac.adresa.length == 0)
              $scope.adresaPoruka = 'Adresa ne sme biti prazan';
       }else{

           $scope.nazivPoruka = '';
           $scope.adresaPoruka = '';

           var proizvodjac = new Proizvodjaci({
               naziv: this.proizvodjac.naziv,
               adresa: this.proizvodjac.adresa
           });
           proizvodjac.$save(function(response) {
               $location.path('/admin/proizvodjaci/' + response._id);

           });

           this.proizvodjac.naziv = '';
           this.proizvodjac.adresa = '';

       }

    };

  $scope.proveraBrisanjaProizvodjaca = function(proizvodjac){

      var postoji = false;



      if($scope.proizvodiS.length != 0){

         for(var i = 0; i < $scope.proizvodiS.length; i++){

           if($scope.proizvodiS[i].proizvodjac._id == proizvodjac._id)
              postoji = true;
         }

         return postoji;

      }else{

        return postoji;
      }

    };

    $scope.izbrisiProizvodjaca = function(id){


           var proizvodjac;


          for (var i in $scope.proizvodjaci) {
                if ($scope.proizvodjaci[i]._id === id) {
                    proizvodjac = $scope.proizvodjaci[i];
                }
            }
           var postoji = $scope.proveraBrisanjaProizvodjaca(proizvodjac);
        
           if (proizvodjac && postoji == false) {
               proizvodjac.$remove();

               for (var i in $scope.proizvodjaci) {
                   if ($scope.proizvodjaci[i] === proizvodjac) {
                       $scope.proizvodjaci.splice(i, 1);
                   }
               }
           }else {
               alert('Proizvođača nije moguće obrisati jer postoji u nekom proizvodu!');
               $location.path('/admin/proizvodjaci');
           }

    }
    $scope.pregledProizvodjaca = function(id){

         $location.path('/admin/proizvodjaci/:' + id);

    }

     $scope.nadjiPoParametru = function() {
        Proizvodjaci.get({
            proizvodjacId: $stateParams.proizvodjacId
        }, function(proizvodjac) {
            $scope.proizvodjac = proizvodjac;
        });


    };


    $scope.izmeniProizvodjaca = function() {
        var proizvodjac = $scope.proizvodjac;

        if((proizvodjac.naziv.length == 0) || (proizvodjac.adresa.length == 0)){
            if(proizvodjac.naziv.length == 0)
                 $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan';
            if(proizvodjac.adresa.length == 0)
                $scope.adresaIzmenaPoruka = 'Adresa ne sme biti prazan';

        }else{
            $scope.nazivIzmenaPoruka = '';
            $scope.adresaIzmenaPoruka = '';

            if (!proizvodjac.updated) {
                proizvodjac.updated = [];
            }
            proizvodjac.updated.push(new Date().getTime());

            proizvodjac.$update(function() {
                $location.path('/admin/proizvodjaci/' + proizvodjac._id);
            });
        }


    };

    $scope.proveriNaziv = function(naziv){

        if(naziv.length == 0){

            $scope.nazivPoruka = 'Naziv ne sme biti prazan';
        }else{

           $scope.nazivPoruka = '';
        }

    };

    $scope.proveriAdresu = function(adresa){

        if(adresa.length == 0){

            $scope.adresaPoruka = 'Adresa ne sme biti prazan';
        }else{

           $scope.adresaPoruka = '';
        }

    };


    $scope.proveriNazivIzmena = function(naziv){

        if(naziv.length == 0){

            $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan';
        }else{

           $scope.nazivIzmenaPoruka = '';
        }

    };

    $scope.proveriAdresuIzmena = function(adresa){

        if(adresa.length == 0){

            $scope.adresaIzmenaPoruka = 'Adresa ne sme biti prazan';
        }else{

           $scope.adresaIzmenaPoruka = '';
        }

    };


}]);
