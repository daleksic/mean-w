'use strict';

//Narudzbe service used for narudzbe REST endpoint
angular.module('mean.korisnik').factory('Narudzbe', ['$resource', function($resource) {
    return $resource('/narudzbe/:narudzbaId', {
        narudzbaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
