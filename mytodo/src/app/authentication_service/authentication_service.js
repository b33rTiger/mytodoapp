(function () {
  'use strict';

  angular
      .module('mytodo')
      .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.login = login;
    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;

    return service;

    // Use the email and password to login. The Callback will receive and object with the username and token
    function login(email, password, callback) {

      $http.post('/authenticate', { email: email, password: password })
         .success(function (res) {
             callback({ name: name, id: id, token: res.body.token });
         });

    }

    // Store credentials for reuse. They are stored in $rootScope for the current app session.
    // Stored in the $cookieStore for use if the app is reloaded
    function setCredentials(data) {
      console.log('set cred: ', data);
      $rootScope.globals = {
        currentUser: {
          email: data.email,
          name: data.name,
          id: data.id,
          token: data.token
        }
      };

      $http.defaults.headers.common['X-ACCESS-TOKEN'] = data.token;
      $cookieStore.put('globals', $rootScope.globals);
    }

    // Cleanup the stored credentials
    function clearCredentials() {
      console.log('clear creds');
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }
})();