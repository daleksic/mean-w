'use strict';

angular.module('mean.admin').controller('KategorijeCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Kategorije','$upload', 'Proizvodi', function ($scope, $stateParams, $location, Global, Kategorije, $upload, Proizvodi) {

      $scope.files = [];

      // ng modeli za dodavanje kategorije
      $scope.naziv = '';
      $scope.malaFotografija = '';
      $scope.velikaFotografija = '';

      // poruke o validaciji
      $scope.nazivPoruka = '';
      $scope.velikaSlikaPoruka = '';
      $scope.malaSlikaPoruka = '';

      $scope.nazivIzmenaPoruka= '';
      $scope.velikaSlikaIzmenaPoruka= '';
      $scope.malaSlikaIzmenaPoruka= '';

      // ng modeli za izmenu kategorije
      $scope.velikaSlikaIzmena = '';
      $scope.malaSlikaIzmena = '';


      $scope.proizvodiS = [];

     $scope.ruta = function( putanja ){

           $location.path(putanja);
     };



      $scope.nadjiKategorije = function() {
          Kategorije.query(function(kategorije) {
              $scope.kategorije = kategorije;
          });

          Proizvodi.query(function(proizvodi) {
              $scope.proizvodiS = proizvodi;
          });

      };

      $scope.nadjiKategorijuPoParametru = function() {
         Kategorije.get({
             kategorijaId: $stateParams.kategorijaId
         }, function(kategorija) {
             $scope.kategorija = kategorija;
             $scope.velikaSlikaIzmenaPoruka =  $scope.kategorija.velikaSlika;
             $scope.malaSlikaIzmenaPoruka = $scope.kategorija.malaSlika;
         });


      };

      $scope.proveraBrisanjaKategorije = function(kategorija){

          var postoji = false;

          if($scope.proizvodiS.length != 0){

             for(var i = 0; i < $scope.proizvodiS.length; i++){

               if($scope.proizvodiS[i].kategorija._id == kategorija._id)
                  postoji = true;
             }

             return postoji;

          }else{

            return postoji;
          }

        };

      $scope.izbrisiKategoriju = function(id){


             var kategorija;

             for (var i in $scope.kategorije) {
                  if ($scope.kategorije[i]._id === id) {
                      kategorija = $scope.kategorije[i];
                  }
              }

            var postoji = $scope.proveraBrisanjaKategorije(kategorija);

             if (kategorija && postoji == false) {
                 kategorija.$remove();

                 for (var i in $scope.kategorije) {
                     if ($scope.kategorije[i] === kategorija) {
                         $scope.kategorije.splice(i, 1);
                     }
                 }
             }else {
                 alert('Kategoriju nije moguće obrisati jer postoji u nekom proizvodu!');
                 $location.path('/admin/kategorije');
             }


      }
      $scope.izmeniKategoriju = function(){

            var kategorija = $scope.kategorija;
            var velikaSlika = '';
            var malaSlika = '';
            if($scope.kategorija.naziv.length == 0){

                $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan!';

            }else{

                  $scope.nazivIzmenaPoruka = '';

                  if($scope.velikaSlikaIzmena.name == null){
                    velikaSlika = kategorija.velikaSlika;

                  }else{

                    velikaSlika = '../img/uploadedImages/' + $scope.velikaSlikaIzmena.name;

                  }

                  if($scope.malaSlikaIzmena.name == null){
                    malaSlika = kategorija.malaSlika;


                  }else{

                    malaSlika = '../img/uploadedImages/' + $scope.malaSlikaIzmena.name;

                  }

                  kategorija.velikaSlika = velikaSlika;
                  kategorija.malaSlika = malaSlika;


                  if (!kategorija.updated) {
                      kategorija.updated = [];
                  }
                  kategorija.updated.push(new Date().getTime());

                  kategorija.$update(function() {
                      $location.path('/admin/kategorije/' + kategorija._id);
                  });

                  if($scope.malaSlikaIzmena.name != null && $scope.velikaSlikaIzmena.name != null){
                      $scope.files.push($scope.velikaSlikaIzmena);
                      $scope.files.push($scope.malaSlikaIzmena);

                      $scope.start($scope.files);

                  }
            }

      }

      $scope.dodajKategoriju = function() {


            if(($scope.naziv.length == 0) || ($scope.velikaFotografija.name == null) || ($scope.malaFotografija.name == null)){

                 if($scope.naziv.length == 0)
                       $scope.nazivPoruka = 'Naziv ne sme biti prazan!';

                if($scope.velikaFotografija.name == null)
                      $scope.velikaSlikaPoruka = 'Velika slika ne sme biti prazan!';

                if($scope.malaFotografija.name == null)
                      $scope.malaSlikaPoruka = 'Mala slika ne sme biti prazan!';

            }else {

              $scope.nazivPoruka = '';
              $scope.velikaSlikaPoruka = '';
              $scope.malaSlikaPoruka = '';


              var kategorija = new Kategorije({
                naziv: $scope.naziv,
                velikaSlika: '../img/uploadedImages/' + $scope.velikaFotografija.name,
                malaSlika: '../img/uploadedImages/' + $scope.malaFotografija.name
              });

              kategorija.$save(function(response) {
                $location.path('/admin/kategorije/' + response._id);

              });


              $scope.files.push($scope.velikaFotografija);
              $scope.files.push($scope.malaFotografija);

              $scope.start($scope.files);

              $scope.naziv = '';
              $scope.malaFotografija = '';
              $scope.velikaFotografija = '';
            }

      };



     $scope.start = function(file_array) {

          for (var i = 0; i < file_array.length; i++) {
                    var file = file_array[i];

                    $scope.upload = $upload.upload({
                      url: '/upload', //upload.php script, node.js route, or servlet url
                      method: 'POST',
                      headers: {'Content-Type':  undefined},
                      //withCredentials: true,
                   data: { tip: 'kategorija'},
                      file: file, // or list of files ($files) for html5 only
                      fileFormDataName: 'myFile'
                    }).progress(function(evt) {
                      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                      // file is uploaded successfully
                      console.log('success');

                    })
                    .error(function(err){
                      console.log(err);
                    });

            }

      };


      $scope.proveriNaziv = function(naziv) {

          if(naziv.length == 0){

            $scope.nazivPoruka = 'Naziv ne sme biti prazan!';

          }else{

            $scope.nazivPoruka = '';
          }

      };

      $scope.proveriNazivIzmena = function(naziv){

           if(naziv.length == 0){

             $scope.nazivIzmenaPoruka = 'Naziv ne sme biti prazan!';

           }else{

             $scope.nazivIzmenaPoruka = '';
           }

      };


}]);
/*.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);*/
