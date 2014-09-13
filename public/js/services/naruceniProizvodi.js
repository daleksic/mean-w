'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.korisnik').factory('NaruceniProizvodi', ['$resource', function($resource) {
    return $resource('/naruceniProizvodi/:naruceniProizvodId', {
        naruceniProizvodId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
