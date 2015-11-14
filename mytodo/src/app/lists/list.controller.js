(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('ListController', function ($scope, $routeParams, $http) {
      $scope.todos = [];
      $scope.lists = [];
      $scope.formData = {};
      $scope.listId = $scope.list;
      $scope.boardId = $routeParams.boardId;
      $scope.boardName = $routeParams.boardName;

      //Show Lists
      $http.get('/api/lists?boardId='+$scope.boardId)
        .success(function (data) {
          $scope.lists = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });

      //Create Lists
      $scope.createList = function () {
        $scope.formData.boardId = $scope.boardId;
        $http.post('/api/lists', $scope.formData)
          .success(function (data) {
            $scope.formData = {};
            $scope.lists = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      };

      //Create Todo
      // $scope.createTodo = function (id) {
      //   $scope.formData.listId = id;
      //   $http.post('/api/todos', $scope.formData)
      //     .success(function (data) {
      //       $scope.formData = {};
      //       $scope.todos = data;
      //     })
      //     .error(function (data) {
      //       console.log('Error: ' + data);
      //     })
      // };

      //Delete Lists
      $scope.deleteList = function (id) {
        $http.post('/api/delete/lists/' + id)
          .success(function (data) {
            $scope.lists = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      };

      //Edit Lists
      $scope.editList = function (id, updatedItem) {
        $http.post('/api/edit/lists/' + id, {name: updatedItem})
          .success(function (data) {
            $scope.lists = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      };
    });

})();
