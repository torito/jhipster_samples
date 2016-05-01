(function() {
    'use strict';

    angular
        .module('jhipsterTstApp')
        .controller('BookDetailController', BookDetailController);

    BookDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Book'];

    function BookDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Book) {
        var vm = this;
        vm.book = entity;
        
        var unsubscribe = $rootScope.$on('jhipsterTstApp:bookUpdate', function(event, result) {
            vm.book = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
