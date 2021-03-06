(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('ListController', ['ListService', 'TodoService', '$log', '$routeParams', '$rootScope', '$cookieStore', function (ListService, TodoService, $log, $routeParams, $rootScope, $cookieStore) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.formData = {};
      vm.listId = vm.list;
      vm.boardId = $routeParams.boardId;
      vm.boardName = $routeParams.boardName;
      vm.memberName = $cookieStore.get('globals').currentUser.name;

      //Show Lists
      ListService.getLists(vm.boardId)
        .then(function (data) {
          vm.lists = data;
        })
        .catch(function (data) {
          $log.log(data);
        });

      //Create Lists
      vm.createList = function () {
        vm.formData.boardId = vm.boardId;
        ListService.createList(vm.formData)
          .then(function (data) {
            vm.lists.push(data);
            vm.formData = {};
          })
          .catch(function (data) {
            $log.log(data);
          });
      };

      //Delete Lists
      vm.deleteList = function (id) {
        ListService.deleteList(id)
          .then(function (data) {
            for (var i = 0; i < vm.lists.length; i++) {
              if (vm.lists[i]._id == data._id) {
                vm.lists.splice(i, 1);
                break;
              }
            }
          })
          .catch(function (data) {
            $log.log('Error: ' + data);
          });
      };
    }]);
})();
