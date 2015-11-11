(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MainController', function ($scope, $http) {
      $scope.todos = [];
      $scope.lists = [];
      $scope.formData = {};


      //Show Lists
      $http.get('/api/lists')
        .success(function (data) {
          $scope.lists = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });

      //Create Lists
      $scope.createList = function () {
        $http.post('/api/lists', $scope.formData)
          .success(function (data) {
            $scope.formData = {};
            $scope.lists = data;
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
