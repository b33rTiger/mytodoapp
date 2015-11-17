(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('ListController', ['ListService', 'TodoService', '$log', '$routeParams', function (ListService, TodoService, $log, $routeParams) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.formData = {};
      vm.listId = vm.list;
      vm.boardId = $routeParams.boardId;
      vm.boardName = $routeParams.boardName;

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

      //Create Todo
      // vm.createTodo = function (listId) {
      //   vm.formData.listId = listId;
      //   console.log(vm.formData);
      //   TodoService.createTodo(vm.formData)
      //     .then(function (data) {
      //       vm.lists.push(data);
      //       vm.formData = {};
      //     })
      //     .catch(function (data) {
      //       $log.log(data);
      //     });
      // };

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

      //Edit Lists
      // $scope.editList = function (id, updatedItem) {
      //   $http.post('/api/edit/lists/' + id, {name: updatedItem})
      //     .success(function (data) {
      //       $scope.lists = data;
      //     })
      //     .error(function (data) {
      //       console.log('Error: ' + data);
      //     });
      // };
    }]);

})();
