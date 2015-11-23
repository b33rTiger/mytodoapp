(function() {
  'use strict';

angular
  .module('mytodo')
  .factory('BoardService', ['$http','$q','$rootScope', '$cookieStore', function ($http, $q, $rootScope, $cookieStore) {
    var service = {};
    var currentUser = $cookieStore.get('globals').currentUser;
    console.log('board serv cook: ', $cookieStore.get('globals'));

    service.getBoards = function () {
      var deferred = $q.defer();
      var owner_id = currentUser.id;
      $http.get('/api/boards/'+ owner_id)
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