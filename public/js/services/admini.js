'use strict';

//Admini service used for admini REST endpoint
angular.module('mean.admin').factory('Admini', ['$resource', function($resource) {
    return $resource('admins/:adminId', {
        adminId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
