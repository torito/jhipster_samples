(function () {
    'use strict';

    angular
        .module('jhipsterTstApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
