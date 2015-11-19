(function () {
  'use strict';

  angular
    .module('mytodo')
    .factory('AuthenticationService', ['$http', '$q', '$cookieStore', '$rootScope', 'MemberService', function ($http, $q, $cookieStore, $rootScope, MemberService) {
      var service = {};

      service.login = function (email, password) {
        var deferred = $q.defer();
        $http.post('/api/members/login', {email: email, password: password})
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (data) {
            deferred.reject('Error: ', data);
          });
          return deferred.promise;
      };

      service.setCredentials = function (email, password) {
        $rootScope.globals = {
          currentUser: {
            email: email,
            password: password
          }
        };
        $http.default.headers.common['X-ACCESS-TOKEN'] = $rootScope.globals.currentUser.token;
      }
    }]);
})();