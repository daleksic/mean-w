'use strict';

//Korisnici service used for korisnici REST endpoint
angular.module('mean.admin').factory('Korisnici', ['$resource', function($resource) {
    return $resource('/admin/korisnici/:korisnikId', {
        korisnikId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
