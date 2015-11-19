(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MainController', ['BoardService', '$log', function (BoardService, $log) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.boards = [];
      vm.members = {};
      vm.formData = {};

      //Show Boards
      BoardService.getBoards()
        .then(function (data) {
          vm.boards = data;
        })
        .catch(function (data) {
          $log.error(data);
        });

      //Create Board
      vm.createBoard = function () {
        BoardService.createBoard(vm.formData)
          .then(function (data){
            vm.boards.push(data);
            vm.formData = {};
          })
      };

      // //Delete Lists
      // vm.deleteList = function (id) {
      //   $http.post('/api/delete/lists/' + id)
      //     .success(function (data) {
      //       vm.lists = data;
      //     })
      //     .error(function (data) {
      //       $log.error(data);
      //     });
      // };

      // //Edit Lists
      // vm.editList = function (id, updatedItem) {
      //   $http.post('/api/edit/lists/' + id, {name: updatedItem})
      //     .success(function (data) {
      //       vm.lists = data;
      //     })
      //     .error(function (data) {
      //       $log.error(data);
      //     });
      // };
    }]);

})();
