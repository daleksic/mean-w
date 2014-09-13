'use strict';

//Proizvodjaci service used for articles REST endpoint
angular.module('mean.admin').factory('Proizvodjaci', ['$resource', function($resource) {
    return $resource('/admin/proizvodjaci/:proizvodjacId', {
        proizvodjacId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
