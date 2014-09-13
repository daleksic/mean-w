'use strict';

//Proizvodi service used for proizvodi REST endpoint
angular.module('mean.admin').factory('Proizvodi', ['$resource', function($resource) {
    return $resource('/admin/proizvodi/:proizvodId', {
        proizvodId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
