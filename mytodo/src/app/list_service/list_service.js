(function() {
  'use strict';

angular
  .module('mytodo')
  .factory('ListService', ['$http','$q', function ($http, $q) {
    var service = {};

    service.getLists = function (boardId) {
      var deferred = $q.defer();
      $http.get('/api/lists?boardId='+ boardId)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    service.createList = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/lists', formData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    service.deleteList = function (id) {
      var deferred = $q.defer();
      console.log(id);
      $http.post('/api/delete/list/' + id)
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