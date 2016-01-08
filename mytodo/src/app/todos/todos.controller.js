(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('TodoController', ['TodoService', '$log', '$scope', '$http', function (TodoService, $log, $scope, $http) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.formData = {};

      //Get Todos
      vm.getTodos = function (listId) {
        TodoService.getTodos(listId)
          .then(function (data) {
            vm.todos = data;
          })
          .catch(function (data) {
            $log.log(data);
          });
      };

      //Create Todo
      vm.createTodo = function (id) {
        vm.formData.listId = id;
        TodoService.createTodo(vm.formData)
          .then(function (data) {
            vm.todos.push(data);
            vm.formData = {};
          })
          .catch(function (data) {
            $log.log(data);
          });
      };

      //Delete Todos
      vm.deleteTodo = function (id) {
        TodoService.deleteTodo(id)
          .then(function (data) {
            for (var i = 0; i < vm.todos.length; i++) {
              if (vm.todos[i]._id == data._id) {
                vm.todos.splice(i, 1);
                break;
              }
            }
          })
          .catch(function (data) {
            $log.log(data);
          });
      };

      //Edit Todos
      vm.editTodo = function (id, updatedItem) {
        $http.post('/api/edit/' + id, {item: updatedItem, listId: vm.listId})
          .success(function (data) {
            vm.todos = data;
          })
          .catch(function (data) {
            $log.log(data);
          });
      };

    }]);

})();
