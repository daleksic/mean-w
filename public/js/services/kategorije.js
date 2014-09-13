'use strict';

//Kategorije service used for kategorije REST endpoint
angular.module('mean.admin').factory('Kategorije', ['$resource', function($resource) {
    return $resource('/admin/kategorije/:kategorijaId', {
        kategorijaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
