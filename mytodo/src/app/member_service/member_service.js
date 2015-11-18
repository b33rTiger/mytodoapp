(function() {
  'use strict';

angular
  .module('mytodo')
  .factory('MemberService', ['$http','$q', function ($http, $q) {
    var service = {};

    service.getBoards = function () {
      var deferred = $q.defer();
      $http.get('/api/boards')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject('Error: ', data);
        });
        return deferred.promise;
    };

    service.createBoard = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/boards', formData)
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