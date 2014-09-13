'use strict';

angular.module('mean.admin').controller('ProizvodiCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Proizvodi', 'Kategorije', 'Proizvodjaci', '$upload', function ($scope, $stateParams, $location, Global, Proizvodi, Kategorije, Proizvodjaci, $upload) {



      $scope.files = [];
      $scope.proizvodjaciIzmena = [];

      // ng modeli proizvoda
      $scope.naziv = '';
      $scope.opis = '';
      $scope.cena = '';
      $scope.malaSlika = '';
      $scope.velikaSlika = '';
      $scope.proizvodjacSelect;
      $scope.kategorijaSelect;

      // ng modeli za izmenu
      $scope.velikaSlikaIzmena = '';
      $scope.malaSlikaIzmena = '';
      $scope.proizvod = '';

      //poruke o validaciji
      $scope.nazivPoruka = '';
      $scope.opisPoruka = '';
      $scope.cenaPoruka = '';
      $scope.velikaSlikaPoruka = '';
      $scope.malaSlikaPoruka = '';
      $scope.proizvodjacPoruka = '';
      $scope.kategorijaPoruka = '';

      $scope.nazivIzmenaPoruka = '';
      $scope.opisIzmenaPoruka = '';
      $scope.cenaIzmenaOpis = '';
      $scope.velikaSlikaIzmenaPoruka = '';
      $scope.malaSlikaIzmenaPoruka = '';
      $scope.proizvodjacIzmenaPoruka = {'id':'', 'naziv':''};
      $scope.kategorijaIzmenaPoruka = {'id':'', 'naziv':''};


     $scope.ruta = function( putanja ){

           $location.path(putanja);
     }

    $scope.nadjiProizvode = function() {
        Proizvodi.query(function(proizvodi) {
            $scope.proizvodi = proizvodi;
        });

    };

    $scope.nadjiKategorijeIProizvodjace  = function() {
        Kategorije.query(function(kategorije) {
            $scope.kategorije = kategorije;
        });
        Proizvodjaci.query(function(proizvodjaci) {
            $scope.proizvodjaci = proizvodjaci;
        });

    };


    $scope.nadjiProizvodKategorijeProizvodjace = function() {

        Proizvodi.get({
            proizvodId: $stateParams.proizvodId
        }, function(proizvod) {
            $scope.proizvod = proizvod;

            $scope.proizvodjacIzmenaPoruka.naziv = $scope.proizvod.proizvodjac.naziv;
            $scope.proizvodjacIzmenaPoruka.id = $scope.proizvod.proizvodjac._id;

            $scope.kategorijaIzmenaPoruka.naziv = $scope.proizvod.kategorija.naziv;
            $scope.kategorijaIzmenaPoruka.id = $scope.proizvod.kategorija._id;

            $scope.velikaSlikaIzmenaPoruka = $scope.proizvod.velikaSlika;
            $scope.malaSlikaIzmenaPoruka = $scope.proizvod.malaSlika;
        });

        Kategorije.query(function(kategorije) {
            $scope.kategorijeIzmena = kategorije;
        });
        Proizvodjaci.query(function(proizvodjaci) {
           $scope.proizvodjaciIzmena = proizvodjaci;

        });



    };


    $scope.dodajProizvod = function() {
      if(($scope.naziv.length == 0) || ($scope.opis.length == 0) || ($scope.cena.length == 0) || (isNaN($scope.cena)) || ($scope.malaSlika.name == null) || ($scope.velikaSlika.name == null) || ($scope.proizvodjacSelect == null) || ($scope.kategorijaSelect == null)){

          if($scope.naziv.length == 0)
             $scope.nazivPoruka = 'Naziv ne sme biti prazan!';

          if($scope.opis.length == 0)
             $scope.opisPoruka = 'Opis ne sme biti prazan!';

          if($scope.cena.length == 0)
             $scope.cenaPoruka = 'Cena ne sme biti prazan!';

          if(isNaN($scope.cena))
             $scope.cenaPoruka = 'Cena mora biti broj!';

          if($scope.malaSlika.name == null)
               $scope.malaSlikaPoruka = 'Mala slika ne sme biti prazna!';
          if($scope.velikaSlika.name == null)
               $scope.velikaSlikaPoruka = 'Velika slika ne sme biti prazna!';
          if($scope.proizvodjacSelect == null)
              $scope.proizvodjacPoruka = 'Proizvodjac ne sme biti prazan!';
          if($scope.kategorijaSelect == null)
              $scope.kategorijaPoruka = 'Kategorija ne sme biti prazna!';

      }else{

        $scope.nazivPoruka = '';
        $scope.opisPoruka = '';
        $scope.cenaPoruka = '';
        $scope.velikaSlikaPoruka = '';
        $scope.malaSlikaPoruka = '';
        $scope.proizvodjacPoruka = '';
        $scope.kategorijaPoruka = '';

        var proizvodjacId =  $scope.proizvodjacSelect._id;
        var kategorijaId =  $scope.kategorijaSelect._id;

        var proizvod = new Proizvodi({
              naziv: $scope.naziv,
              opis: $scope.opis,
              cena: $scope.cena,
              velikaSlika: '../img/uploadedImages/' + $scope.velikaSlika.name,
              malaSlika: '../img/uploadedImages/' + $scope.malaSlika.name,
              proizvodjac: proizvodjacId,
              kategorija: kategorijaId
          });
          proizvod.$save(function(response) {
              $location.path('/admin/proizvodi/' + response._id);

          });

            $scope.files.push($scope.velikaSlika);
            $scope.files.push($scope.malaSlika);

            $scope.start($scope.files);


            $scope.naziv = '';
            $scope.opis = '';
            $scope.cena = '';
            $scope.velikaSlika = 'null';
            $scope.malaSlika = '';
            $scope.kategorija = '';
            $scope.proizvodjac = '';

      }

    };


    $scope.start = function(file_array) {
      for (var i = 0; i < file_array.length; i++) {
        var file = file_array[i];
        console.log( JSON.stringify(file));
        $scope.upload = $upload.upload({
          url: '/upload', //upload.php script, node.js route, or servlet url
          method: 'POST',
          headers: {'Content-Type':  undefined},
          data: { tip: 'proizvod'},
          file: file,
          fileFormDataName: 'myFile'
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {

          console.log('success');

        })
        .error(function(err){
          console.log(err);
        });

      }

 };

$scope.izbrisiProizvod = function(id){

       var proizvod;

       for (var i in $scope.proizvodi) {
            if ($scope.proizvodi[i]._id === id) {
                proizvod = $scope.proizvodi[i];
            }
        }

       if (proizvod) {
           proizvod.$remove();

           for (var i in $scope.proizvodi) {
               if ($scope.proizvodi[i] === proizvod) {
                   $scope.proizvodi.splice(i, 1);
               }
           }
       }else {

           $location.path('/admin/proizvodi');
       }


};
      $scope.nadjiProizvodPoParametru = function() {
         Proizvodi.get({
             proizvodId: $stateParams.proizvodId
         }, function(proizvod) {
             $scope.proizvod = proizvod;
         });


      };

      $scope.izmeniProizvod = function(){

         var proizvod = $scope.proizvod;



        if((proizvod.naziv.length == 0) || (proizvod.opis.length == 0) || (proizvod.cena.length == 0) || (isNaN(proizvod.cena))  ){

            if(proizvod.naziv.length == 0)
               $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan!';

            if(proizvod.opis.length == 0)
               $scope.opisIzmenaPoruka = 'Opis ne sme biti prazan!';

            if(proizvod.cena.length == 0)
               $scope.cenaIzmenaPoruka = 'Cena ne sme biti prazna!';

            if(isNaN(proizvod.cena))
               $scope.cenaIzmenaPoruka = 'Cena mora biti broj!';

        }else{

              $scope.nazivIzmenaPoruka = '';
              $scope.opisIzmenaPoruka = '';
              $scope.cenaIzmenaPoruka = '';
              $scope.velikaSlikaIzmenaPoruka = '';
              $scope.malaSlikaIzmenaPoruka = '';


              var velikaSlika = '';
              var malaSlika = '';

              var kategorijaId = '';
              var proizvodjacId = '';


              if($scope.velikaSlikaIzmena.name == null){
                velikaSlika = proizvod.velikaSlika;

              }else{

                velikaSlika = '../img/uploadedImages/' + $scope.velikaSlikaIzmena.name;

              }

              if($scope.malaSlikaIzmena.name == null){
                malaSlika = proizvod.malaSlika;


              }else{

                malaSlika = '../img/uploadedImages/' + $scope.malaSlikaIzmena.name;

              }

              proizvod.velikaSlika = velikaSlika;
              proizvod.malaSlika = malaSlika;


              if($scope.proizvodjacSelectIzmena == null){
                proizvodjacId = proizvod.proizvodjac._id;

              }else{

                proizvodjacId = $scope.proizvodjacSelectIzmena._id;

              }

              if($scope.kategorijaSelectIzmena == null){
                kategorijaId = proizvod.kategorija._id;


              }else{

                kategorijaId = $scope.kategorijaSelectIzmena._id;

              }

              proizvod.proizvodjac = proizvodjacId;
              proizvod.kategorija = kategorijaId;



              if (!proizvod.updated) {
                  proizvod.updated = [];
              }
              proizvod.updated.push(new Date().getTime());

              proizvod.$update(function() {
                  $location.path('/admin/proizvodi/' + proizvod._id);
              });

              if($scope.malaSlikaIzmena.name != null && $scope.velikaSlikaIzmena.name != null){
                  $scope.files.push($scope.velikaSlikaIzmena);
                  $scope.files.push($scope.malaSlikaIzmena);

                  $scope.start($scope.files);

              }

        }
      };

      $scope.proveriNaziv = function(naziv){

        if(naziv.length == 0){
          $scope.nazivPoruka = 'Naziv ne sme biti prazan!';
        }else{
          $scope.nazivPoruka = '';
        }

      };

      $scope.proveriOpis = function(opis){

        if(opis.length == 0){
          $scope.opisPoruka = 'Opis ne sme biti prazan!';
        }else{
          $scope.opisPoruka = '';
        }

      };

      $scope.proveriCenu = function(cena){

        if(cena.length == 0){
          $scope.cenaPoruka = 'Cena ne sme biti prazna!';
        }else{

          if(isNaN(cena)){

            $scope.cenaPoruka = 'Cena mora biti broj!';

          }else{

            $scope.cenaPoruka = '';
          }
        }

      };


      $scope.proveriProizvodjaca = function(proizvodjac){

        if(proizvodjac == null){
          $scope.proizvodjacPoruka = 'Proizvodjac ne sme biti prazan!';
        }else{
          $scope.proizvodjacPoruka = '';
        }

      };

      $scope.proveriKategoriju = function(kategorija){

        if(kategorija == null){
          $scope.kategorijaPoruka = 'Kategorija ne sme biti prazna!';
        }else{
          $scope.kategorijaPoruka = '';
        }

      };


      $scope.proveriNazivIzmena = function(naziv){

        if(naziv.length == 0){
          $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan!';
        }else{
          $scope.nazivIzmenaPoruka = '';
        }

      };

      $scope.proveriOpisIzmena = function(opis){

        if(opis.length == 0){
          $scope.opisIzmenaPoruka = 'Opis ne sme biti prazan!';
        }else{
          $scope.opisIzmenaPoruka = '';
        }

      };

      $scope.proveriCenuIzmena = function(cena){

        if(cena.length == 0){
          $scope.cenaIzmenaPoruka = 'Cena ne sme biti prazna!';
        }else{

          if(isNaN(cena)){

            $scope.cenaIzmenaPoruka = 'Cena mora biti broj!';

          }else{

            $scope.cenaIzmenaPoruka = '';
          }
        }

      };


      $scope.proveriProizvodjacaIzmena = function(proizvodjac){

        if(proizvodjac == null){
          $scope.proizvodjacIzmenaPoruka.naziv = $scope.proizvod.proizvodjac.naziv;
        }else{
          $scope.proizvodjacIzmenaPoruka.naziv = '';
        }

      };

      $scope.proveriKategorijuIzmena = function(kategorija){

        if(kategorija == null){
          $scope.kategorijaIzmenaPoruka.naziv = $scope.proizvod.kategorija.naziv;
        }else{
          $scope.kategorijaIzmenaPoruka.naziv = '';
        }

      };

}]);
/*.directive('fileProizvod', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileProizvod);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);*/
