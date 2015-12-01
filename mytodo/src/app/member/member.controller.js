(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MemberController', ['MemberService', 'AuthenticationService', '$log', '$location', function (MemberService, AuthenticationService, $log, $location) {
      var vm = this;
      vm.boards = [];
      vm.members = {};
      vm.formData = {};

    //Create Member
    vm.createMember = function () {
      MemberService.createMember(vm.formData)
        .then(function (data) {
          $location.path('/memberlogin');
        })
        .catch(function (data) {
          $log.error(data);
        });
    };

    //Login Member
    vm.loginMember = function () {
      MemberService.loginMember(vm.formData)
        .then(function (data) {
          AuthenticationService.setCredentials(data);
          $location.path('/boards/');
        })
        .catch(function (data) {
          $log.error(data);
        });
    };

    //Logout Member
    vm.logoutMember = function () {
      MemberService.logoutMember()
        .then(function (data) {
          AuthenticationService.clearCredentials(data);
          $location.path('/');
        })
        .catch(function (data) {
          $log.error(data);
        });
    };

    }]);

})();
