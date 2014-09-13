'use strict';

angular.module('mean.webShop').controller('WebShopCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Korpa', function ($scope, $stateParams, $location, Global, Korpa) {
    $scope.global = Global;
    Korpa.init('proizvodi');
    $scope.proizvodiKorpa = [];
    $scope.proizvodiKorpa = Korpa.getProizvodi();

    $scope.setProizvodiKorpa = function(value) {
        $scope.proizvodiKorpa = value;
    }


}]);
