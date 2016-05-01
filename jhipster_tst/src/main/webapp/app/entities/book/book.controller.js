(function() {
    'use strict';

    angular
        .module('jhipsterTstApp')
        .controller('BookController', BookController);

    BookController.$inject = ['$scope', '$state', 'DataUtils', 'Book', 'ParseLinks', 'AlertService'];

    function BookController ($scope, $state, DataUtils, Book, ParseLinks, AlertService) {
        var vm = this;
        vm.books = [];
        vm.predicate = 'id';
        vm.reverse = true;
        vm.page = 0;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.loadAll = function() {
            Book.query({
                page: vm.page,
                size: 20,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.books.push(data[i]);
                }
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        };
        vm.reset = function() {
            vm.page = 0;
            vm.books = [];
            vm.loadAll();
        };
        vm.loadPage = function(page) {
            vm.page = page;
            vm.loadAll();
        };

        vm.loadAll();

    }
})();
