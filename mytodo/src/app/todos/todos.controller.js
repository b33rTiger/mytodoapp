(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('TodoController', function ($scope, $routeParams, $http) {
      $scope.todos = [];
      $scope.lists = [];
      $scope.formData = {};
      $scope.listId = $routeParams.listId;
      $scope.listName = $routeParams.listName;
      $scope.listDescription = $routeParams.listDescription;

      //Show One List of Todos
      $http.get('/api/todos?listId='+$scope.listId)
        .success(function (data) {
          $scope.todos = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        })

      //Create Todo
      $scope.createTodo = function () {
        $scope.formData.listId = $scope.listId;
        $http.post('/api/todos', $scope.formData)
          .success(function (data) {
            $scope.formData = {};
            $scope.todos = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      };

      //Delete Todos
      $scope.deleteTodo = function (id) {
        $http.post('/api/delete/' + id, {listId: $scope.listId})
          .success(function (data) {
            $scope.todos = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      };

      //Edit Todos
      $scope.editTodo = function (id, updatedItem) {
        $http.post('/api/edit/' + id, {item: updatedItem, listId: $scope.listId})
          .success(function (data) {
            $scope.todos = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      };

    });

})();
