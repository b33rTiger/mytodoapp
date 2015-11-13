(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MainController', function ($scope, $http) {
      $scope.todos = [];
      $scope.lists = [];
      $scope.boards = [];
      $scope.formData = {};


      //Show Boards
      $http.get('/api/boards')
        .success(function (data) {
          $scope.boards = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });

      //Create Board
      $scope.createBoard = function () {
        $http.post('/api/boards', $scope.formData)
          .success(function (data) {
            $scope.formData = {};
            $scope.boards = data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      };

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
