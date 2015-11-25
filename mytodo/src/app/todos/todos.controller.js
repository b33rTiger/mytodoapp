(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('TodoController', ['TodoService', '$log', '$scope', function (TodoService, $log, $scope) {
      var vm = this;
      vm.todos = [];
      vm.lists = [];
      vm.formData = {};
      // vm.listId = $routeParams.listId;
      // vm.listName = $routeParams.listName;
      // vm.listDescription = $routeParams.listDescription;

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
        $http.post('/api/delete/' + id, {listId: vm.listId})
          .success(function (data) {
            vm.todos = data;
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
