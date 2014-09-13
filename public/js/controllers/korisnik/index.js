'use strict';

angular.module('mean.korisnik').controller('IndexKorisnikCtrl',  ['$scope', '$stateParams', '$location', 'Global', 'Kategorije', function ($scope, $stateParams, $location, Global, Kategorije) {



    $scope.nadjiKategorije = function() {
        Kategorije.query(function(kategorije) {
            $scope.kategorije = kategorije;
        });

    };


}]);
