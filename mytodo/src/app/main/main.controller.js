(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MainController', ['BoardService', '$log','$rootScope', '$cookieStore', function (BoardService, $log, $rootScope, $cookieStore) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.boards = [];
      vm.members = {};
      vm.formData = {};
      vm.memberName = $cookieStore.get('globals').currentUser.name;
      vm.owner_id = $rootScope.globals.currentUser.id;

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
        vm.formData.owner_id = vm.owner_id;
        BoardService.createBoard(vm.formData)
          .then(function (data){
            vm.boards.push(data);
            vm.formData = {};
          })
      };
    }]);
})();
