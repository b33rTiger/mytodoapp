(function() {
  'use strict';

angular
  .module('mytodo')
  .factory('TodoService', ['$http','$q', function ($http, $q) {
    var service = {};

    // service.getLists = function (boardId) {
    //   var deferred = $q.defer();
    //   $http.get('/api/lists?boardId='+ boardId)
    //     .success(function (data) {
    //       deferred.resolve(data);
    //     })
    //     .error(function (data) {
    //       deferred.reject('Error: ', data);
    //     });
    //     return deferred.promise;
    // };

    service.getTodos = function (listId) {
      var deferred = $q.defer();
      $http.get('/api/todos?listId=' + listId)
        .success( function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    service.createTodo = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/todos', formData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    service.deleteTodo = function (id) {
      var deferred = $q.defer();
      $http.post('/api/delete/todo/' + id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    return service;
  }]);
})();