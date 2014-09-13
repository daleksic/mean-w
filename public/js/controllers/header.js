'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global','$location', function ($scope, Global, $location) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    }];

    $scope.isCollapsed = false;

    $scope.ruta = function(putanja){

      $location.path(putanja);

    }
}])
.controller('NavbarController', ['$scope', 'Global','$location', function ($scope, Global, $location) {

      $scope.global = Global;
      $scope.ruta = function(putanja){
            if(putanja === '/narucivanje'){

                 if($scope.proizvodiKorpa.length != 0){

                   $location.path(putanja);

                 }else{

                   alert('Nemate proizvoda u korpi za narudzbu!');
                 }

            }else{
                $location.path(putanja);
            }
      }
}]);
